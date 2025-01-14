const express = require('express')
const ejs = require('ejs')
const app = express()
const port = 3000



app.post('/api/contact', (req, res) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;
  const memo = req.body.memo;

  const data = `${name} ${phone} ${email} ${memo}`;
  res.send(data);
});
app.set('view engine', 'ejs')
app.set('views', './views')

// static file serving
app.use(express.static(__dirname+'/public'))

app.get('/',  (req, res) => {    //  => , function(req,res) 같은 표기법이다.
  res.render('index')
})
app.get('/blog',  (req, res) => {    //  => , function(req,res) 같은 표기법이다.
  res.render('blog')
})
app.get('/users',  (req, res) => {    //  => , function(req,res) 같은 표기법이다.
  res.render('users')

})

app.get('/contact', (req,res) => {
  res.render('contact')
})

app.listen(port, () => {
  console.log(`Node Legacy App listening on port ${port}`)
})