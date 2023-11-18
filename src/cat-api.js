import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_9C1UrNIUWF8EQ7K4WSPsl5wECNXRCsyuLKRYXOWMzbxAC6sR450oOH57XNTC0R28';

const BASE_URL = 'https://api.thecatapi.com/v1';

function fetchBreeds() {
  return axios
    .get(`${BASE_URL}/breeds`)
    .then(response => {
      return response.data.map(breed => ({
        id: breed.id,
        name: breed.name,
      }));
    })
    .catch(error => {
      console.error('Error fetching breeds:', error);
      throw error;
    });
}

function fetchCatByBreed(breedId) {
  return axios
    .get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
    .then(response => {
      return response.data[0];
    })
    .catch(error => {
      console.error(`Error fetching cat by breed ${breedId}:`, error);
      throw error;
    });
}

export { fetchBreeds, fetchCatByBreed };
