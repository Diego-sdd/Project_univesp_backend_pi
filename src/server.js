const express = require('express');
const cors = require('cors')
require = require('esm')(module)

//const bodyParse = require('body-parser');


const app = express();
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false}))

require('./routes/v1')(app);


app.listen(3333)