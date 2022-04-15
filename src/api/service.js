import axios from 'axios';
const KEY = '22985243-b477986a48324befacd1d8a65';
axios.defaults.baseURL = `https://pixabay.com/api/`;
export const getImage = async query => {
  const responce = await axios.get(`?q=${query}&key=${KEY}`);
  return responce.data.hits;
};
