var fs = require('fs');
var os = require('os');
const express = require('express');
const app = express();
var _ = require('lodash')
const db = require('./db');

const Person = require('./models/Person');
const MenuItem = require('./models/MenuItem')

//body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());


var user = os.userInfo();
//console.log(user);

//greeting bhejna h file se

//fs.appendFile('greeting.txt',"hi" + user.username + '\n',()=>{console.log('created');})

//import file
// var notes = require('./notes')

// var b = notes.age
// console.log(b);

// var c = notes.add(3,4)
// console.log(c);

// let data = ['c','c','d',1,1,2,3,4,4,4,5];
// console.log(_.uniq(data));

app.get('/',function(req,res){
    res.send('hello India')
})
// app.get('/about',function(req,res){
//     res.send('hello India-apun h veg')
// })
// app.get('/home',function(req,res){
//     res.send('hello India-apun h veg')
// })
// app.get('/section',function(req,res){
//     let menu = {
//         food: "daal",
//         fruit: "apple"
//     }
//     res.send(menu.food)
// }




    //menuitem route
    app.post('/MenuItem',async (req,res)=>{
        try {
            const data = req.body;

            const newMenuItem = new MenuItem(data);
            const response = await newMenuItem.save();

            console.log('data saved');
            res.status(200).json(response);
        } catch (err) {
            console.log('error',err);
            res.status(500).json({error: 'internel server error'});
        }
    })

   


    //import the router files
    const personRoutes = require('./routes/personRoutes');

    //use the routers
    app.use('/person',personRoutes);

app.listen(3000, ()=>{
    console.log('listening at port 3000')
})
