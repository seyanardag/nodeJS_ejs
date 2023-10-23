
var express = require("express");
var app = express();

app.set("view engine", "ejs");

let ejs = require("ejs");

app.use(express.static('public'));
app.use(express.static('node_modules'));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = require("./data/db");

// const data = [
//     { id: 1, isOnHome: true, name: "iphone 13", price: 3000, isActive: true, imgUrl: "1.jpg" },
//     { id: 2, isOnHome: false, name: "iphone 14", price: 4000, isActive: true, imgUrl: "2.jpg" },
//     { id: 3, isOnHome: true, name: "iphone 15", price: 5000, isActive: false, imgUrl: "3.jpg" }
// ]

app.post("/postala", (req, res) => {
    const veri = req.body;
  
    if (veri && veri.name) {
      console.log(veri.name);
      res.status(200).send("EKLEME YAPILDI");
    } else {
      res.status(400).send("Hatalı veya eksik veri gönderildi");
    }
  });

app.post("/postalaa", (req,res)=>{
    const veri = req.body;
    console.log(veri.name);
    const sql = 'INSERT INTO products (isOnHome, name, price, isActive, imgUrl) VALUES (?, ?, ?, ?, ?)';
    const degerler = [veri.isOnHome, veri.name, veri.price, veri.isActive, veri.imgUrl];
    connection.query(sql,degerler, (err,result)=> {
        if(err) {
            console.log(err);
            res.status(500).send("veri eklemede hata oluştu");
        } else {
            console.log(result);
            res.status(200).send("veri başarıyla eklendi");
        }
    } )  
})


app.post("/postalaaa", async (req, res) => {
    const veri = req.body;
    console.log(veri.name);
    const sql = 'INSERT INTO products (isOnHome, name, price, isActive, imgUrl) VALUES (?, ?, ?, ?, ?)';
    const degerler = [veri.isOnHome, veri.name, veri.price, veri.isActive, veri.imgUrl];
    try {
        const result = await connection.query(sql, degerler);
        console.log(result);
            res.status(200).send("ekleme yapıldı");
    } catch (error) {
        console.error(error);
        res.status(400).send("ekleme YAPILAMADI");
    }
    // connection.query(sql, degerler, (err, result) => {

    
    //   if (err) {
    //     console.log(err);
    //     res.status(500).send("Veri eklemede hata oluştu");
    //   } else {
    //     console.log(result);
    //     res.status(200).send("Veri başarıyla eklendi");
    //   }
    // });
  });

 
app.post("/delete", async (req,res)=>{
    const id =  await req.body.id;
    console.log(id);
    const sql = 'DELETE from products WHERE id=?';
    try {
        const result = await connection.query(sql,id);
        console.log(result);
        res.status(200).send(`${id} nolu kayıt başarıyla silindi`);
    } catch (error) {
        console.log(error);
        res.status(400).send(`${id} nolu kayıt SİLİNEMEDİ`);
    }
})


app.post("/delete/:id",async (req,res)=>{

    const id = req.params.id;
    const sql = 'DELETE from products WHERE id=?';

  try {
    const result = await connection.query(sql,id)
    console.log(result);
    res.status(200).send(`${id} nolu veri başarıyla silindi`);
  } catch (error) {
    console.error(error);
    res.status(400).send("SİLME BAŞARISIZ!");
  }
    
})


app.use("/products/:id", (req, res) => {
    const urun = data.find(u => u.id == req.params.id);
    // res.send("product detail:" + req.params.id);   
    res.render("productsDetail", { urun: urun }); //ejs de urun.name olarak karşılamak gerek. 
    // res.render("productsDetail", urun); //ejs de name olarak karşılamak gerek. 
})


app.get("/products", (req, res) => {
    // res.write("<p>All products</p>");  
    res.render("products", {
        products: data
    }
    );
    res.end();
})


// app.use("/", (req, res) => {
//     connection.execute("SELECT * FROM products")
//         .then( 
//             result => {
//                 console.log(result[0])
//                 res.render('index', { products: result[0] });
//             })
//         .catch(
//             err => console.log(err));
// })

app.use("/", async (req,res)=>{
    const result =  await connection.query("SELECT * FROM products");
    res.render("index",{
        products : result[0]
    })
    res.end();
})

app.listen(3000, () => {
    console.log("listening on port 3000");
});






// var http = require("http");

// app.get("/",(req,res)=>{
//     res.write("<h1>Heeas</h1>");
//     res.end();
// })

// var server = http.createServer((req,res)=>{
//     console.log('server çalştı');
//     res.write("<h1>Hee</h1>");
//     res.write("<h1>a</h1>");
//     res.end();
// })


// server.listen(3000);