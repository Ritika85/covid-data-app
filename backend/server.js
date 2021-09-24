const express= require('express');
const app=express();
const bodyParser=require('body-parser');
const cors=require('cors');
const mongoose=require('mongoose');
const covidRoutes =express.Router();
const PORT=4000;
let CovidData =require('./mongo.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/covid_data_app', {useNewUrlParser:true});
const connection =mongoose.connection;

connection.once('open', function(){
    console.log("MongoDB database connection estd succesfully");
})

covidRoutes.route('/').get(function(req, res){
    CovidData.find(function(err, data){
        if(err){
            console.log(err);
        }
        else {
            res.json(data);
        }
    }).limit(30);
});

covidRoutes.route('/:id').get(function(req, res){
    let id =req.params.id;
    CovidData.findById(id, function(err , data){
        if(err){
            console.log(err);
        }
        else {
            res.json(data);
        }
    });
});

covidRoutes.route('/add').post(function(req,res){
    let data= new CovidData(req.body);
    data.save().then(data => {
        res.status(200).json({'data': 'record added succesfully'});
    }).catch(err => {
        res.status(400).send('adding new record failed');
    });
});

covidRoutes.route('/edit/:id').post(function(req,res){
    CovidData.findById(req.params.id , function(err, data){
        if(!data)
            res.status(404).send('data is not found');
        else 
            data.date = new Date(req.body.date);
            data.cases =req.body.cases;
            data.deaths =req.body.deaths;

            data.save().then(data=> {
                res.json('record updated..');
            })
            .catch(err=>{
                res.status(400).send("Update not possible");
            });
    });
});

covidRoutes.route('/delete/:id').post(function(req,res){
    CovidData.findByIdAndDelete(req.params.id)
    .then((result)=>{
        res.status(200).json(result);
    })
    .catch((err)=>{
        res.status(400).send(err);
    })
})

//
covidRoutes.route('/show/states/:number').get(function(req,res){
    
    CovidData.find({
       cases: {
           $gt: req.params.number
        }
    }).distinct('state')
    .then((result) =>{
        res.status(200).json(result);
    })
    .catch((err)=>{
        res.status(400).send(err);
    })
});

covidRoutes.route('/show/counts/:state').get(function(req,res){
    var regex =new RegExp(req.params.state, 'i');
    CovidData.aggregate([
        {
          $match :{state: regex}
        }, 
        {$group  :{
              _id:'state',
              totalCases : {$sum:'$cases'},
              totalDeaths :{$sum:'$deaths'}
          }
        }
    ])
    .then((result) =>{
        res.status(200).json(result);
    })
    .catch((err)=>{
        res.status(400).send(err);
    })
});

covidRoutes.route('/display/:state').get(function(req,res){
    var regex1 =new RegExp(req.params.state, 'i');
    CovidData.find({
       state:regex1
    }).limit(20)
    .then((result) =>{
        res.status(200).json(result);
    })
    .catch((err)=>{
        res.status(400).send(err);
    })
})

app.use('/covid', covidRoutes);

app.listen(PORT, function(){
    console.log("Server is running on Port :"+ PORT);
});