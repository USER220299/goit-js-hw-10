import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";
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
    select: '.breed-select'
 })
    })
  .catch(error => {
    // refs.loader.hidden = true;
    refs.loader.classList.replace("loader", "loader-hidden");
    // refs.error.hidden = false;
  Report.failure(refs.error.textContent);
    console.log(error)
  });


refs.select.addEventListener('input', searchCat);

    
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



















