import { Router } from "express";
// import path, { dirname } from "path";
// import { fileURLToPath } from "url";

const router = Router()
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename)

router.get('/',(req,res)=>{
    // res.status(200)
    // res.sendFile(path.join(__dirname, 'views', 'index.html'))
    res.send('Main page')
})

router.get('/products',(req,res)=>{
    res.send('products page')
})

router.get('/add',(req,res)=>{
    res.send('add page')
})

export default router