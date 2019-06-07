const hbs = require('express-handlebars')
const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser');

const config = require('./config.json');

const SQL_SELECT_EMPLOYEE = "select * from employees limit ? offset ?";
const SQL_SELECT_EMPLOYEE_BY_EMPNO = "select * from employees where emp_no = ?";

const empPool = mysql.createPool(config.employees)

const PORT = parseInt(process.argv[2] || process.env.APP_PORT || 3000);

const app = express();

app.engine('hbs', hbs())
app.set('view engine', 'hbs')
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded());


















app.get(/.*/, express.static(__dirname + '/public'));