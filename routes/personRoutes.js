const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');

router.post('/',async (req,res)=>{
    try{
        const data = req.body; //assume that req body contains person data


    //create new person document using the Mongoose model
    const newPerson = new Person(data);

    //save the new person to the database
    const response = await newPerson.save();
    console.log('data saved');
    res.status(200).json(response);
    }
    catch(err){
        console.log('error',err);
        res.status(500).json({error: 'internel server error'});
    }
    
    
    })

     //GET method  to get the person
     router.get('/',async (req,res)=>{
        try{
           const data = await Person.find();
           console.log('data fetched');
           res.status(200).json(data);
        }
        catch(err){
            console.log('error',err);
            res.status(500).json({error: 'internel server error'});
        }
    })

    //endpoints 
    router.get('/:workType',async (req,res)=>{
        try {
            const workType=req.params.workType;//extract the worktype from url parametrs
            if(workType == 'chef' || workType == 'waiter' || workType == 'manager'){
               let response = await Person.find({work:workType});
               console.log('response fetched');
               res.status(200).json(response);
            }
            else{
                res.status(404).json({error: 'invalid work type'});
            }
        } catch (err) {
            console.log('error',err);
            res.status(500).json({error: 'internel server error'}); 
        }
    })


    //put-- update data
    router.put('/:id',async (req,res)=>{
        try {
            const personId = req.params.id;
            const updatedPersonData = req.body;

            const response = await Person.findByIdAndUpdate(personId,updatedPersonData,{
                new:true, //Return the updated data
                runValidators:true //Run mongoose validation
            })

            if(!response){
                return res.status(404).json({error: 'person not found'});
            }

            console.log('response fetched');
            res.status(200).json(response);


        } catch (err) {
            console.log('error',err);
            res.status(500).json({error: 'internel server error'}); 
        }
    })

    module.exports = router;