!function(){var e,t={select:document.querySelector(".breed-select"),catInfo:document.querySelector(".cat-info")};console.log(t.select),console.log(t.catInfo),fetch("https://api.thecatapi.com/v1/breeds",{headers:{"x-api-key":"live_bPw1HefqXKxGjCEcXQfPslG2mdOVn4nvMzRqzHwPA2hQodzh6pHFH6IV0oHopRtT"}}).then((function(e){if(!e.ok)throw new Error(e.statusText);return e.json()})).then((function(e){e=e.map((function(e){var t=e.id,n=e.name;return'<option value="'.concat(t,'">').concat(n,"</option>")})).join(""),t.select.insertAdjacentHTML("afterbegin",e)})).catch((function(e){console.log(e)})),(e="abys",fetch("".concat("https://api.thecatapi.com/v1/","images/search??api_key=").concat("live_bPw1HefqXKxGjCEcXQfPslG2mdOVn4nvMzRqzHwPA2hQodzh6pHFH6IV0oHopRtT","&breed_ids=").concat(e)).then((function(e){if(!e.ok)throw new Error(e.statusText);return e.json()}))).then((function(e){e=e.map((function(e){var t=e.url,n=e.breeds,o=n.name,c=n.description,a=n.temperament;return'<img src="'.concat(t,'" alt="" />\n     <h2>').concat(o,"</h2>\n      <p>").concat(c,"</p>\n      <h3>Temperament</h3>\n     <p>").concat({temperament:a},"</p> ")})).join(""),t.catInfo.insertAdjacentHTML("afterbegin",e)})).catch((function(e){console.log(e)}))}();
//# sourceMappingURL=index.434dbcd5.js.map
