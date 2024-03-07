import express, { urlencoded } from "express";
import mongoose from "mongoose";
import flash from "connect-flash";
import cookieParser from "cookie-parser"
import session from "express-session"
import * as dotenv from "dotenv";
dotenv.config()

//Routes
import AuthRoutes from "./routes/auth.js";
import ProductRoutes from "./routes/products.js";
import varMiddlewate from "./middleware/var.js";

const app = express()

app.use(express.urlencoded({extended: 'true'}))
app.use(express.json())
app.use(cookieParser());
app.use(session({ secret: 'Yahyo', resave: false, saveUninitialized: false}));
app.use(flash());

app.use(varMiddlewate)

app.use(AuthRoutes)
app.use(ProductRoutes)

const startApp =()=>{
    try {
        mongoose.connect(process.env.MONGO_URI, {
            // useNewUrlParser: true, 
        })
        .then(() => {
            console.log('Connected to MongoDB');
        })
        const PORT = process.env.PORT || 4100
        app.listen(PORT, ()=>{ console.log(`Server is running on port ${PORT}`)})
        
    } catch (error) {
        console.log(error);
    }
}
startApp()