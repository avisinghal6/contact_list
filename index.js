const express= require('express'); //for using express node js web framework
const port =8000;
const path= require('path'); //for using the path library
const database=require('./config/mongoose');
const Contact= require('./models/contact'); 
const app= express(); //fcreates an express application

app.set('view engine', 'ejs');  //using ejs as the view engine
app.set('views', path.join(__dirname, 'views')); //setting path to access .ejs files (templates)
app.use(express.urlencoded()); // for processing the requests, it is middleware (parser)
app.use(express.static('assets')); //specify path for accessing static files

//creating middleware function
app.use(function(req,res,next){
    // console.log("MW1");
    next();
})

// var contactList= [
//     {
//         name: "Avi Singhal",
//         phone: 123456789
//     },
//     {
//         name: "Tony Stark ",
//         phone: 456567890
//     },
//     {
//         name: "Captain America",
//         phone:67878990
//     }
// ]


//handling server requests
app.get('/', function(req,res){

Contact.find({}, function(err, contacts){  //.find function searches the model(Contact) and calls the callback function by passing it the data in the 'contacts' parameter
    if(err){
        console.log('error in fetching contacts from db');
        return;
    }
    // console.log(contacts);
    res.render('home', {
        title: "My Contacts",
        contact_list: contacts
    });

})

    
});

app.get('/dummy', function(req,res){
    res.render('dummy');

});

app.post('/create-contact', function(req,res){
    // contactList.push(req.body);
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if(err){console.log('error in creating option');
    return;}

    console.log('********', newContact);
    return res.redirect('back');
    })
    
});

app.get('/delete_contact/:id', function(req,res){
    var delete_id= req.params.id; //using params fpr extracting the data

    // let delete_id= contactList.findIndex(contact => contact.phone==delete_phone); //used arrow function, contact is acting like an element of the array
    // if(delete_id!=1){
    //     contactList.splice(delete_id,1);
    // }

    Contact.findByIdAndDelete(delete_id, function(err){
        if(err){
            console.log("error in deleting from db");
            return;
        }

        return res.redirect('back');
    });
    
    
});


// starting the server
 app.listen(port, function(err){
     if(err){
         console.log("error",err); 
        return;
     }

     console.log("working server");
 });