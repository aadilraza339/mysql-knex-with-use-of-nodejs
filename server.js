var express = require('express');
var app = express();
var sqlite3 = require('sqlite3');
app.use(express.json());

app.get('/courses',(req,res)=>{
    var db = new sqlite3.Database('saral',(err)=>{
        if(!err){
            db.run("create table saral(id integer primary key autoincrement,courses text, discripsion text)",(err,data)=>{
                if(!err){
                    res.send(data)
                    console.log("table created succesfully")
                }else{
                    res.send("tables is already exists ")
                    console.log(err)
                }
            })
        }else{
            console.log(err)
        }  
})
})


app.post('/courses/post',(req,res)=>{
    let courses = req.body.courses
    let discripsion = req.body.discripsion
    let db = new sqlite3.Database('saral',(err)=>{
        if(!err){
            db.run('insert into saral(courses,discripsion) values("'+ courses +'", "'+ discripsion +'");');
            console.log('insert into saral (courses, discripsion) values("'+ courses +'", "'+ discripsion +'" );');
            res.send(req.body)
        }else{
            console.log(err)
        }
    })
})

app.get('/get',(req,res)=>{
    let db = new sqlite3.Database('saral',(err)=>{
        if(!err){
            db.all("select * from saral",(err,data)=>{
                if(!err){
                    return res.send(data)
                }else{
                    console.log(err)
                }
            })
        }else{
            console.log("you tables is not create")
        }
    })
})

app.get('/get/:id',(req,res)=>{
    let id = req.params.id
    let db = new sqlite3.Database('saral',(err)=>{
        if(!err){
            db.all("select * from saral where id =" +id,(err,data)=>{
                if(data.length>0){
                    return res.send(data)
                }else{
                    res.send({data:"please select corect id"})
                }
            })
        }
    })
})

app.put('/put/:id',(req,res)=>{
    let courses = req.body.courses
    let discripsion = req.body.discripsion
    let db = new sqlite3.Database('saral',(err)=>{
        if(!err){
            db.run('update saral set courses = "'+courses+'", discripsion="'+discripsion +'" where id = "'+req.params.id+'"' );
            res.send(req.body)
        }else{
            res.send(err)
            console.log(err)
        }
    })
})

app.delete('/delete/:id',(req,res)=>{
    let = db = new sqlite3.Database('saral',(err)=>{
        if(err){
            console.log('sorry your id is worrn');
            res.send(err)
        }else{
            db .run('delete from saral where id ="'+req.params.id +'"')
            res.send("done")
        }
    })
})




app.listen(8080,()=>{
    console.log("working....")
})






















