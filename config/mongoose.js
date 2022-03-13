const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/contacts_list_db'); //used to connect to database
const db=mongoose.connection; //acquire the connection to check if it is successful
db.on('error', console.error.bind(console,'error connecting to db')); //error
db.once('open',function(){
    console.log('successfully connected to database');
})