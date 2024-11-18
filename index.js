import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';



const db = mysql.createConnection({
    host:"my-db1.cfc60mkco2bw.us-east-2.rds.amazonaws.com",
    port: "3306",
    user:"admin",
    password:"testpass123", //better to save it. XD
    database:"mydb1"
});

db.connect((err) => {
    if (err){
        console.log(err.message);
        return;
    } else{
        console.log("Database Connected")
        console.log("Running Database.....")
    }
})

const app = express()
app.use(bodyParser.json());
app.use(cors(

))

app.post('/login', (req, res) => {
const  { email, password } = req.body;
console.log({ email,  password });
const sql = "SELECT * from Employees Where eEmail = ? and PasswordHash = ?"
db.query(sql, [email, password], (err, result) => {
    if (err){
        res.json({loginStatus: false, Error: "Query Error"  })
    }
    if (result.length > 0){
 

        return res.json({loginStatus: true  })
    } else{
        return res.json({loginStatus: false, Error: "Wrong emails/passwords"    })
    }
})
    
})

app.listen(3000, () => {
    console.log("Server is running")
})


