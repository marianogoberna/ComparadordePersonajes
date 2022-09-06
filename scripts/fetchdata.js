import { Character } from "../scripts/chars.js";
export async function fetchCharacter(characterName){

 
  let charImages = {
    "Luke Skywalker": "images/Luke.jpg",
    "Chewbacca": "images/Chewbacca.jpg",
    "Boba Fett": "images/Boba.jpg",
    "Darth Vader": "images/Darth.jpg",
    "Palpatine": "images/Palpatine.jpg",
    "Obi-Wan Kenobi": "images/Obi.jpg",
    "Yoda": "images/Yoda.jpg",
    "Leia Organa": "images/Leia.jpg"
  };

  let fetchResponse = await fetch(`https://swapi.dev/api/people/?search=${characterName}`);
  const hero =await fetchResponse.json();
  console.log(hero.results[0].name);
  return new Character(   
    hero.results[0].name,
    hero.results[0].gender,
    parseFloat(hero.results[0].height).toFixed(2),
    parseFloat(hero.results[0].mass).toFixed(2),
    hero.results[0].hair_color,
    charImages[hero.results[0].name]
  );
}