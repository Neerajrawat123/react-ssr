import express from 'express'
import dotenv from 'dotenv'
import fs from 'node:fs/promises'
import path from 'node:path'
import authRouter from './routes/auth.routes.js'
import TaskRouter from './routes/task.routes.js'
import connectDB from './db.js'
import {createServer} from 'vite'
dotenv.config()

const base = process.env.BASE || '/'
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))




const vite = await createServer({
    server: {
        middlewareMode: true,
    },
    appType: 'custom',
    base
});

app.use(vite.middlewares);


app.use('*', async (req, res) => {
    const url = req.originalUrl.replace(base, '');
    
    try {
        const filePath = path.resolve('index.html');
        const file =  await fs.readFile(filePath, 'utf-8')
        const template = await vite.transformIndexHtml(url, file);
        const { render } = await vite.ssrLoadModule('/src/entry-server.jsx');
        console.log('file')
        console.log('this')
        
        const html = template.replace(`<!--outlet-->`, render);
        console.log('uuu')
        res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (error) {
        res.status(500).end(error);
    }
});


app.use('/api/auth', authRouter)
app.use('/api', TaskRouter )



connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log('server is listening on port ', process.env.PORT)
    })

}).catch(err => {
    console.log('mongodb cannot connent', err)
})
