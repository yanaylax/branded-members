import React from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  Tooltip,
  IconButton,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { itemRemoved } from "../features/cartSlice";

import EmptyCart from "./EmptyCart";

const TAX_RATE = 0.14;

const useStyles = makeStyles({
  table: {
    minWidth: 700,
    marginTop: "10em",
  },
  actions: {
    margin: " 1em",
    display: "flex",
    justifyContent: "flex-end",
  },
});

export default function SpanningTable() {
  const classes = useStyles();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const current = useSelector((state) => state.logged);

  const deleteItem = (id) => {
    return (
      <Tooltip title="Delete">
        <IconButton
          onClick={() => dispatch(itemRemoved(id))}
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    );
  };

  const ccyFormat = (num) => {
    return `${num.toFixed(2)}`;
  };

  const priceRow = (qty, unit) => {
    return qty * unit;
  };

  const createRow = (desc, qty, unit, id) => {
    const price = priceRow(qty, unit);
    return { desc, qty, unit, price, id };
  };

  const subtotal = (items) => {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
  };

  const rows = cart.map((item) =>
    createRow(item.name, item.amount, item.price, item.id)
  );

  const invoiceSubtotal = subtotal(rows);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  if(!current) {
    return <Redirect to="/"/>
  }


  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Details
            </TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Desc</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">Unit</TableCell>
            <TableCell align="right">Sum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.desc}>
              <TableCell>
                {deleteItem(row)}
                {row.desc}
              </TableCell>
              <TableCell align="right">{row.qty}</TableCell>
              <TableCell align="right">{row.unit}</TableCell>
              <TableCell align="right">{ccyFormat(row.price)}</TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
              0
            )} %`}</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <EmptyCart />
    </TableContainer>
  );
}
