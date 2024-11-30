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


/* Assignskill heard */
app.post('/dashboard/assignskill', (req,res) =>{
    const result = req.body;
    console.log(req.body)
    const skillstring = result.skills.join(', ');
    console.log(skillstring);

    


})

/* Get Projects heard */

app.get('/api/projects', (req, res) => {
    const sql4 = "SELECT PJID, pName from Projects;";
    db.query(sql4, (err, results) => {
        if (err) {
            console.error('Error executing query: ', err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        const projects = results.map(row => ({
            id: row.PJID,
            projectName: row.pName
        }));        
        console.log(projects)

        res.json(projects);

    });
});

app.get('/api/get-email', (req, res) => {
     // Log the cookies to see what is received
//    console.log("Cookies:", req.cookies);

    const token = req.cookies.token; // Access the cookie
    if (!token) {
        return res.status(401).json({ Error: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, "jwt_secret_key");
        res.json({ email: decoded.email });
    } catch (error) {
        return res.status(401).json({ Error: "Invalid token" });
    }
});

app.listen(3000, () => {
    console.log("Server is running")
})
