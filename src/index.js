// import axios from "axios";
// axios.defaults.headers.common["x-api-key"] = "live_bPw1HefqXKxGjCEcXQfPslG2mdOVn4nvMzRqzHwPA2hQodzh6pHFH6IV0oHopRtT";

const refs = {
  select:document.querySelector(".breed-select"),
 catInfo: document.querySelector(".cat-info"),
}
console.log(refs.select)
console.log(refs.catInfo)


function fetchBreeds(){
    const BASE_URL = "https://api.thecatapi.com/v1/breeds";
    const API_KEY = "live_bPw1HefqXKxGjCEcXQfPslG2mdOVn4nvMzRqzHwPA2hQodzh6pHFH6IV0oHopRtT";
const option = {
        headers: {
            'x-api-key': API_KEY
        }
    }
   return fetch(BASE_URL, option).then(response => {
        if (!response.ok) {    
            throw new Error(response.statusText)
        }
      return response.json()
})
}
fetchBreeds().
    then(data => {
        data = data.map((({ id, name }) => {
            return `<option value="${id}">${name}</option>`
       })).join('')
    refs.select.insertAdjacentHTML('afterbegin',data);
    })
    .catch(error => { console.log(error) });



function fetchCatByBreed(breedId) {
     const BASE_URL = "https://api.thecatapi.com/v1/";
    const API_KEY = "live_bPw1HefqXKxGjCEcXQfPslG2mdOVn4nvMzRqzHwPA2hQodzh6pHFH6IV0oHopRtT";


   return fetch(`${BASE_URL}images/search??api_key=${API_KEY}&breed_ids=${breedId}`).then(response => {
        if (!response.ok) {
            throw new Error(response.statusText)
        }
      return response.json()
})
}
    
fetchCatByBreed("abys")
    .then(data => {
        data = data.map(({ url, breeds: { name, description, temperament } }) => {
      return `<img src="${url}" alt="" />
     <h2>${ name }</h2>
      <p>${ description }</p>
      <h3>Temperament</h3>
     <p>${{  temperament }}</p> ` 
    }).join('')
     refs.catInfo.insertAdjacentHTML('afterbegin',data);
    })
    .catch(error => { console.log(error) });




// refs.select.addEventListener("submit", searchCat);
// // refs.catInfo.addEventListener("submit", searchCat);

// function searchCat(evt) {
//     evt.preventDefoult();

//     const { breedId } = evt.currentTarget.elements;

// fetchCatByBreed(breedId.value).then(data => { console.log(data)}).catch(error => { console.log(error) });
// }

// function createMarkup(arr) {
//   const marup = el =>  arr.map(({ url, breeds: { name, description, temperament } }) => {return `
//      <img src="${url}" alt="${name}" />
//       <h2>${ name }</h2>
//       <p>${description }</p>
//       <h3>Temperament</h3>
//       <p>${{ temperament }}</p> `
    
// }).join("")
//    refs.catInfo.innerHTML = marup(arr[0]);
// }
// createMarkup("abys")
// catInfo.insertAdjacentHTML('afterbegin', item);




// then((data) => {
   
//    data = data.filter(img=> img.image?.url)
  
//     console.log(data)
   
//    for (let i = 0; i < data.length; i+=1) {
//        const breed = data[i];
//        console.log(breed)
//     let option = document.createElement('option');
     
//     console.log(option)
   
//     option.value = i;
//     option.innerHTML = `${breed.name}`;
       
// const select = document.querySelector('.breed_selector');
//     select.insertAdjacentHTML('afterbegin',option)
//     }

// })