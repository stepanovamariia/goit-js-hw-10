import { fetchBreeds, fetchCatByBreed } from './cat-api';

const selectCatEl = document.querySelector('.breed-select');
const catInfoEl = document.querySelector('.cat-info');
const loadEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');

errorEl.style.color = 'red';
errorEl.style.display = 'none';
selectCatEl.style.display = 'none';

function populateSelectWithBreeds() {
  fetchBreeds()
    .then(breeds => {
      selectCatEl.innerHTML = '';
      breeds.forEach(breed => {
        selectCatEl.insertAdjacentHTML(
          'beforeend',
          `<option value="${breed.id}">${breed.name}</option>`
        );
      });
      selectCatEl.style.display = 'block';
    })
    .catch(error => {
      console.error('Error fetching breeds:', error);
      errorEl.style.display = 'block';
    })
    .finally(() => {
      loadEl.style.display = 'none';
    });
}

function displayCatInfo(cat) {
  catInfoEl.innerHTML = `
    <img src="${cat.url}" alt="Cat Image" width="500px">
    <div class="cat-description"><h2>${cat.breeds[0].name}</h2>
    <p>${cat.breeds[0].description}</p>
    <h3>Temperament:</h3>
    <p>${cat.breeds[0].temperament}</p></div>`;

  catInfoEl.style.display = 'flex';
  catInfoEl.style.gap = '20px';
  catInfoEl.style.marginTop = '30px';
  const catDescription = document.querySelector('.cat-description');
  catDescription.style.flexDirection = 'column';
  catDescription.style.width = '500px';
}

function onBreedSelectChange() {
  const selectedBreedId = selectCatEl.value;

  if (selectedBreedId) {
    catInfoEl.style.display = 'none';
    loadEl.style.display = 'block';

    fetchCatByBreed(selectedBreedId)
      .then(cat => {
        loadEl.style.display = 'none';
        catInfoEl.style.display = 'block';
        displayCatInfo(cat);
      })
      .catch(error => {
        console.error('Error fetching cat info:', error);
        errorEl.style.display = 'block';
        loadEl.style.display = 'none';
      });
  } else {
    catInfoEl.innerHTML = '';
  }
}

selectCatEl.addEventListener('change', onBreedSelectChange);

populateSelectWithBreeds();
