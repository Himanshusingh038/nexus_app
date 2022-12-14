// index.js

/**
 * Required External Modules
 */
const express = require("express");
const path = require("path");
const bodyParser = require('body-parser')
const db = require('./queries')
const pg = require('pg').Pool
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const isAuth = require("./middleware/is-auth");
/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "8000";
const pgPool = new pg({
  user: 'postgres',
  host: 'localhost',
  database: 'nexusDB',
  password: 'pass@123',
  port: 5432,
})

/**
 *  App Configuration
 */
 app.use(bodyParser.json())
 app.use(
   bodyParser.urlencoded({
     extended: true,
   })
 )
 app.use(session({
  resave: true,
  saveUninitialized: true,
  // store: new (require('connect-pg-simple')(session))(),
  store: new pgSession({
    pool : pgPool,                // Connection pool
    tableName : 'sessions' ,// Use another table-name than the default "session" one
    createTableIfMissing: true,  
    // Insert connect-pg-simple options here
  }),
  secret: 'secret',
  resave: false,
  cookie: { maxAge: 4 * 60 * 60 * 1000 } // 4 hours 
  // Insert express-session options here
}));
/**
 * Routes Definitions
 */
app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)
app.post('/generate_promotional',db.generatePromotional)
app.post('/generate_existing',db.generateExisting)
app.get('/get_unassigned_card',db.getUnassignedCard)
app.get('/unassigned_action', isAuth, db.unassignedCardsAction)
app.get('/active', isAuth, db.getActiveCards)
app.get('/inactive', isAuth, db.getInactiveCards)
app.get('/incompete', isAuth, db.getIncompleteCards)
app.get('/get_customers', isAuth,  db.getCustomers)
app.get('/get_customers/:cst_id', isAuth,  db.getCustomerById)
app.get('/check_customer_exists', isAuth,  db.checkCustomerExists)
app.post('/activate_card',isAuth, db.activateCards)
app.get('/dashboard_stats', isAuth, db.dashboardStats)
app.get('/update_remarks',  isAuth, db.updateRemark)
app.post('/login', db.login)
app.post('/logout', db.logout)
app.get('/customer_actions', isAuth, db.customerAction)
app.get('/get_customers', isAuth, db.getCustomer)
app.post('/edit_customer', isAuth, db.editCustomer)



/**
 * Server Activation
 */
app.listen(port,()=>{
    console.log(`listining to the ${port} on node server`)
})