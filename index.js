const express = require('express');
const fs = require('fs');
const path = require("path");
const sharp = require('sharp');
const app = express();
const {Client} = require('pg');

const client = new Client({
    host: 'localhost',
    user:'mada',
    password:'parola',
    database: 'proiect_web',
    port: 5432
})
client.connect()


app.set("view engine","ejs");

app.use("/resurse", express.static(path.join(__dirname,"/resurse")));

/*app.use(favicon(__dirname + '/favicon.iso'));*/

function getSeasonByMonthNumber(month) {
    if (month == 11 || month == 0 || month == 1)
        return 'iarna';
    if (month == 2 || month == 3 || month == 4)
        return 'primavara';
    if (month == 5 || month == 6 || month == 7)
            return 'vara';
    if (month == 8 || month == 9 || month == 10)
        return 'toamna';
}

function verificaImagini(){
	var textFisier=fs.readFileSync("resurse/json/galerie.json") 
	var jsi=JSON.parse(textFisier); 

	var caleGalerie = jsi.cale_galerie;
    let vectImagini=[]

    let currentDate = new Date();

    let currentSeason = getSeasonByMonthNumber(currentDate.getMonth()); 

	for (let im of jsi.imagini){
		var imVeche= path.join(caleGalerie, im.cale_fisier); 
		var ext = path.extname(im.cale_fisier); 
		var numeFisier =path.basename(im.cale_fisier,ext) 
		let imNoua=path.join(caleGalerie+"/mic/", numeFisier+"-mic"+".webp");
        if (currentSeason == im.anotimp) 
            vectImagini.push({mare:imVeche, mic:imNoua, titlu:im.titlu}); 
        
        if (!fs.existsSync(imNoua)) 
		sharp(imVeche)
		  .resize(350)
		  .toFile(imNoua, function(err) {
              if(err)
			    console.log("eroare conversie",imVeche, "->", imNoua, err);
		  });
	}
   
    return vectImagini; 
}

/*
app.get("/", function(req,res){
   res.render("pagini/index");
}); 
*/
app.get(["/","/index"], function(req, res) { //ca sa pot accesa pagina principala si cu localhost:8080 si cu localhost:8080/index
    res.render("pagini/index", {imagini1: verificaImagini(), ip:req.ip}); /* relative intotdeauna la folderul views*/
});

app.get("/data", function(req,res){
    res.setHeader("Content-Type","text/html");
    res.write("<!DOCTYPE html><html><head><title>Node!!</title></head><body>"+new Date());
    res.write("</body></html>");
    res.end();
});

app.get("/produse", function(req,res){
    console.log("Url: ", req.url)
    console.log("Query: ", req.query.categ)
    var conditie = req.query.categ ? " where clasificare='"+req.query.categ+"'":"";
    console.log("select * from produse"+conditie)
    client.query("select * from produse"+conditie, function(err, rez){
        //console.log(rez.rows);
        res.render("pagini/produse", {produse:rez.rows});
    });
}); 

app.get("/produs/:id_prajitura", function(req,res){
    
        const rezultat = client.query("select * from produse where id="+req.params.id_prajitura, function(err, rez){
            
            res.render("pagini/produs", {prod:rez.rows[0]});
        })

}); 

app.get("/*", function(req,res){
    //console.log(req.url);
    res.render("pagini"+req.url,function(err, rezultatRender){
        if(err){
            if(err.message.includes("Failed to lookup view")){
                res.status(404).render("pagini/404");
            }
            else
                throw err;
        }
        else
            res.send(rezultatRender);
    });
}); 

app.listen(8080);
console.log("A pornit serverul.");

var textFisier=fs.readFileSync("resurse/json/galerie.json") 
var jsi=JSON.parse(textFisier); 

var caleGalerie=jsi.cale_galerie;


verificaImagini();