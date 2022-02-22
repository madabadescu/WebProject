window.onload=function(){

    var rng=document.getElementById("inp-pret");
	rng.parentNode.insertBefore(document.createTextNode(rng.min),rng);
	rng.parentNode.appendChild(document.createTextNode(rng.max));
    let spval=document.createElement("span");
	rng.parentNode.appendChild(spval)
    rng.value=0;
    spval.innerHTML=" ("+rng.value+")";
    rng.onchange=function(){
        rng.nextSibling.nextSibling.innerHTML=" ("+this.value+")";
    }

    var rng2=document.getElementById("inp-pret2");
	rng2.parentNode.insertBefore(document.createTextNode(rng2.min),rng2);
	rng2.parentNode.appendChild(document.createTextNode(rng2.max));
    let spval2=document.createElement("span");
	rng2.parentNode.appendChild(spval2)
    rng2.value=0;
    spval2.innerHTML=" ("+rng2.value+")";
    rng2.onchange=function(){
        rng2.nextSibling.nextSibling.innerHTML=" ("+this.value+")";
    }

    let btn=document.getElementById("filtrare");
    btn.onclick=function(){
        /*
        let inp=document.getElementById("inp-calorii");
        let maxCalorii = inp.value
        */

        
        inp=document.getElementById("inp-pret");
        let minPret=inp.value

        inp2=document.getElementById("inp-pret2");
        let maxPret=inp2.value


        
        let sel=document.getElementById("inp-categorie");
        let categorieSel=sel.value

        var radiobuttons=document.getElementsByName("gr_rad");	
        console.log("text")	
		console.log(radiobuttons);

		for(let rad of radiobuttons){
            console.log("ceva");
			if(rad.checked){
                console.log(rad.value)
				let categorieRad=rad.value;
                console.log(categorieRad)
				break;
			}
		}

        var checkboxes=document.getElementsByName("gr_chck");		
		var sir="";
		for(let ch of checkboxes){
			if(ch.checked)
				sir+=ch.value+",";
		}
        console.log(sir)
        var checkCoperta = sir.split(",");
        for (let categCop of checkCoperta)
            console.log(categCop)
        

        var produse=document.getElementsByClassName("produs");
    
        for (let prod of produse){
            prod.style.display="none";
    
            let conditie1 = false
            let categorieCoperta = prod.getElementsByClassName("val-categ")[0].innerHTML
            for (let categCop of checkCoperta){
                if(categCop==categorieCoperta){
                    //console.log(categCop)
                    conditie1 = true
                    break
                }
                if(categCop=="toate"){
                    //console.log(categCop)
                    conditie1 = true
                    break
                }

            }
            //console.log(conditie1)


            let pret= parseInt(prod.getElementsByClassName("val-pret")[0].innerHTML)
            let conditie2= pret>=minPret
            let conditie3= pret<=maxPret
            
            let categorieArt= prod.getElementsByClassName("val-clas")[0].innerHTML
            let conditie4= (categorieArt==categorieSel || categorieSel=="toate");
            
            let numeText = document.getElementById("i_text").value
            let numeArt = prod.getElementsByClassName("val-nume")[0].innerHTML
            let conditie5= (numeText==numeArt || numeText =="abc")

            let conditieFinala=conditie1 && conditie2 && conditie3 && conditie4 && conditie5;
            if (conditieFinala)
                prod.style.display="block";
        }
    }


    function sortArticole(factor){
        
        var produse=document.getElementsByClassName("produs");
        let arrayProduse=Array.from(produse);
        arrayProduse.sort(function(art1,art2){
            let nume1=art1.getElementsByClassName("val-nume")[0].innerHTML;
            let nume2=art2.getElementsByClassName("val-nume")[0].innerHTML;
            if(nume1.localeCompare(nume2)==0){
            
                let desc1=art1.getElementsByClassName("val-desc")[0].innerHTML;
                let desc2=art2.getElementsByClassName("val-desc")[0].innerHTML;
                return desc1.length - desc2.length;
            
            }
            return factor*nume1.localeCompare(nume2);
        });
        

        console.log(arrayProduse); 
        for (let prod of arrayProduse){
            prod.parentNode.appendChild(prod);
            console.log(prod)
        }
    }

    btn=document.getElementById("sortCrescNume");
    btn.onclick=function(){
        sortArticole(1);
    }
    btn=document.getElementById("sortDescrescNume");
    btn.onclick=function(){
        sortArticole(-1);
    }

    btn=document.getElementById("resetare");
    btn.onclick=function(){
        
        var produse=document.getElementsByClassName("produs");
    
        for (let prod of produse){
            prod.style.display="block";
        }
    }

    let btn1=document.getElementById("suma");
    btn1.onclick=function(){
        var produse=document.getElementsByClassName("produs");
        sumaArt=0;
        for (let prod of produse){
            sumaArt+=parseInt(prod.getElementsByClassName("val-pret")[0].innerHTML);
        }
        let infoSuma=document.createElement("div");
        infoSuma.innerHTML="Suma: "+sumaArt;
        infoSuma.className="info-produse";
        let p=document.getElementById("suma")
        p.parentNode.insertBefore(infoSuma,p.nextSibling);
        setTimeout(function(){infoSuma.remove()}, 2000);
    }
/*
    window.onkeydown=function(e){
        
       
        if (e.key=="s" && e.altKey){
            e.preventDefault();
            var produse=document.getElementsByClassName("produs");
            sumaArt=0;
            for (let prod of produse){
                sumaArt+=parseInt(prod.getElementsByClassName("val-pret")[0].innerHTML);
            }
            let infoSuma=document.createElement("p");//<p></p>
            infoSuma.innerHTML="Suma: "+sumaArt;//<p>...</p>
            infoSuma.className="info-produse";
            let p=document.getElementById("p-suma")
            p.parentNode.insertBefore(infoSuma,p.nextSibling);
            setTimeout(function(){infoSuma.remove()}, 2000);
        }
    }
*/
}