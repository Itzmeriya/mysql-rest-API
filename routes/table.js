const mysql = require('mysql2');
const express = require('express');
var router = express.Router();
router.use(express.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'student',
    multipleStatements: true
    });
mysqlConnection.connect((err)=> {
    if(!err)
        console.log('Connection Established Successfully');
    else
        console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
});

//Router to get all student details
router.get('/' , (req, res) => {
    mysqlConnection.query('select * from student;', (err, rows, fields) => {
        if (!err)
            res.send(rows);
    //return res.console.log(rows);    
        else
            console.log(err);
        })
} );
//Router to GET specific student detail from the MySQL database
 router.get('/:id' , (req, res) => {
    mysqlConnection.query('SELECT * from student WHERE student_id = ?',[req.params.id], (err, rows, fields) => {
        if (!err)
        res.send(rows);
        else
        console.log(err);
         })
     });

//Router to GET course details
router.get('/course' , (req, res) => {
    mysqlConnection.query('select * from course;', (err, rows, fields) => {
        if (!err)
            res.send(rows);
    //return res.console.log(rows);    
        else
            console.log(err);
        })
} );

//Router to GET exams details
router.get('/' , (req, res) => {
    mysqlConnection.query('select * from exams;', (err, rows, fields) => {
        if (!err)
            res.send(rows);
    //return res.console.log(rows);    
        else
            console.log(err);
        })
} );



//Delete a student with id 
router.delete('/:id',(req,res) =>{
    mysqlConnection.query('DELETE from student WHERE student_id = ?',[req.params.id], (err, rows, fields) => {
        if (!err)
        res.send('Deleted successfully.');
        else
        console.log(err);
   })
});

//Insert a student
router.post('/',(req,res)=>{
    let wrk = req.body;
    var sql = "SET @student_id=?; SET @firstname=?; SET @lastname=?; \
    CALL studentAddorEdit (@student_id,@firstname,@lastname);";
    mysqlConnection.query(sql,[wrk.student_id, wrk.firstname, wrk.lastname], (err,rows,fields)=>{
        if (!err)
        rows.forEach(element =>{
          if (element.constructor==Array)
          res.send('Inserted student id: '+element[0].student_id);
        });
        else
        console.log(err);
    })
});

//Update a student
router.put('/',(req,res)=>{
    let wrk = req.body;
    var sql = "SET @student_id=?; SET @firstname=?; SET @lastname=?; \
    CALL studentAddorEdit (@student_id,@firstname,@lastname);";
    mysqlConnection.query(sql,[wrk.student_id, wrk.firstname, wrk.lastname], (err,rows,fields)=>{
        if (!err)
        res.send('Updated Successfully.');
        else
        console.log(err);
    })
});
        
 module.exports=router;