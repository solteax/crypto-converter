import React from "react"

import Paper from "@material-ui/core/Paper"
import TextField from "@material-ui/core/TextField"
import Select from "@material-ui/core/Select"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"

import {TCoin} from '../types'

const Converter = (props) => {
  const {
    currencies,
    fromCurrency,
    toCurrency,
    handleChangeFrom,
    handleChangeTo,
    fromAmount,
    toAmount,
    onUpdateFromTextField,
    onUpdateToTextField
  } = props

  return (
    <Paper className="paper">
      <div className="crypto-input-box">
        <FormControl className="currency-input">
          <TextField
            type="number"
						label="Сумма"
						value={fromAmount}
						onChange={onUpdateFromTextField}
          />
        </FormControl>
        <FormControl className="currency-type">
          <InputLabel shrink id="demo-simple-select-label">
            Валюта
          </InputLabel>
          <Select 
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={fromCurrency}
            onChange={handleChangeFrom}
          >
            {currencies.map((currency:TCoin) => (
              <MenuItem 
                key={currency.name+currency.fullName} 
                value={currency.name}
              >{currency.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="crypto-input-box">
        <FormControl className="currency-input">
					<TextField 
						type="number" 
						label="Сумма" 
						value={toAmount}
						onChange={onUpdateToTextField}
					/>
        </FormControl>
        <FormControl className="currency-type">
          <InputLabel shrink id="demo-simple-select-label">
            Валюта
          </InputLabel>
          <Select 
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={toCurrency}
            onChange={handleChangeTo}
          >
            {currencies.map((currency:TCoin) => (
              <MenuItem 
                key={currency.name+currency.price} 
                value={currency.name}
              >{currency.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </Paper>
  );
};

export default Converter;
