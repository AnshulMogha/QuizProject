'user-strict';
const express=require('express');
const bodyParser=require('body-parser');
const mongodb=require('mongodb');
const MongoClient=mongodb.MongoClient;
let databaseUrl="mongodb://localhost:27017/quizApp";
const app=express();
let totDbQue=15;

/*---------------------------------------------------------------------------*/
app.set('view engine','ejs');
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.urlencoded({extended:false}));
let database;
/*---------------------------------------------------------------------------*/
MongoClient.connect(databaseUrl,(err,mongoServer)=>{
    if(err)
    console.log("Cannot Connect to the database:");
    database=mongoServer.db();
});

/*---------------------------------------------------------------------------*/
function register(email,password,res)
{
    database.collection("User").findOne({userEmail:email},(err,result)=>{
        if(err)
        console.log("Cannot fetch the data:");
        else if(result!=null&&email===result.userEmail)
        {
            res.render('error',{data:"User already exist"});
        }
        else
        {
            let record={userEmail:email,userPassword:password,highScore:0}
    
            database.collection("User").insertOne(record,(err,result)=>{
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    authenticate(email,password,res);
                }
            }); 
        }
    });
    
    
}
function authenticate(email,password,res)
{
    database.collection("User").findOne({userEmail:email},(err,result)=>{
        if(err)
        console.log("err to fetch data");
        else if(result!=null&&email===result.userEmail&&password===result.userPassword)
        {
            let atRateIndex=result.userEmail.indexOf('@');
            let userName=result.userEmail.slice(0,atRateIndex);
            userName=userName.slice(0,1).toUpperCase() + userName.slice(1,userName.length);
            res.render('dashboard',{userName:userName,highScore:result.highScore});
        }
        else
        {
            res.render('error',{data:"Please Check Your Credential"});
        }
    });
}

/*--------------------------------------------------------------------------- */
app.get('/',(req,res)=>{
    res.redirect("/LoginSignup");    
});
app.get('/LoginSignup',(req,res)=>{
    res.sendFile(__dirname+"/public/Login/login.html")
});
app.post('/',(req,res)=>{
    
    let email=req.body.userEmail;
    let password=req.body.userPassword;
    if(req.body.submitBtn==="SignUp")
    {
        register(email,password,res);
    }
    else
    {
        authenticate(email,password,res)
    }
});
/*------------------------------------------------------------------------------ */
function randomNum()
{
    let num=Math.random()*totDbQue;
    n=Math.floor(num);
    return n+1;
}
async function fetchData(qid,questionNo=1)
{
    let result=await database.collection('Questions').findOne({questionId:qid});
        let Data={
            QuestionNo:questionNo,
            Question:result.questionData,
            Option1:result.questionOpt[0],
            Option2:result.questionOpt[1],
            Option3:result.questionOpt[2],
            Option4:result.questionOpt[3],
            Key:result.questionKey,
            Qid:result.questionId
        };
        return Data;
}
app.post('/quiz',(req,res)=>{
    
    let btn=req.body.btn;
    if(btn==='start')
    {
        let qid=randomNum();
        fetchData(qid).then((ejsData)=>{
            res.render('quiz',ejsData);
        },
        (err)=>{
            console.log(err);
        });   
    }
    else
    {
        let qid=parseInt(req.body.Qid);
        qid=qid%totDbQue+1;
        let questionNo=parseInt(req.body.QueNo);
        fetchData(qid,questionNo+1).then((ejsData)=>{
            res.render('quiz',ejsData);
        },
        (err)=>{
            console.log(err);
        });
    }
});

async function updateHighScore(usermail,score)
{
    let result=await database.collection('User').findOne({userEmail:usermail});
    let highScore=parseInt(result.highScore);
    if(score>highScore)
    {
        let query={userEmail:usermail};
        let newVal={$set:{highScore:score}}
        database.collection('User').updateOne(query,newVal);
    }
}
app.post('/submit',(req,res)=>{

    let userEmail=req.body.userEmail;
    let score=parseInt(req.body.score);
    let correctQuestion=score/2;
    let incorrectQuestion=10-correctQuestion;
    updateHighScore(userEmail,score);
    res.render('result',{Score:score,CorrectQue:correctQuestion,IncorrectQue:incorrectQuestion});
});




/*---------------------------------------------------------------------------*/
app.listen(6060,()=>{
    console.log("Server Start at port 6060");
});
