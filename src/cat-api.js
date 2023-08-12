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

 function fetchCatByBreed(breedId) {
     const BASE_URL = "https://api.thecatapi.com/v1/";
    const API_KEY = "live_bPw1HefqXKxGjCEcXQfPslG2mdOVn4nvMzRqzHwPA2hQodzh6pHFH6IV0oHopRtT";
   return fetch(`${BASE_URL}images/search?api_key=${API_KEY}&breed_ids=${breedId}`).then(response => {
        if (!response.ok) {
            throw new Error(response.statusText)
        }
      return response.json()
})
}

export{fetchBreeds, fetchCatByBreed }