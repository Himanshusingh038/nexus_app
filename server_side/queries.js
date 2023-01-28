const bcrypt = require("bcryptjs");
const { response, request } = require("express");
const md5 = require("md5")
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'nexusDB',
  password: 'pass@123',
  port: 5432,
})
const axios = require("axios");


const getAllCards = (req, res) => {
    console.log('all cards');
    url =`select c.card_id id,
            c.card_unique_id card_no,
            c.card_views as views,
            c.website custom_url,
            c.card_status status,
            c.card_reg_date reg_date,
            c.remarks,
            cs.customer_name  c_name,
            cs.customer_email c_email,
            cs.customer_mobile c_phone
        from customers as cs 
            join cards c on
                cs.customer_num=c.cst_unique_id limit 10`
    pool.query(url, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
};



const generatePromotional = (req,res)=>{
    var {card_count} = req.body
    var status = 'failed'
    var ans = []
    while (card_count--){
        let card_num = Math.floor(Math.random()*10000)
        console.log(card_num);
        sql=`INSERT INTO cards(card_unique_id,card_status) values(${card_num},'unassigned') returning *`
        pool.query(sql,(err,results)=>{
            if (err){
                throw err
            }
            status='success'
            ans.push(results.rows[(results.rows).length-1])
            res.write(JSON.stringify(ans[0]))
        })
    }
    res.status(200).send()
}

const generateExisting = (req,res)=>{
    const {cst_unq_id} = req.body
    q1 = `select * from cards where cst_unique_id='${cst_unq_id}'`
    let status
    pool.query(q1,(err,results)=>{
        if (err){
            throw err
        }
        if (results.rowCount>0){
            let card_num = Math.floor(Math.random()*10000)
            q2 = `update cards set card_unique_id=${card_num},card_status='inactive' where cst_unique_id='${cst_unq_id}'`
            pool.query(q2,(err,results2)=>{
                if (err){
                    throw err
                }
                status = 'success'
                console.log(results.rows)
            })
        }
        else{
            console.log('ytrewq');
            let card_num = Math.floor(Math.random()*10000)
            q2 = `insert into cards(cst_unique_id,card_unique_id) values('${cst_unq_id}','${card_num}')`
            pool.query(q2,(err,results)=>{
                if (err){
                    throw err
                }
                if (results.rowCount>0){
                    status = 'success'
                }
            })
        }
        res.status(200).send(status)
    })
}

const getUnassignedCard = (req,res)=>{
    sql = `select 
    c.card_id id,
    c.card_unique_id card_no,
    c.card_views as views,
    c.website custom_url,
    c.card_status status,
    c.card_reg_date reg_date,
    ROUND(date_part('epoch', c.card_reg_date)) regg_date,
    c.remarks
from cards c
      where  c.card_status='unassigned'
      order by c.card_reg_date desc`
    pool.query(sql,(err,results)=>{
        if (err){
            throw err
        }
        res.status(200).json(results.rows)
    })
}

const unassignedCardsAction = (req,res)=>{
    const {card_id,action} = req.query
    sql = `select * from cards where card_id = ${card_id}`
    pool.query(sql,(err,results)=>{
        if (err){
            throw err
        }
        if (results.rowCount==0){
            res.status(400).send('id not found')
        }
    })
    if (action=='activate'){
        sql = `update cards set card_status='active' where card_id='${card_id}' returning *`
        pool.query(sql,(err,results)=>{
            if (err){
                throw err
            }
            console.log(results.rows);
            res.status(200).send('activated')
        })
    }else if (action=='deactivate'){
        sql = `update cards set card_status='inactive' where card_id='${card_id}' returning *`
        pool.query(sql,(err,results)=>{
            if (err){
                throw err
            }
            console.log(results.rows);
            res.status(200).send('deactivated')
        })
    }else if (action=='delete'){
        sql = `delete from cards where card_id='${card_id}'`
        pool.query(sql,(err,results)=>{
            if (err){
                throw err
            }
            console.log(results.rows);
            res.status(200).send('deleted')
        })
    }
}

const getActiveCards = (req, res) => {
    sql =`select 
            c.card_id id,
            c.card_unique_id card_no,
            c.card_views as views,
            c.website custom_url,
            c.card_status status,
            c.card_reg_date reg_date,
            round(date_part('epoch', c.card_reg_date)) regg_date,
            c.remarks,
            cs.customer_name  c_name,
            cs.customer_email c_email,
            cs.customer_mobile c_phone 
        from cards c
            INNER JOIN customers cs on 
                c.cst_unique_id=cs.customer_num and 
                c.card_status='active'
                order by cs.customer_name`
    pool.query(sql,(err,results)=>{
        if (err){
            throw err
        }
        res.status(200).json(results.rows)
    })
}

const getInactiveCards = (req, res) => {
    sql = `select 
    c.card_id id,
    c.card_unique_id card_no,
    c.card_views as views,
    c.website custom_url,
    c.card_status status,
    c.card_reg_date reg_date,
    date_part('epoch', c.card_reg_date) regg_date,
    c.remarks,
    cs.customer_name  c_name,
    cs.customer_email c_email,
    cs.customer_mobile c_phone 
from cards c
    INNER JOIN customers cs on 
        c.cst_unique_id=cs.customer_num and 
        c.card_status='inactive'
        order by cs.customer_name`
    pool.query(sql,(err,results)=>{
        if (err){
            throw err
        }
        res.status(200).json(results.rows)
    })
}
const getIncompleteCards = (req, res) => {
    sql = `select * from cards c
                INNER JOIN customers cst on 
                c.cst_unique_id=cst.customer_num and 
                c.card_status!='active'`
    pool.query(sql,(err,results)=>{
        if (err){
            throw err
        }
        res.status(200).json(results.rows)
    })
}

const getCustomers = (req, res) => {
  console.log('getcustomers');
  sql = ` select customer_id id,
                customer_num cust_id,
                customer_name as name,
                customer_email email,
                customer_mobile phone,
                customer_reg_date reg_date,
                date_part('epoch',customer_reg_date ) regg_date 
            from customers
            order by lower(customer_name)`;
  pool.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
};

const customerAction = (req, res) => {
    const {action,cst_id} = req.query

    if (action=='activate'){
        sql = `update customers set customer_status='active' where customer_id='${cst_id}' returning *`
        status = 'failed'
        pool.query(sql,(err,results)=>{
            if (err){
                throw err
            }
            if (results.rowCount>0){
                status = 'success'
            }
            res.status(200).send(status)
        })
    }else if (action=='deactivate'){
        sql = `update customers set customer_status='inactive' where customer_id='${cst_id}' returning *`
        status = 'failed'
        pool.query(sql,(err,results)=>{
            if (err){
                throw err
            }
            if (results.rowCount>0){
                status ='success'
            }
            res.status(200).send(status)
        })
    }else if (action=='access_panel'){
        sql = `select * from customers  where customer_id='${cst_id}'`
        pool.query(sql,(err,results)=>{
            if (err){
                throw err
            }
            if (results.rowCount>0){
                req.session.cst_id = cst_id
                status ='success'
            }
            res.status(200).send(status)
        })
    }else if (action=='delete'){
        sql = `select * from customers where customer_id='${cst_id}'`
        pool.query(sql,(err,results)=>{
            if (err){
                throw err
            }
            if (results.rowCount>0){
                customer_num = results.rows[0]['customer_num'] 
                sql = `delete from customers where customer_id='${cst_id}' returning *`
                pool.query(sql,(err,results)=>{
                    if (err){
                        throw err
                    }   
                    sql = `delete from cards where cst_unique_id='${customer_num}'`
                    pool.query(sql,(err,results)=>{
                        if (err){
                            throw err
                        }
                        status ='success'
                        res.status(200).send(status)
                    })
                })
            }else{
                results.status(500).json({"message": "Customer not found"})
            }
        })
        
    }
}

const checkCustomerExists = (req,res) => {
    console.log('checkCustomerExists');
    const {card_id,action} = req.query
    sql = `select * from cards where card_id='${card_id}' and card_status IN ('incomplete', 'unassigned')`
    console.log(sql);
    pool.query(sql,(err,results)=>{
        if (err){
            throw err
        }
        if (results.rowCount>0){
            data = results.rows
            cst_unq_id = data[0]['cst_unique_id']
            if (cst_unq_id != null){
                sql = `select * from customers where customer_num='${cst_unq_id}'`
                pool.query(sql,(err,results)=>{
                    if (err){
                        throw err
                    }
                    console.log(results.rowCount);
                    if (results.rowCount==0){
                        console.log('very bad');
                        res.status(500).json({message:"customer not found"})
                    }
                    console.log('bad -place');
                    data = results.rows
                    name = data[0]['customer_name'].trim().split(' ')
                    fname = name[0]
                    lname = name[1]
                    email = data[0]['customer_email']
                    cst_exists = 'yes'
                    res.status(200).json({fname: fname, lname: lname, email: email, cst_exists: cst_exists,'cst_unq_id': cst_unq_id})
                })
            }else{
                fname = ''
                lname = ''
                email = ''
                cst_exists = 'no'
                res.status(200).json({fname: fname, lname: lname, email: email, cst_exists: cst_exists,'cst_unq_id': cst_unq_id})
            }
            
        }else{
            res.redirect('/unassigned-cards')
        }
    })
}

const activateCards = (req, res) => {
    console.log('activate cards ')
    const {fname, lname, cst_email, password,card_id, old_email, cst_exists, cst_unique_id} = req.body
    if (fname === null || fname  === '' || lname === null || lname === ''){
        name = ''
    }else{
        name = fname+' '+lname
    }
    new_pass = md5(password)
    console.log(cst_unique_id);
    if (cst_exists=='yes'){
        console.log('cst_exists')
        if (cst_email!==old_email){
            console.log('cst_email!=old_email');
            sql = `select * from customers where customer_email='${cst_email}'`
            pool.query(sql,(err,results)=>{
                if (err){
                    throw err
                }
                if (results.rowCount>0){
                    res.status(200).send('customer already exists')
                }else{
                    console.log('update customers accounts');
                    sql = `update customers set customer_name='${name}',customer_email='${cst_email}',customer_password='${new_pass}' where customer_num='${cst_unique_id}'`
                    pool.query(sql,(err,results)=>{
                        if (err){
                            throw err
                        }
                        if (results.rowCount>0){
                            sql = `update cards set fname='${fname}',lname='${lname}',card_status='active',email='${cst_email}' where card_id='${card_id}'`
                            pool.query(sql,(err,results)=>{
                                if (err){
                                    throw err
                                }
                                if (results.rowCount>0){
                                    res.status(200).json({'message': 'Account Activated successfully'})
                                }
                            })
                        }
                    })
                }
            })
        }else{
            console.log('cst_email=old_email');
            sql = `update customers set customer_name='${name}',customer_email='${cst_email}',customer_password='${new_pass}' where customer_num='${cst_unique_id}'`
            pool.query(sql,(err,results)=>{
                if (err){
                    throw err
                }
                if (results.rowCount>0){
                    sql = `update cards set fname='${fname}',lname='${lname}',card_status='active',email='${cst_email}' where card_id='${card_id}' returning *`
                    pool.query(sql,(err,results)=>{
                        if (err){
                            throw err
                        }
                        if (results.rowCount>0){
                            console.log(results.rows);
                            res.status(200).json({'message': 'Account Activated successfully'})
                        }
                    })
                }
            })
        }
    }else if (cst_exists=='no'){
        var cst_unq_id = Math.floor(Math.random()*(99999999-11111111))
        sql = `select * from customers where customer_email='${cst_email}'`
        pool.query(sql,(err,results)=>{
            if (err){
                throw err
            }
            if (results.rowCount>0){
                res.status(200).send('Email Already Exists')
            }else{
                sql = `insert into customers (customer_name,customer_email,customer_password,customer_num) values('${name}','${cst_email}','${new_pass}','${cst_unq_id}')`;
                pool.query(sql,(err,results)=>{
                    if (err){
                        console.log(err);
                        throw err
                    }
                    console.log('step 2');
                    if (results.rowCount>0){
                        sql = `update cards set fname='${fname}',lname='${lname}',email='${cst_email}',card_status='active',cst_unique_id='${cst_unq_id}' where card_id='${card_id}'`
                        pool.query(sql,(err,results)=>{
                            if (err){
                                throw err
                            }
                            console.log('step 3');
                            if (results.rowCount>0){
                                res.status(200).json({'message': 'Account Activated successfully'})
                            }
                        })
                    }
                }) 
            }
        })
    }
}

const dashboardStats = async (req, res) => {
    console.log('dashboard stats');
    try{
        sql_cst_count = `select * from customers`
        var data = await pool.query(sql_cst_count)
        const total_cst = data.rowCount
        sql_card_count = `select * from cards INNER JOIN customers on cards.cst_unique_id=customers.customer_num`
        var data = await pool.query(sql_card_count)
        const tot_cards = data.rowCount
        sql_active_card_count = `select * from cards INNER JOIN customers on cards.cst_unique_id=customers.customer_num where cards.card_status='active'`
        var data = await pool.query(sql_active_card_count)
        const tot_active_card_count = data.rowCount
        sql_inactive_card_count = `select * from cards INNER JOIN customers on cards.cst_unique_id=customers.customer_num where cards.card_status='inactive'`
        var data = await pool.query(sql_inactive_card_count)
        const tot_inactive_card_count = data.rowCount
        sql_incomplete_card_count = `select * from cards INNER JOIN customers on cards.cst_unique_id=customers.customer_num where cards.card_status='incomplete'`
        var data = await pool.query(sql_incomplete_card_count)
        const tot_incomplete_card_count = data.rowCount
        sql_unassigned_card_count = `select * from cards where cards.card_status='unassigned'`
        var data = await pool.query(sql_unassigned_card_count)
        const tot_unassigned_card_count = data.rowCount
        sql_cards_data = `select * from cards INNER JOIN customers on cards.cst_unique_id=customers.customer_num`
        var data = await pool.query(sql_cards_data) 
        const cards_data = data.rows
        res.status(200).json({'total_cst':total_cst, 'total_cards': tot_cards, 'active_cards': tot_active_card_count, 'inactive_cards':tot_inactive_card_count, 'incomplete_cards':tot_incomplete_card_count, 'unassigned_cards': tot_unassigned_card_count, 'cards_data':cards_data})
    }catch(err){
        console.log(err)
        res.status(500).json({'message': 'Internal Server Error'})
    }
}

const getCustomerById = async (req, res) => {
    try{
        const cst_id=req.params.cst_id
        console.log(cst_id);
        sql = `select * from customers where customer_id='${cst_id}'`
        var data = await pool.query(sql)
        const row = data.rows
        res.status(200).json({'total_cst':row})
    }catch(err){
        console.log(err)
        res.status(500).json({'message': 'cst not found'})
    }
}

const updateRemark = async (req, res) => {
    try{
        const {card_id,remarks} = req.body
        if (card_id == null || remarks == null){
            res.status(500).json({'status':'failed'})
        }else{
            sql = `update cards set remarks='${remarks}' where card_id=${card_id} returning *`
            var data = await pool.query(sql)
            console.log(data.rows[0].card_id,data.rows[0].remarks);
            const row = data.rowCount
            if (row>0){
                res.status(200).json({'status':'success'})
            }else{
                res.status(500).json({'status':'failed'})
            }
        }
    }catch(err){
        console.log(err)
        res.status(500).json({'message': 'Internal Server Error'})
    }
}

const login = async(req,res) =>{
    try{
        const {email,password} = req.body
        if (email == null || password == null){
            res.status(400).json({'status':'failed'})
        }else{
            sql = `select password from admin where email='${email}'`
            var data = await pool.query(sql)
            if (!data.rows[0]) {
              req.session.error = "Invalid Credentials";
              res.status(200).json({ status: "email not found" });
            } else {
              console.log("hello");
              const user_password = data.rows[0]["password"];
              console.log(user_password);
              const isMatch = await bcrypt.compare(password, user_password);
              if (!isMatch) {
                req.session.error = "Invalid Credentials";
                console.log("wrong place");
                res.status(200).json({ status: "wrong password" });
              } else {
                req.session.isAuth = true;
                req.session.username = email;
                res.cookie("cookieName", "12345678", {
                  maxAge: 900000,
                  httpOnly: true,
                });
                res.cookie("loggedIn", "true", {
                  maxAge: 8640000 * 12,
                  path: "/",
                });
                res.cookie("auth", "123456", {
                  path: "/", // Make the cookie available to all routes
                  maxAge: 60 * 60 * 1000, // Set the cookie to expire in one hour
                });

                res.send({ status: "success" });
              }
            }
            
        }
    }catch(err){
        console.log(err)
        res.status(500).json({'message': 'Internal Server Error',"error":err})
    }
}

const logout = (req, res) => {
  req.session.destroy((err) => {
    res.setHeader("set-cookie", "loggedIn=true; max-age=0");
    if (err) throw err;
    res.json({'message': 'logout successful'});
    // res.redirect("/login");
  });
};
const getCustomer = async(req, res) => {
    const cst_id = req.query.cst_id;
    sql = `select * from customers where customer_id='${cst_id}'`
    var data = await pool.query(sql)
    const rows = data.rows
    res.status(200).json({'total_cst':rows})
}
const editCustomer = async(req, res) => {
    try{
        console.log('\edit_customer');
        const {name,designation,email,mobile,cst_id} = req.body
        sql = `update customers set customer_name='${name}',customer_designation='${designation}',customer_mobile='${mobile}',customer_email='${email}' where customer_num='${cst_id}' returning *`
        var data = await pool.query(sql)
        const row = data.rows
        if (row.length>0){
            res.status(200).json({'status':'Profile updated successfully'})
        }else{
            res.status(200).json({'status':'Profile Update Failed'})
        }
    }catch{
        res.status(500).json({'message': 'Internal Server Error'})
    }
}

const updatePassword = async(req, res) => {
    const {email, current_password,new_password,confirm_password} = req.body
    const sql =  `select password from admin where email='${email}'`
    var status = 'failed'
    try {
        console.log(sql);
        var data = await pool.query(sql)
        if (data.rows.length==0){
            res.status(500).json({"error":"incorrect mail address"})
        }
        const old_password = data.rows[0].password
        const isMatch = await bcrypt.compare(current_password, old_password);
        if(isMatch && new_password==confirm_password){
            new_pass = await bcrypt.hash(new_password, 10)
            const sql = `update admin set password='${new_pass}' where email='${email}'`
            var data = await pool.query(sql)
            status = 'password changed'
        }
    }catch (error) {
        console.log(error);
        status = 'error: check in console'
        res.status(500).json({"error":error})
    }finally{
        console.log(status);
        res.send({'status':status})
    }
}

module.exports = {
    generatePromotional,
    generateExisting,
    getUnassignedCard,
    unassignedCardsAction,
    getActiveCards,
    getInactiveCards,
    getIncompleteCards,
    getCustomers,
    customerAction,
    checkCustomerExists,
    activateCards,
    dashboardStats,
    getCustomerById,
    updateRemark,
    login,
    logout,
    customerAction,
    getCustomer,
    editCustomer,
    getAllCards,
    updatePassword
  }