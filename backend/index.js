const connectToMongo=require('./db');
const express=require('express')
const cors=require('cors')

connectToMongo();
const app=express();
const port=5000;
//include middleware to be able to use req.body
app.use(express.json())
app.use(cors())
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))
app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }
    console.log('Server running on port:',port);
})