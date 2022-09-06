

import { fetchCharacter } from "../scripts/fetchdata.js";


let infoBtn = document.querySelector(".info-btn");
let firstCharSelect = document.getElementById("first-char");
let secondCharSelect = document.getElementById("second-char");
let firstCharBox = document.querySelector(".char-1-wrapper");
let secondCharBox = document.querySelector(".char-2-wrapper");
console.log(firstCharBox,secondCharBox);
let infoText = document.querySelector(".text-msg");


function createCharacter(char1,char2,place){
  let heroInfo = place.querySelector(".char-summary");
  let heroImage = place.querySelector(".char-image img");
  if(char1 === undefined){
    heroInfo.style.display = "none";
    heroImage.src = "images/Unknown.jpg";
  }
  else{
    heroInfo.style.display = "block";
    let charName = place.querySelector(".char-name");
    charName.innerText = `${char1.name}`;
    heroImage.src = `${char1.pictureUrl}`;

    place.querySelector(".gender").addEventListener("click", ()=>{
      let genderOption = char1.genderComparison(char2);
      if(!genderOption){
        infoText.innerText = `${char1.name} y ${char2.name} son del genero opuesto. ${char1.name} es ${char1.gender} mientras que
        ${char2.name} es ${char2.gender}.`;
      }
      else{
        infoText.innerText = `Tanto ${char1.name}, como ${char2.name} son del mismo genero. Ambos son ${char1.gender}.`;
      }
    })

    place.querySelector(".hair").addEventListener("click", ()=>{
      let hairOption = char1.colourComparison(char2);
      if(hairOption){
        if(char1.hair_color === "none"){
          infoText.innerText = `${char1.name} no tiene pelo como tampoco lo tiene ${char2.name}.`;
        }
        else{
          infoText.innerText = `${char1.name} tiene el mismo color de pelo: ${char1.hair_color}, tal cual ${char2.name}.`;
        }
      }else{
        if(char1.hair_color === "none"){
          infoText.innerText = `${char1.name} y ${char2.name} tienen diferentes estilos. ${char1.name} no tiene pelo en absoluto mientras que ${char2.name} tiene ${char2.hair_color} como su color.`;
        }else if(char2.hair_color === "none"){
          infoText.innerText = `${char1.name} y ${char2.name} tienen diferentes estilos. ${char1.name} tiene ${char1.hair_color} como su color mientras que ${char2.name} no tiene pelo en absoluto.`;
        }
        else{
          infoText.innerText = `${char1.name} y ${char2.name} tienen colores de pelo diferentes. ${char1.name} tiene ${char1.hair_color} como su color mientras que ${char2.name} tiene ${char2.hair_color}.`;
        }
        
      }
    })

    place.querySelector(".height").addEventListener("click", ()=>{
      let heightDiff = char1.heightComparison(char2);
      if(heightDiff>0){
        infoText.innerText = `${char1.name} mide ${char1.height} centímetros de altutra mientras que ${char2.name} mide ${char2.height} centímetros. ${char1.name} es ${Math.abs(heightDiff)} centímetros más alto.`;
      }
      else if(heightDiff<0){
        infoText.innerText = `${char1.name} mide ${char1.height} centímetros de altura mientras que ${char2.name} mide ${char2.height} centímetros. ${char1.name} es ${Math.abs(heightDiff)} centímetros más bajo,`;
      }
      else{
        infoText.innerText = `${char1.name} mide ${char1.height} centímetros de altura y ${char2.name} mide ${char2.height} centímetros también. Coincidencia? I think not.`;
      }
    })

    place.querySelector(".weight").addEventListener("click", ()=>{
      let weightDiff = char1.weightComparison(char2);
      if(weightDiff>0){
        infoText.innerText = `${char1.name} pesa ${char1.mass} kilogramos mientras que ${char2.name} pesa ${char2.mass} kilogramos. Eso significa que ${char1.name} es ${Math.abs(weightDiff).toFixed(2)} kilogramos más pesado.`;
      }
      else if(weightDiff<0){
        infoText.innerText = `${char1.name} pesa ${char1.mass} kilogramos mientras que ${char2.name} pesa ${char2.mass} kilogramos. Eso significa que ${char1.name} es ${Math.abs(weightDiff).toFixed(2)} kilogramos más liviano`;
      }
      else{
        infoText.innerText = `Tanto ${char1.name} como ${char2.name} pesan ${char1.mass}. Coincidencia? I think not.`;
      }
    })

  }



}

infoBtn.addEventListener("click", async ()=>{
  let heroOneChoice = firstCharSelect.value;
  let heroTwoChoice = secondCharSelect.value;

  if(heroOneChoice !== "empty" && heroTwoChoice !== "empty"){
    if(heroOneChoice === heroTwoChoice){
      infoText.innerText = "¡No hay nada interesante que comparar!";
    }
    else{
      infoText.innerText = "Seleccioná abajo el atributo que desees comparar.";
    }

    let hero1 = await fetchCharacter(heroOneChoice);
    let hero2 = await fetchCharacter(heroTwoChoice);
    createCharacter(hero1,hero2,firstCharBox);
    createCharacter(hero2,hero1,secondCharBox);
  }
  else{
    infoText.innerText = "No elegiste tus personajes todavía."
  }
})