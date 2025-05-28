const express = require('express')
const app = express()
const port =3005
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))

app.listen(port, () => {
})


const task = [
    { message: "salut à tous"}
]
app.get('/task', (req, res) => {
    res.send(task)
})
