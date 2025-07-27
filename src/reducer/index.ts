import { TCoin } from "../types";

type State = {
  currencies: TCoin[],
  colors: string[],
  fromCurrency: string,
  toCurrency: string,
  amount: number,
  isFromCurrency: boolean,
  exchangeRate: number,
}

type Action = {
	type: string;
	payload: any;
};

export default (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_INIT_DATA': 
      return {
        ...state,
        currencies: action.payload.currencies,
        fromCurrency: action.payload.fromCurrency,
        toCurrency: action.payload.toCurrency,
      }
    case 'SET_FROM_CURRENCY': 
      return {
        ...state,
        fromCurrency: action.payload
      }
    case 'SET_TO_CURRENCY': 
      return {
        ...state,
        toCurrency: action.payload
      }
    case 'SET_AMOUNT': 
      return {
        ...state,
        amount: action.payload
      }
    case 'SET_IS_FROM_CURRENCY': 
      return {
        ...state,
        isFromCurrency: action.payload
      }
    case 'UPDATE_EXCHANGE_RATE': 
      return {
        ...state,
        exchangeRate: action.payload
      }
    case 'SET_CURRENCIES': 
      return {
        ...state,
        currencies: action.payload
      }
    case 'UPDATE_CURRENCIES_AND_COLORS':
      const curColors = action.payload.getColors(state.currencies, action.payload.data); //newData for sort tests

      if(curColors){
        return {
          ...state,
          colors: curColors,
          currencies: action.payload.data
        }
      }
      return {
        ...state,
        currencies: action.payload.data
      }
    default:
      return state;
  }
};