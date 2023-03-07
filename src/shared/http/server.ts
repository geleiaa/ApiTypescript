import express from 'express'
import cors from 'cors'
import routes from './routes'

const app = express()

app.use(cors())
app.use(express.json())

app.use(routes)

const port = 1234
app.listen(port, () => {
    console.log(`Server started in port ${port}...`);
})