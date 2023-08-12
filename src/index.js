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
// refs.select.hidden = true
refs.select.classList.replace("breed-select", "breed-select-hidden");
refs.error.classList.replace("error", "error-hidden");
// refs.error.hidden = true

refs.loader.classList.replace("loader", "loader-hidden");
fetchBreeds().then(data => {

  refs.select.classList.replace( "breed-select-hidden", "breed-select");
  refs.loader.classList.replace("loader", "loader-hidden");

   data = data.map((({ id, name }) => {
     return `<option value="${id}">${name}</option>`
   })).join('')
  
  refs.select.insertAdjacentHTML('afterbegin', data);

  new SlimSelect({
    select:(".breed-select"),
    settings: {
      allowDeselect: true,
  }
  })
    }).catch(error => {
    refs.loader.classList.replace("loader", "loader-hidden");
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
  refs.loader.classList.replace("loader-hidden", "loader");
  
    const { value }= evt.target;
   fetchCatByBreed(value)
     .then(data => {
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






