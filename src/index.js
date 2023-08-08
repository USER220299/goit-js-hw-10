import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_bPw1HefqXKxGjCEcXQfPslG2mdOVn4nvMzRqzHwPA2hQodzh6pHFH6IV0oHopRtT";

function fetchBreeds(){
    const BASE_URL = "https://api.thecatapi.com/v1/";
    const API_KEY = "live_bPw1HefqXKxGjCEcXQfPslG2mdOVn4nvMzRqzHwPA2hQodzh6pHFH6IV0oHopRtT";
const option = {
        headers: {
            'x-api-key': API_KEY
        }
    }
   return fetch(`${BASE_URL}breeds${option}`).then(response => {
        if (!response.ok) {    
            throw new Error(response.statusText)
        }
      return response.json()
})
}
fetchBreeds().then(cats => { console.log(cats) }).catch(error => { console.log(error) });

function fetchCatByBreed(breedId) {
     const BASE_URL = "https://api.thecatapi.com/v1/breeds";
    const API_KEY = "live_bPw1HefqXKxGjCEcXQfPslG2mdOVn4nvMzRqzHwPA2hQodzh6pHFH6IV0oHopRtT";


   return fetch(`${BASE_URL}images/search?breed_ids=${breedId}`).then(response => {
        if (!response.ok) {    
            throw new Error(response.statusText)
        }
      return response.json()
})
}
    
fetchCatByBreed("abys").then(cats => { console.log(cats) }).catch(error => { console.log(error) });



// const url = `https://api.thecatapi.com/v1/breeds`;
// const api_key = "live_bPw1HefqXKxGjCEcXQfPslG2mdOVn4nvMzRqzHwPA2hQodzh6pHFH6IV0oHopRtT"
// let storedBreeds = []

//  fetch(url,{headers: {
//       'x-api-key': api_key
//     }})
//  .then((response) => {
//    return response.json();
//  })
// .then((data) => {
   
//    //filter to only include those with an `image` object
//    data = data.filter(img=> img.image?.url!=null)
   
//   storedBreeds = data;
   
//    for (let i = 0; i < storedBreeds.length; i++) {
//     const breed = storedBreeds[i];
//     let option = document.createElement('option');
     
//      //skip any breeds that don't have an image
//      if(!breed.image)continue
     
//     //use the current array index
//     option.value = i;
//     option.innerHTML = `${breed.name}`;
// document.getElementById('breed_selector').appendChild(option);
    
//     }
//    //show the first breed by default
//    showBreedImage(0)
// })
// .catch(function(error) {
//    console.log(error);
// });

// function showBreedImage(index)
// { 
//   document.getElementById("breed_image").src= storedBreeds[index].image.url;
  
//   document.getElementById("breed_json").textContent= storedBreeds[index].temperament
  
  
//   document.getElementById("wiki_link").href= storedBreeds[index].wikipedia_url
//   document.getElementById("wiki_link").innerHTML= storedBreeds[index].wikipedia_url
// }