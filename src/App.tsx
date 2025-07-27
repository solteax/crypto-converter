import React from "react"

import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Typography from '@material-ui/core/Typography'

import CryptoTable from "./components/CryptoTable"
import Converter from "./components/Converter"
import CircularProgress from "@material-ui/core/CircularProgress"

import reducer from "./reducer/"
import getData from "./fetchCoin/"

import { TCoin } from "./types/"

function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    currencies: [],
    colors: [],
    fromCurrency: "",
    toCurrency: "",
    amount: 1,
    isFromCurrency: true,
    exchangeRate: 0,
  });

  // Callback function from CryptoTable component
  const handleClickRow = (currencyName: string) => {
    dispatch({
      type: "SET_FROM_CURRENCY",
      payload: currencyName,
    });
  };

  // Callback functions from Converter component
  const handleChangeFrom = (e: any) => {
    dispatch({
      type: "SET_FROM_CURRENCY",
      payload: e.target.value,
    });
  };

  const handleChangeTo = (e: any) => {
    dispatch({
      type: "SET_TO_CURRENCY",
      payload: e.target.value,
    });
  };

  const onUpdateFromTextField = (e: any) => {
    dispatch({
      type: "SET_AMOUNT",
      payload: e.target.value,
    });

    dispatch({
      type: "SET_IS_FROM_CURRENCY",
      payload: true,
    });
  };

  const onUpdateToTextField = (e: any) => {
    dispatch({
      type: "SET_AMOUNT",
      payload: e.target.value,
    });

    dispatch({
      type: "SET_IS_FROM_CURRENCY",
      payload: false,
    });
  };

  // Input prices
  let fromAmount: number = 0,
    toAmount: number = 0;

  // Update exchange rate each time when data or selected options values changes
  React.useEffect(() => {
    let fromPrice: number = 0,
      toPrice: number = 0;

    state.currencies.filter((currency: TCoin) => {
      if (currency.name === state.fromCurrency) {
        fromPrice = currency.price;
      }

      if (currency.name === state.toCurrency) {
        toPrice = currency.price;
      }
      return false;
    });

    dispatch({
      type: "UPDATE_EXCHANGE_RATE",
      payload: fromPrice / toPrice,
    });
  }, [state.fromCurrency, state.toCurrency, state.currencies]);

  // Update the value of each input by exchange rate
  if (state.exchangeRate && state.amount) {
    if (state.isFromCurrency) {
      fromAmount = state.amount;
      toAmount = state.amount * state.exchangeRate;
    } else {
      fromAmount = state.amount / state.exchangeRate;
      toAmount = state.amount;
    }
  }

  // Update currencies and collors values
  const updateCurrenciesAndColors = async () => {
    const data = await getData();

    console.log("Data has updated :)");

    const getColors = (prevData: TCoin[], newData: TCoin[]) => {
      const colors: string[] = [];

      // Sort function for a possible bad data
      const mapOrder = (array: TCoin[], order: TCoin[], key: string) => {
        array.sort((a, b) => {
          const A = a[key],
            B = b[key];

          if (order.findIndex((obj) => obj[key] === A) > order.findIndex((obj) => obj[key] === B)) {
            return 1;
          } else {
            return -1;
          }
        });
        return array;
      };

      // Set collors array by comparison old and new data
      prevData.forEach((currency, index) => {
        if (currency.name !== newData[index].name) 
          prevData = mapOrder(prevData, newData, "name")

        if (currency.price > newData[index].price)
          colors[index] = "red";
        else if (currency.price < newData[index].price)
          colors[index] = "green";
      });

      if (colors.length) return colors;
      else return false;
    };

    dispatch({
      type: "UPDATE_CURRENCIES_AND_COLORS",
      payload: { data, getColors },
    });
  };

  React.useEffect(() => {
    (async () => {
      const data: any = await getData();

      // Check for valid data
      if (data.length) {
        dispatch({
          type: "SET_INIT_DATA",
          payload: {
            currencies: data,
            fromCurrency: data[0].name,
            toCurrency: data[1].name,
          },
        });

        // Update data every 30sec
        setInterval(updateCurrenciesAndColors, 30 * 1000);
      } else {
        dispatch({
          type: "SET_CURRENCIES",
          payload: data,
        });
      }
    })();
  }, []);
  return (
    <Container maxWidth="lg">
      <Grid
        container
        spacing={3}
        className={state.currencies.length ? "grid-container" : "preloader-container"}
      >
        {state.currencies.length ? (
          <>
            <Grid item className="crypto-table-grid" sm={12} md={8}>
              <Typography align="center" variant="h3" component="h2" gutterBottom>
                Crypto Table
              </Typography>
              <CryptoTable
                currencies={state.currencies}
                colors={state.colors}
                handleClickRow={handleClickRow}
              ></CryptoTable>
            </Grid>
            <Grid item sm={12} md={4}>
              <Typography className="converter-typography" align="center" variant="h4" component="h2" gutterBottom>
                Converter
              </Typography>
              <Converter
                currencies={state.currencies}
                fromCurrency={state.fromCurrency ? state.fromCurrency : ""}
                toCurrency={state.toCurrency ? state.toCurrency : ""}
                handleChangeFrom={handleChangeFrom}
                handleChangeTo={handleChangeTo}
                fromAmount={fromAmount}
                toAmount={toAmount}
                onUpdateFromTextField={onUpdateFromTextField}
                onUpdateToTextField={onUpdateToTextField}
              ></Converter>
            </Grid>
          </>
        ) : (
          <CircularProgress />
        )}
      </Grid>
    </Container>
  );
}

export default App;