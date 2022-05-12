const express = require("express")
const empController = require("./controller/emploeeController")

const app = express()
const exphbs = require("express-handlebars")

app.engine('handlebars',exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

//Get the data from the form
app.use(express.urlencoded({extended:true}))

app.use("/",empController)

const PORT = 3000
app.listen(PORT,()=>console.log(`Sevrer is running at ${PORT}`))