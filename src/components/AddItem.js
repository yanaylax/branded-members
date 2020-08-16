import React, { useState } from "react";
import { Button, Fab, Tooltip, Grid, Typography } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import { useStylesTable } from "../hooks/useStyles";

import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

import { useForm } from "react-hook-form";

import { itemAdded, itemRemoved } from "../features/shopSlice";

export default function AlertDialog() {
  const dispatch = useDispatch();
  const classes = useStylesTable();
  const [itemData, setItemData] = useState({});
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = (data) => {
    const { name, price, description } = data;
    dispatch(
      itemAdded({
        id: nanoid(),
        name,
        price,
        description,
      })
    );
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title="Add" aria-label="add">
        <Fab
          onClick={handleClickOpen}
          size="small"
          color="primary"
          className={classes.add}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Add a new item!</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <DialogContent  dividers>
            <Grid className={classes.grid} container  spacing={2}>
              <Grid item xs={12} sm={8}>
                <TextField
                  onChange={(e) =>
                    setItemData({ ...itemData, name: e.target.value })
                  }
                  className={classes.modal}
                  inputRef={register({
                    required: true,
                  })}
                  name="name"
                  fullWidth
                  id="name"
                  variant="outlined"
                  required
                  label="Name"
                />
              </Grid>
              <Grid  item xs={12} sm={4}>
                <TextField
                  onChange={(e) =>
                    setItemData({ ...itemData, price: e.target.value })
                  }
                  className={classes.modal}
                  inputRef={register({
                    required: true,
                  })}
                  name="price"
                  id="price"
                  variant="outlined"
                  fullWidth
                  required
                  label="Price"
                  type="number"
                />
              </Grid>
              <Grid  item xs={12}>
                <TextField
                  onChange={(e) =>
                    setItemData({ ...itemData, description: e.target.value })
                  }
                  inputRef={register({
                    required: true,
                  })}
                  name="description"
                  id="description"
                  variant="outlined"
                  required
                  fullWidth
                  className={classes.modal}
                  label="Description"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary" autoFocus>
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
