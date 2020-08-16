import React, { useState } from "react";
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
  Fab,
  Typography,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

import { userRemoved } from "../features/usersSlice";

import { useStylesTable } from "../hooks/useStyles";

const columns = [
  { id: "remove", minWidth: 50 },
  { id: "firstName", label: "Name", minWidth: 100 },
  { id: "lastName", label: "Last Name", minWidth: 100 },
  { id: "email", label: "Email", minWidth: 100 },
  { id: "DOB", label: "DOB", minWidth: 100, align: "right" },

  //   {
  //     id: "desc",
  //     label: "Desc",
  //     minWidth: 170,
  //     align: "right",
  //   },
];

export default function StickyHeadTable() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  const classes = useStylesTable();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const deleteUser = (id) => {
    return (
      <Tooltip title="Delete">
        <IconButton
          onClick={() => dispatch(userRemoved(id))}
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    );
  };

  const createData = (remove, firstName, lastName, email, DOB) => {
    return { remove, firstName, lastName, email, DOB };
  };

  const rows = users
    .sort(function (a, b) {
      return a.age - b.age;
    })
    .map((user) =>
      createData(
        deleteUser(user),
        user.firstName,
        user.lastName,
        user.email,
        user.birthday
      )
    );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className={classes.title}>
      <Container>
        <Typography
          component="h1"
          variant="h2"
          color="textPrimary"
          gutterBottom
        >
          Members Management
        </Typography>
        <Typography variant="h5" color="textSecondary" paragraph>
          On this page you can view the users registered to the site and delete
          them.
        </Typography>
      </Container>
      <div className={classes.button}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
          <Select
            // onChange={(e) => setFilterByPrice(e.target.value)}
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            label="Age"
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value={"low-to-high"}>Low to High</MenuItem>
            <MenuItem value={"high-to-low"}>High to Low</MenuItem>
          </Select>
        </FormControl>
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
