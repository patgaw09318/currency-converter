import axios from "axios";
import Config from "./Config";
const Currencies = Config.Currencies;

const CurrenciesList = () => {
  axios.get(Currencies.url + Currencies.methods.currencies).then(res => {
    console.log(res.data);
    return res.data;
  });
};

export default CurrenciesList;
