import {TCoin} from '../types'

export default () => {
  return new Promise((resolve, reject) => {
    fetch("https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD")
    .then(data=>data.json())
    .then(data => {
      const coins: TCoin[] = data.Data.map((coin: any) => {
        const obj: TCoin = {
          name: coin.CoinInfo.Name,
          fullName: coin.CoinInfo.FullName,
          imageUrl: `https://www.cryptocompare.com/${coin.CoinInfo.ImageUrl}`,
          price: Number(coin.RAW.USD.PRICE.toFixed(3)),
          volume24Hour: parseInt(coin.RAW.USD.VOLUME24HOUR),
        };
        return obj;
      });
      resolve(coins);
    })
    .catch(error => {
      if (error.response)
        console.log(error.response.headers);
      else if (error.request) 
        console.log(error.request);
      else 
        console.log(error.message);
      
      console.log(error.config);

      resolve([])
    });
  });
};
