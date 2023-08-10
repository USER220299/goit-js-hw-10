
import { fetchBreeds, fetchCatByBreed }  from "./cat-api.js"
import SlimSelect from 'slim-select'

new SlimSelect({
  select: '.breed-select'
})

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
 
fetchBreeds().then(data => {
  refs.select.hidden = false;
  refs.loader.hidden = true;
        data = data.map((({ id, name }) => {
            return `<option value="${id}">${name}</option>`
       })).join('')
    refs.select.insertAdjacentHTML('afterbegin',data);
    })
  .catch(error => {
      refs.loader.hidden = true;
      refs.error.hidden = false;
    console.log(error)
  });


refs.select.addEventListener('input', searchCat);


    
function searchCat(evt) {
  evt.preventDefault();

  refs.catInfo.innerHTML = '';
  refs.loader.hidden = false;
  
    const { value }= evt.target;
   fetchCatByBreed(value)
     .then(data => {
      refs.loader.hidden = true;
       createMarkup(data)
     })
     .catch(error => {
       console.log(error)
     });
}

function createMarkup(arr) {
  
 const card =  arr.map((el) => {
    return `<l><img src="${el.url}" alt="${el.breeds[0].name}"  width="${el.width}" height="${el.height}"/>
      <h2>${el.breeds[0].name}</h2>
      <p>${el.breeds[0].description}</p>
      <h3>Temperament</h3>
      <p>${el.breeds[0].temperament}</p></l>`
    
 }).join("")
 
  refs.catInfo.insertAdjacentHTML('afterbegin', card);
}



















