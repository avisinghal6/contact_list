const mongoose =require('mongoose'); // if moongoose.js file is called first, then that same instance of moongoose will be used in this file also. Nodejs does this implicitly to save space
const contactSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
});

const Contact = mongoose.model('Contact', contactSchema); // specifies the collection, here 'Contact' is the name of the collection

module.exports = Contact;  // export is used so that it can be accessed in other files