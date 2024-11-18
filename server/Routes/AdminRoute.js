import  express, { Router }  from "express";
import cors from 'cors';



const router = express.Router()

router.post('/login', (req, res) => {
    console.log(req.body)
})

export {Router as AdminRouter}