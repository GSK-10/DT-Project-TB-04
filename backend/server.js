
const exp=require('express');
const { MongoClient } = require('mongodb');
const app=exp();

const PORT=8000;


//connecting to database
const DBURL="mongodb+srv://gsk10:gsk10@cluster0.uo7ot3p.mongodb.net/?retryWrites=true&w=majority"

//importing mongo client
const mongoclient=require("mongodb").MongoClient;

//connecting to mongo client
mongoclient.connect(DBURL)
.then((client)=>{
    
    
    const databaseObject = client.db("test")
    const userCollectionObject = databaseObject.collection("UserInfo")
    app.set("userCollectionObject", userCollectionObject)

    console.log("DB conncetion successfull")
    
})
.catch(()=>{
    console.log("failed to connect dababase to the application")
})

app.use(exp.json())

const cors=require('cors')
app.use(cors())


//importing userApis
const userApis= require("./Apis/Userapi")
app.use('/users',userApis);

//Middleware to handle errors
app.use((error,request,response,next)=>{
    response.send({Message:`Error Occured`,Error_type:`${error.message}`})
})

//Middleware to handle invalid path
app.use((request,response,next)=>{
    response.send({Message:`Invalid path: The path ${request.url} is invalid`})
})
app.listen(PORT,()=>console.log(`app is listening on ${PORT}`));










