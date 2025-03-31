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

/* Login heard */
app.post('/login', (req, res) => {
const  { email, password } = req.body;
console.log({ email,  password });
const sql = "SELECT * from Employees Where eEmail = ? and PasswordHash = ?"
const sql2 = "SELECT * from Employees where eemail = ? and passwordhash = ? and manager=TRUE;"
db.query(sql, [email, password], (err, result) => {
    if (err) {
        return res.json({ loginStatus: false, Error: "Query Error" });
    }

    if (result.length > 0) {
        // User exists, now check if they are a manager
        db.query(sql2, [email, password], (err, managerResult) => {
            if (err) {
                return res.json({ loginStatus: false, Error: "Query Error" });
            }

            if (managerResult.length > 0) {
                return res.json({ loginStatus: true, Admin: true });
            } else {
                return res.json({ loginStatus: true, Admin: false });
            }
        });
    } else {
        // User does not exist
        return res.json({ loginStatus: false, Error: "Wrong email/password" });
    }
});
})

/* Signup heard */

app.post('/signup' , (req,res) =>{
    const  { name, email, password } = req.body;
    console.log({ name, email, password })
    const sql3 = "INSERT INTO Employees(eName,eEmail,PasswordHash) VALUES(?,?,?);";
    db.query(sql3, [name,email,password] , (err, result) =>{
        if (err) {
            return res.json({ signUpStatus: false, Error: "Error. Try another email input" });
        }

        if(result){
            console.log("Created new account as:")
            console.log({ name, email, password })
            return res.json({ signUpStatus: true})
        }else{
            return res.json({ signUpStatus: false, Error: "Unable to create accout. Please try another." });
        }
    })

        
})


/* Signup heard */
app.post('/dashboard/assignskill', (req,res) =>{
    const result = req.body;
    console.log(req.body)
    const skillstring = result.skills.join(', ');
    console.log(skillstring);

    


})




app.listen(3000, () => {
    console.log("Server is running")
})
