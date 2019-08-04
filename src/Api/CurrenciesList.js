import axios from "axios";
import { setupCache } from "axios-cache-adapter";
import Config from "./Config";
const Currencies = Config.Currencies;

// Create `axios-cache-adapter` instance
const cache = setupCache({
  maxAge: 15 * 60 * 1000
});

const api = axios.create({
  adapter: cache.adapter
});

const CurrenciesList = api({
  url: Currencies.url + Currencies.methods.currencies,
  method: "get"
}).then(async response => {
  return await response.data;
});

export default CurrenciesList;
