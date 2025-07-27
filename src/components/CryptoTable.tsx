import React from "react"

import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"

import { TCoin } from '../types'

const CryptoTable = ({currencies, colors, handleClickRow}) => {
  return (
    <TableContainer component={Paper}>
      <Table className="table" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Full Name</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="left">Volume 24 Hour</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currencies.map((currency:TCoin, index:number) => (
            <TableRow 
              hover 
              className="row-currency" 
              key={currency.name}
              onClick={()=>handleClickRow(currency.name)}
            >
              <TableCell>
                <img className="currency-icon" src={currency.imageUrl} alt="Coin icon" />
              </TableCell>
              <TableCell align="left">{currency.name}</TableCell>
              <TableCell align="left">{currency.fullName}</TableCell>
              <TableCell className={colors.length?colors[index]?colors[index]+"-column":'':''} align="left">{"$"+currency.price}</TableCell>
              <TableCell align="left">{currency.volume24Hour}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CryptoTable;
