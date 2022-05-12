const express = require("express")
const res = require("express/lib/response")
const router = express.Router()

const db = require("../models/connection")

router.get("/",(req,res) =>{
    //console.log("Get the data from the database")
    res.render("addEmp")
})

router.post("/addEmp",(req,res) =>{
    const {name,email,pno,address} = req.body
   const user = {empname:name,empmail:email,empno:pno,empaddress:address}
   let sql = "INSERT INTO `employee` SET ?"
   db.query(sql,user,(err,result) =>{
       if(err) throw err;
       res.send(result)
   })
})
   
router.get('/emplist',(req,res) =>{
       let sql = "SELECT * FROM `employee`"
       db.query(sql,(err,result) =>{
           if(err) throw err;
           res.render("showEmp",{list:result})
       })
   })


router.get("/empupdlist",(req,res) =>{
    let sql = "SELECT * FROM `employee`"
       db.query(sql,(err,result) =>{
           if(err) throw err;
           res.render('updEmp',{list:result})
       })
})

router.get('/empupdate/:uid',(req,res) =>{
    let sql = "SELECT * FROM `employee` WHERE empid  = " +req.params.id
    db.query(sql,(err,result) =>{
        if(err) throw err;
        // console.log(result)
        res.render('updateEmp',{employee:result[0]})
    })
})

router.post('/updEmp',(req,res) =>{
    const {uid,name,email,pno,address} = req.body
    let sql = `UPDATE employee SET empname ='${name}', empmail ='${email}', empno ='${pno}', empaddress ='${address}' WHERE  empid  =${uid}`
    db.query(sql,(err,result) =>{
        if(err) throw err;
        res.redirect('/emplist')
    })
})

router.get('/deleteupdate/:id',(req,res) =>{
    const id = req.params.id 
    let sql = `DELETE FROM employee WHERE empid = ${id}`
    db.query(sql,(err,result) =>{
        if(err) throw err;
        res.redirect('/emplist')
    })
})

module.exports = router