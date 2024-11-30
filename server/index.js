import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser'; //remember to: npm install cookie-parser



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
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({


}))

/* Login heard */
app.post('/login', (req, res) => {
    const  { email, password } = req.body;
    console.log("Login as :",{ email,  password });
    const sql = "SELECT * from Employees Where eEmail = ? and PasswordHash = ?"
    const sql2 = "SELECT * from Employees Where eEmail = ? and PasswordHash = ? and Manager=true"; 
    
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
                    const token = jwt.sign({
                        role: "manager", email: email,},
                        "jwt_secret_key", /* secretkeyneedtohide */
                        {expiresIn: '1d'}
                    )
                    res
                    .cookie('token',token)
                    .json({ loginStatus: true, Admin: true, token });
                } else {
                    const token = jwt.sign({
                        role: "employee", email: email},
                        "jwt_secret_key", /* secretkeyneedtohide */
                        {expiresIn: '1d'}
                    )
                    res               
                    .cookie('token',token)
                    .json({ loginStatus: true, Admin: false ,token}) ;              
       
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


/* Assignskill heard */
app.post('/dashboard/assignskill', (req,res) =>{
    const result = req.body;
    console.log(req.body)
    const skillstring = result.skills.join(', ');
    console.log(skillstring);

    


})

/* Get Projects based on emailheard */
/** 
app.get('/api/projects', (req, res) => {
    const email = req.query.email;
    console.log(req.query);
    console.log(email);

    
    const sql4 = "SELECT p.PJID, p.pName FROM Employees e JOIN Project_Assignment pa ON e.Emp_id = pa.Emp_id JOIN Projects p ON pa.PJID = p.PJID WHERE e.eEmail = ?;";
    db.query(sql4, (err, results) => {
        if (err) {
            console.error('Error executing query: ', err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        const projects = results.map(row => ({
            id: row.PJID,
            projectName: row.pName
        }));        
        res.json(projects);
    });
});
*/
app.get('/api/projects', (req, res) => {
    const email = req.query.email; // Access email from query parameters
    console.log(req.query); // Log the entire query object for debugging
    console.log(email); // Log the email for debugging
    const sql4 = "SELECT p.PJID, p.pName FROM Employees e JOIN Project_Assignment pa ON e.Emp_id = pa.Emp_id JOIN Projects p ON pa.PJID = p.PJID WHERE e.eEmail = ?;";
    db.query(sql4, [email], (err, results) => { // Pass email as a parameter to the query
        if (err) {
            console.error('Error executing query: ', err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        const projects = results.map(row => ({
            id: row.PJID,
            projectName: row.pName
        }));        
        res.json(projects);
    });

});

app.get('/api/employees', (req, res) => {
    const sql5 = "SELECT Emp_id, eName from Employees;";
    db.query(sql5, (err, results) => {
        if (err) {
            console.error('Error executing query: ', err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        const employees = results.map(row => ({
            id: row.Emp_id,
            eName: row.eName
        }));        

        res.json(employees);

    });
});


app.get('/api/get-email', (req, res) => {
     // Log the cookies to see what is received
//    console.log("Cookies:", req.cookies);
    const authHeader = req.headers['authorization']; // Get the Authorization header

    if (!authHeader) {
        return res.status(401).json({ Error: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(authHeader, "jwt_secret_key");
        res.json({ email: decoded.email });

    } catch (error) {
        return res.status(401).json({ Error: "Invalid token" });
    }
});







app.listen(3000, () => {
    console.log("Server is running")
})
