import React, { useState } from "react";
import { Redirect } from "react-router-dom";
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import Search from "@material-ui/icons/Search";

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
];

export default function StickyHeadTable() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const current = useSelector((state) => state.logged);

  const classes = useStylesTable();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterByAge, setFilterByAge] = useState("");
  const [userAge, setUserAge] = useState(0);

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
    .filter((user) => user.age >= userAge)
    .sort(function (a, b) {
      return filterByAge === "high-to-low"
        ? b.age - a.age
        : filterByAge === "low-to-high"
        ? a.age - b.age
        : a - b;
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

  // if (!current) {
  //   return <Redirect to="/" />;
  // } else if (current) {
  //   if (current !== "ADMIN") {
  //     return <Redirect to="/" />;
  //   }
  // }

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
      <div className={classes.filter}>
        <TextField
          onChange={(e) => setUserAge(e.target.value)}
          className={classes.margin}
          id="input-with-icon-textfield"
          label="Filter By Age"
          type="number"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
          <Select
            onChange={(e) => setFilterByAge(e.target.value)}
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
