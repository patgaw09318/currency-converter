const Config = {
  ExchangeRates: {
    url: "https://exchangeratesapi.io/",
    methods: {
      latest: "latest",
      date: "{0}",
      history: "/history?start_at={0}&end_at={1}"
    }
  },
  Currencies: {
    url: "https://openexchangerates.org/api/",
    methods: {
      currencies: "currencies.json"
    }
  }
};

export default Config;
