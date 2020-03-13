const express = require('express');
const app = express();
const request = require('request');
const bodyParser = require('body-parser'); 
const path = require('path');
const PORT = process.env.PORT || 3000;

express.json();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

 app.get('/', (req, res) => {
     res.sendFile(path.join(__dirname, '../public/index.html'))
 }); 

 app.get('/about', (req, res) => {
     res.sendFile(path.join(__dirname, '../public/about.html'))
 }); 

 app.get('/fashion', (req, res) => {
     res.sendFile(path.join(__dirname, '../public/fashion.html'))
 }); 

 app.get('/', (req, res) => {
    res.status(200).redirect('/')
})

 app.get('/fail', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/fail.html'))
}); 

app.get('/success', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/success.html'))
}); 

 app.post('*', (req, res) => { 
    const { email } = req.body;

    if (!email) {
        res.redirect('/fail');
        return;
    }

    const data = {
        members: [{ email_address: email, status: 'subscribed' }] 
    }

    const postData = JSON.stringify(data); 

    const options = {
        url: 'https://us19.api.mailchimp.com/3.0/lists/7c945f3be0',
        method: 'POST',
        headers: {
            Authorization: 'auth 6970cf4932f44750a45c0f1eb15bacc0-us19'
        },
        body: postData
    }

    request(options, (err, response, body) => {
        if (err) {
            res.redirect('/fail')
        } else {
            if (response.statusCode === 200) {
                res.redirect('/success')
            } else {
                res.redirect('/fail')  
            }
        }
    }) 
 });


app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
}); 