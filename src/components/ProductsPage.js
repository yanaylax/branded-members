import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import AddItem from "./AddItem";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Container,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

import { itemRemoved } from "../features/shopSlice";

import { useStylesTable } from "../hooks/useStyles";

const columns = [
  { id: "remove", minWidth: 50 },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "price", label: "Price", minWidth: 100 },
  {
    id: "desc",
    label: "Desc",
    minWidth: 170,
    align: "right",
  },
];

export default function StickyHeadTable() {
  const dispatch = useDispatch();
  const shop = useSelector((state) => state.shop);
  const current = useSelector((state) => state.logged);

  const classes = useStylesTable();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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

  const createData = (remove, name, desc, price) => {
    return { remove, name, desc, price: `$${price}` };
  };

  const rows = shop.map((item) =>
    createData(deleteItem(item), item.name, item.description, item.price)
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (!current) {
    return <Redirect to="/" />;
  }

  if (current) {
    if (current !== "ADMIN") {
      return <Redirect to="/" />;
    }
  }

  return (
    <div className={classes.title}>
      <Container>
        <Typography
          component="h1"
          variant="h2"
          color="textPrimary"
          gutterBottom
        >
          Product Management
        </Typography>
        <Typography variant="h5" color="textSecondary" paragraph>
          On this page you can view the available items in the shop, add new
          ones or delete old ones.
        </Typography>
      </Container>
      <div className={classes.button}>
        <AddItem />
      </div>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={nanoid()}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
