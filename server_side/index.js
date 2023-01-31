const express = require("express");
const bodyParser = require("body-parser");
const db = require("./queries");
const pg = require("pg").Pool;
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const isAuth = require("./middleware/is-auth");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const activateCards = require("./routes/activate_card");
const getActiveCards = require("./routes/active_cards");
const getInactiveCards = require("./routes/inactive_cards");
const dashboardStats = require("./routes/dashboard_stats");
const getIncompleteCards = require("./routes/incomplete_cards");
const getCustomers = require("./routes/get_customers");
const getCustomersById = require("./routes/get_customers_by_id");
const checkCustomerExists = require("./routes/check_customer_exists");
const updateRemark = require("./routes/update_remarks");
const login = require("./routes/login");
const logout = require("./routes/logout");
const customerAction = require("./routes/customer_actions");
const editCustomer = require("./routes/edit_customer");
const getAllCards = require("./routes/all_cards");
const updatePassword = require("./routes/update_password");
const unassignedCardsAction = require("./routes/unassigned_action");
const getUnassignedCard = require("./routes/get_unassigned_card");
const generatePromotional = require("./routes/generate_promotional");

const app = express();

app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
const port = process.env.PORT || "8000";
const pgPool = new pg({
  user: "postgres",
  host: "localhost",
  database: "nexusDB",
  password: "pass@123",
  port: 5432,
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    store: new pgSession({
      pool: pgPool,
      tableName: "sessions",
      createTableIfMissing: true,
    }),
    secret: "secret",
    resave: false,
    cookie: { maxAge: 4 * 60 * 60 * 1000, domain: "localhost" },
  })
);
app.post("/generate_promotional", isAuth, generatePromotional);
app.post("/generate_existing", isAuth, db.generateExisting);
app.get("/get_unassigned_card", isAuth, getUnassignedCard);
app.get("/unassigned_action", isAuth, unassignedCardsAction);
app.get("/active", isAuth, getActiveCards);
app.get("/inactive", isAuth, getInactiveCards);
app.get("/incompete", isAuth, getIncompleteCards);
app.get("/get_customers", isAuth, getCustomers);
app.get("/get_customers/:cst_id", isAuth, getCustomersById);
app.get("/check_customer_exists", checkCustomerExists);
app.post("/activate_card", isAuth, activateCards);
app.get("/dashboard_stats", isAuth, dashboardStats);
app.post("/update_remarks", isAuth, updateRemark);
app.post("/login", login);
app.get("/logout", logout);
app.get("/customer_actions", isAuth, customerAction);
app.post("/edit_customer", isAuth, editCustomer);
app.get("/all_cards", getAllCards);
app.post("/update_password", updatePassword);

app.listen(port, () => {
  console.log(`listining to the ${port} on node server`);
});
