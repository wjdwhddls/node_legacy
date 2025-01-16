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
app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());  

// MySQL Connection  
const connectionPool = mysql.createPool({  
  host: process.env.DB_HOST,  
  user: process.env.DB_USER,  
  password: process.env.DB_PW,  
  port: process.env.DB_PORT,  
  database: process.env.DB_NAME,  
  connectionLimit: 10,  
  insecureAuth: true,  
});  

// MySQL connection check  
connectionPool.getConnection((err, connection) => {  
  if (err) {  
    console.error('MySQL 연결 중 에러 발생:', err);  
  } else {  
    console.log('MySQL에 연결되었습니다.');  
    connection.release();  
  }  
});  

// GET 요청 라우터  
app.get('/', (req, res) => {  
  const selectQuery = `SELECT * FROM contact ORDER BY ID DESC`;  

  connectionPool.query(selectQuery, (err, result) => {  
    if(err) {  
      console.error('데이터 조회 중 에러 발생: ', err);  
      res.render('index', {  
        title: '메인 페이지',  
        lists: [] // 에러 시 빈 배열 전달  
      });  
    } else {  
      res.render('index', {  
        title: '메인 페이지',  
        lists: result // 조회된 데이터 전달  
      });  
    }  
  });  
});  

app.get('/blog', (req, res) => {  
  res.render('blog', { title: '문의하기 페이지' });  
});  

app.get('/profile', (req, res) => {  
  res.render('profile', { title: '프로필 페이지' });  
});  

app.get('/contact', (req, res) => {  
  res.render('contact'); // ./views/contact.ejs  
});  

// 문의목록 라우터  
app.get('/contactList', (req, res) => {  
  const selectQuery = `SELECT * FROM contact ORDER BY ID DESC`;  

  connectionPool.query(selectQuery, (err, result) => {  
    if(err) {  
      console.error('데이터 조회 중 에러 발생: ', err);  
      res.status(500).send();  
    } else {  
      console.log('데이터가 조회되었습니다.');  
      res.render('contactList', { lists: result });  
    }  
  });  
});  

// POST 요청 처리 라우터  
app.post('/api/contact', (req, res) => {  
  const { name, phone, email, memo } = req.body;  

  const SQL_Query = `INSERT INTO contact(name, phone, email, memo, create_at, modify_at, status)   
                    VALUES (?, ?, ?, ?, NOW(), NOW(), 'pending')`;  

  connectionPool.query(SQL_Query, [name, phone, email, memo], (err, result) => {  
    if(err) {  
      console.error('데이터 삽입 중 에러 발생: ', err);  
      res.status(500).send();  
    } else {  
      console.log('데이터가 삽입되었습니다.');  
      res.send("<script>alert('문의사항이 등록되었습니다.'); location.href='/'</script>");  
    }  
  });  
});  

app.delete('/api/contactDelete/:id', (req, res) => {  
  const id = req.params.id;  
  const deleteQuery = `DELETE FROM contact WHERE id = ?`;  
  
  connectionPool.query(deleteQuery, [id], (err, result) => {  
    if(err) {  
      console.error('데이터 삭제 중 에러 발생: ', err);  
      res.status(500).send();  
    } else {  
      console.log('데이터가 삭제 되었습니다.');  
      res.send("<script>alert('문의사항이 삭제되었습니다.'); location.href='/contactList'</script>");  
    }  
  });  
});  

app.put('/api/contactUpdate/:id', (req, res) => {  
  const id = req.params.id;  
  const status = "done";  
  const updateQuery = `UPDATE contact SET status = ?, modify_at = NOW() WHERE id = ?`;  

  connectionPool.query(updateQuery, [status, id], (err, result) => {  
    if(err) {  
      console.error('데이터 수정 중 에러 발생: ', err);  
      res.status(500).send();  
    } else {  
      console.log('데이터가 수정 되었습니다.');  
      res.send("<script>alert('문의사항이 상태가 변경되었습니다.'); location.href='/contactList'</script>");  
    }  
  });  
});  

// 서버 시작  
app.listen(port, () => {  
  console.log(`Node Legacy App listening on port ${port}`);  
});