require('dotenv').config()

const express = require('express')
const app = express()

const PORT = process.env.PORT || 3001

app.get('/', function (req, res) {
  res.send('Hello Geeks!')
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

const mysql = require('mysql')
const bodyParser = require('body-parser')

const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME
const DB_TABLE_NAME = process.env.DB_TABLE_NAME

const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME
})

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err)
    return
  }
  console.log('Connected to MySQL database')
  
  const tableName = DB_TABLE_NAME
  connection.query(`DESCRIBE ${tableName}`, (error, results) => {
    if (error) {
      throw error
    }
    console.log('Table description:', results)
  })

  const newUser = {
    FirstName: 'Ermias',
    LastName: 'Ferrell',
    Department: 'IT',
    JobTitle: 'Software Engineer',
    StartDate: '2024-05-15',
    EndDate: null,
    Salary: 100000.00 
  }

  connection.query('INSERT INTO employees SET ?', newUser, (error, results) => {
    if (error) {
      throw error;
    }
    console.log('New user added:', results)
  })

  connection.end()
})

connection.on('error', (err) => {
  console.error('MySQL connection error:', err)
})
