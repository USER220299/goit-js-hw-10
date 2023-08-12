import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";
import axios from "axios";

import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css';
import { Report } from 'notiflix/build/notiflix-report-aio';

const refs = {
    select: document.querySelector(".breed-select"),
    loader: document.querySelector('.loader'),
    error:document.querySelector('.error'),
    catInfo: document.querySelector(".cat-info"),
}

console.log(refs.select)
console.log(refs.loader.textContent)
console.log(refs.error.textContent)
console.log(refs.catInfo)

refs.select.hidden = true
refs.error.hidden = true
refs.loader.textContent = "";

  

fetchBreeds().then(data => {

  refs.select.hidden = false;
  // refs.loader.hidden = true;
  refs.loader.classList.replace("loader", "loader-hidden");

   data = data.map((({ id, name }) => {
     return `<option value="${id}">${name}</option>`
   })).join('')
  
  refs.select.insertAdjacentHTML('afterbegin', data);

  new SlimSelect({
    select:(".breed-select"),
    settings: {
      allowDeselect: true,
     alwaysOpen: true,
  }
  
  })
    }).catch(error => {
    refs.loader.classList.replace("loader", "loader-hidden");
    // refs.error.hidden = false;
    Report.failure(   refs.error.textContent,
    '"Failure is simply the opportunity to begin again, this time more intelligently." - Henry Ford',
      'OK', {
    titleMaxLength:"1px"
  });
    console.log(error)
  });


refs.select.addEventListener('change', searchCat);

    
function searchCat(evt) {
  evt.preventDefault();
  refs.catInfo.innerHTML = '';
  // refs.loader.hidden = false;
  refs.loader.classList.replace("loader-hidden", "loader");
  
    const { value }= evt.target;
   fetchCatByBreed(value)
     .then(data => {
      // refs.loader.hidden = true;
      refs.loader.classList.replace("loader", "loader-hidden");
      createMarkup(data)
   
     })
     .catch(error => {
       console.log(error)
     });

}

function createMarkup(arr) {

 const card =  arr.map((el) => {
    return `<l class = "card-cat"><img class = "image" src="${el.url}" alt="${el.breeds[0].name}  width="${el.width}" height="${el.height}"" />
      <div class="card-info"><h2 class = "name">${el.breeds[0].name}</h2>
      <p class="description">${el.breeds[0].description}</p>
      <h3>Temperament</h3>
      <p class = "temperament">${el.breeds[0].temperament}</p>
      </div></l>`
    
 }).join("")
  
  refs.catInfo.insertAdjacentHTML('afterbegin', card);
 
}














// const ref = {
//     selector: document.querySelector('.breed-select'),
//     divCatInfo: document.querySelector('.cat-info'),
//     loader: document.querySelector('.loader'),
//     error: document.querySelector('.error'),
// };
// const { selector, divCatInfo, loader, error } = ref;

// loader.classList.replace('loader', 'is-hidden');
// error.classList.add('is-hidden');
// divCatInfo.classList.add('is-hidden');

// let arrBreedsId = [];
// fetchBreeds()
// .then(data => {
//     data.forEach(element => {
//         arrBreedsId.push({text: element.name, value: element.id});
//     });
//     new SlimSelect({
//         select: selector,
//         data: arrBreedsId
//     });
//     })
// .catch(onFetchError);

// selector.addEventListener('change', onSelectBreed);

// function onSelectBreed(event) {
//     loader.classList.replace('is-hidden', 'loader');
//     selector.classList.add('is-hidden');
//     divCatInfo.classList.add('is-hidden');

//     const breedId = event.currentTarget.value;
//     fetchCatByBreed(breedId)
//     .then(data => {
//         loader.classList.replace('loader', 'is-hidden');
//         selector.classList.remove('is-hidden');
//         const { url, breeds } = data[0];
        
//         divCatInfo.innerHTML = `<div class="box-img"><img src="${url}" alt="${breeds[0].name}" width="400"/></div><div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`
//         divCatInfo.classList.remove('is-hidden');
//     })
//     .catch(onFetchError);
// };

// function onFetchError(error) {
//     selector.classList.remove('is-hidden');
//     loader.classList.replace('loader', 'is-hidden');

//     Notify.failure('Oops! Something went wrong! Try reloading the page or select another cat breed!', {
//         position: 'center-center',
//         timeout: 5000,
//         width: '400px',
//         fontSize: '24px'
//     });
// };
   







