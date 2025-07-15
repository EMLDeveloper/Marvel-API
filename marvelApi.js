import CryptoJS from "crypto-js";
const BASE_URL = "https://gateway.marvel.com/v1/public/characters";

const publicKey = import.meta.env.VITE_MARVEL_API_KEY;
const privateKey = import.meta.env.VITE_MARVEL_PRIVATE_KEY;

export async function fetchMarvelCharacters(limit = 100) {
  const ts = Date.now().toString();
  const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();

  const url = `${BASE_URL}?limit=${limit}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch Marvel characters");
  const data = await response.json();
  return data.data.results;
}
