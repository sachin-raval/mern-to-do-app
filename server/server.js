require('dotenv').config();
const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const dbConnect = require('./config/dbConection');
const UserRouter = require('./routes/userRoutes');
const Router = require('./routes/taskRoutes');

dbConnect();
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:1000',
    credentials: true,
}))

// API END-POINTS
app.use('/api/user' , UserRouter)
app.use('/api/task' , Router)


app.listen(process.env.PORT , console.log("Server Started..."))