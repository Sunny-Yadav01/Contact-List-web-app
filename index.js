const express = require('express');
const path = require('path');
const port = 8000;

const db =require('./config/mongoose');
const Contact = require('./model/contact');


const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));
/*app.use(function( req, res ,next){
    console.log('middleware 1 is called');
    next();
});

app.use(function (req ,res , next){
    console.log('middleware 2  is called');
    next();
});*/

var contactList= [
    {
        name:"Adarsh Yadav",
        phone : 1565656565
        
    },
    {
        name:"Sunny", 
        phone : 15657896954
        
    }
]

app.get('/', async function(req, res) {
    try {
        const contacts = await Contact.find({});
        return res.render('home', {
            title: "My Contacts List",
            contact_list: contacts
        });
    } catch (err) {
        console.log('Error in fetching contacts from db:', err);
        return res.status(500).send('Internal Server Error');
    }
});





/*app.get('/practice', function(req ,res){
    return res.render("practice",{
        title: "lets play with ejs"
    });
});*/


/*app.post('/create-contact',function(req,res){
    /*contactList.push({
        name:req.body.name,
        phone:req.body.phone
    })
    return res.redirect('/');

    Contact.create({
        name:  req.body.name,
        phone:  req.body.phone
    }, function(err, newContact){
        if(err){
            console.log('error in creating a contact:');
            return ;
        }
        console.log('********',newContact);
        return res.redirect('back');
    });

});*/
app.post('/create-contact', function (req, res) {
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    })
    .then(newContact => {
        console.log('Contact created:', newContact);
        return res.redirect('back');
    })
    .catch(err => {
        console.error('Error creating contact:', err);
        return res.status(500).send('Internal Server Error');
    });
});


/*app.get('/delete-contact/', async function(req, res) {
    try {
      // get the id from query in the url
      let id = req.query.id;
  
      // find the contact in the database using id and delete
      const deletedContact = await Contact.findByIdAndDelete(id ,function(err){
        console.log('error from fetching data from database');
        return;

      });
  

      return res.redirect('back');
    } catch (err) {
      console.error('Error in deleting contact from database:', err);
      return res.status(500).send('Internal Server Error');
    }
  });
  app.get('/delete-contact',function(req,res){
    //get the id from query in the url
    let id =req.query.id;
    //find the contact in the database using id and delete
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error in deleting an object from database');
            return;
        }
        return res.redirect('back');

    });

    

  });*/
  app.get('/delete-contact', async function(req, res) {
    try {
        // Get the id from the query in the URL
        let id = req.query.id;

        // Find the contact in the database using id and delete
        await Contact.findByIdAndDelete(id);

        // Redirect back after successful deletion
        return res.redirect('back');
    } catch (err) {
        console.error('Error in deleting an object from the database:', err);
        return res.status(500).send('Internal Server Error');
    }
});




app.listen(port , function(err){
    if(err){console.log("there is some error while loading this page",err)}

    console.log('the port is running successfully on port',port);
});