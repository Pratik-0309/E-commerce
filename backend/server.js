import express from 'express'
import cors from 'cors'
import 'dotenv/config'

const app = express();

app.use(express.json());
app.use(cors());

app.listen(process.env.PORT || 8080, ()=>{
    console.log(`Server is running on port ${process.env.PORT || 8080}  `);
    
})

app.get('/',(req,res)=>{
    res.send('Hello World');
})
