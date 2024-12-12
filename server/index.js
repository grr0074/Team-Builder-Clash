import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser'; //remember to: npm install cookie-parser
import sgMail from '@sendgrid/mail';  // npm install --save @sendgrit/mail



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
    const  { name, email, password, manager } = req.body;
    console.log({ name, email, password, manager })
    const sql3 = "INSERT INTO Employees(eName,eEmail,PasswordHash, Manager) VALUES(?,?,?,?);";
    db.query(sql3, [name,email,password,manager] , (err, result) =>{
        if (err) {
            return res.json({ signUpStatus: false, Error: "Error. Try another email input" });
        }

        if(result){
            console.log("Created new account as:")
            console.log({ name, email, password, manager })
            const token = jwt.sign({
                role: "login", email: email,},
                "jwt_secret_key", /* secretkeyneedtohide */
                {expiresIn: '1d'}
            )
            
            return res.json({ signUpStatus: true, token})
        }else{
            return res.json({ signUpStatus: false, Error: "Unable to create accout. Please try another." });
        }
    })

        
})


/* Assignskill heard */
app.post('/dashboard/assignskill', (req,res) =>{
    const result = req.body;
    const email = req.query.email; // Access email from query parameters
    const skillstring = result.selectedSkills.join(', ');

    const sql6 = "UPDATE Employees SET Skills = ? WHERE eEmail = ?;";
    db.query(sql6, [skillstring, email], (err, results) => {
        if (err) {
            console.error('Error executing query: ', err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        if(results){
            console.log("Update skills of " , email, " as: ", skillstring)
            return res.json({AssignStatus: true})
        }
        else{
            return res.json({AssignStatus: false, Error: "Unable to Assign."})
        }        
    });
    


})

/* Get Projects based on emailheard  (WORK ON DASHBOARD)*/
app.get('/api/projects', (req, res) => {
    const email = req.query.email; // Access email from query parameters
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

const api_key = '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';
sgMail.setApiKey(api_key)

app.post('/api/create-project', (req, res) => {
    const  { name, description, ids} = req.body;
    console.log({ name, description, ids});
    const sql7 = "INSERT INTO Projects(pName, PDescription) VALUES(?,?);";
    const sql8 = `
    INSERT INTO Project_Assignment (PJID, Emp_id) 
    VALUES ((SELECT PJID FROM Projects WHERE pName = ?), ?);
`;


    db.query(sql7, [ name, description ], (err, results) => { // Pass email as a parameter to the query
        if (err) {
            console.error('Error executing query: ', err);
            return res.status(500).json({ CreateStatus: false, Error: 'Database query failed' });
        }
        if(results){
            console.log("Success create a project as ", name, description)

            const employeeInsertions = ids.map(empId => {
                return new Promise((resolve, reject) => {
                    db.query(sql8, [name, empId], (err, results) => {
                        if (err) {
                            console.error('Error inserting into Project_Assignment: ', err);
                            reject(err); // Reject the promise if there's an error
                        } else {
                            resolve(results);
                        }
                    });
                });
            });

    // Wait for all insertions to complete
            Promise.all(employeeInsertions)
                .then(() => {
                    console.log("All employee assignments inserted successfully.");
                    return res.json({ CreateStatus: true });
                })
                .catch((err) => {
                    console.error('Error inserting employee assignments:', err);
                    return res.status(500).json({ CreateStatus: false, Error: 'Failed to insert employee assignments' });
                });
    }});   
});


app.post("/api/send_noti" , (req, res) => {
    const  empIDs = req.body.employeeIds;
    const projectName = req.body.projectName;
    console.log(empIDs);
    let emails = [];   
    if (!Array.isArray(empIDs) || empIDs.length === 0) {
        return res.status(400).json({ error: "Invalid empIDs list" });
    }

    const sqlmarks = empIDs.map(() => '?').join(',');
    const sql9 = `SELECT eEmail FROM Employees WHERE Emp_id IN (${sqlmarks});`;
    db.query(sql9, empIDs, (err, results) => {

        if (err) {
            console.error('Error fetching emails:', err);
            return res.status(500).json({ error: 'Database query error' });
        }
        // Extract emails from the results
        emails = results.map(row => row.eEmail);
        console.log("List emails:",emails);

        const msg = {
            to: emails, // Change to your recipient
            from: 'teambuilderclash@gmail.com', // Change to your verified sender
            subject: 'Inviting to Project',
            text: `You have been Assign to a new Project call ${projectName}, lets check on your Dashboard`,
            html: `<strong>You have been Assign to a new Project call ${projectName}, lets check on your Dashboard</strong>`,
          }
          sgMail
            .send(msg)
            .then(() => {
              console.log('Notification emails sent')
              return res.json({SendNotiStatus: true})
            })
            .catch((error) => {
              console.error(error)
              return res.json({SendNotiStatus: false} )

            })


    });

});



app.listen(3000, () => {
    console.log("Server is running")
})
