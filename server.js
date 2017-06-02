const express = require('express')
const morgan = require('morgan')

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json();

const fileRouter = require('./fileRouter')

const fs = require('fs')

const app = express()

const newContent = "new content to save";
const fileName = "file.txt";

app.use(morgan('common'))
app.use(jsonParser)

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  next();
});


app.use('/file-posts', fileRouter)




app.listen(process.env.PORT || 8080, () => {
    console.log(`you are listening on ${process.env.PORT || 8080}`)
})
