const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
require('dotenv').config();
const app = express();
const port = 3000;

// View engine 설정
app.set('view engine', 'ejs');
app.set('views', './views');

// Static file serving
app.use(express.static(__dirname + '/public'));

// body-parser 미들웨어 설정
app.use(bodyParser.urlencoded({ extended: false })); // URL-encoded 데이터
app.use(bodyParser.json()); // JSON 데이터 파싱


// MySQL Connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  insecureAuth: true,
});


// GET 요청 라우터
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/blog', (req, res) => {
  res.render('blog');
});

app.get('/users', (req, res) => {
  res.render('users');
});

app.get('/contact', (req, res) => {
  res.render('contact'); // ./views/contact.ejs
});

// POST 요청 처리 라우터
app.post('/api/contact', (req, res) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;
  const memo = req.body.memo;

  const data = `${name} ${phone} ${email} ${memo}`;
  res.send(data); // 클라이언트에 데이터 반환
});

// 서버 시작
app.listen(port, () => {
  console.log(`Node Legacy App listening on port ${port}`);
});
