import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core/";

import { useDispatch } from "react-redux";

import { emptyCart } from "../features/cartSlice";

export default function AlertDialog() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ margin: "1em" }}>
      <ButtonGroup disableElevation variant="contained" color="primary">
        <Button onClick={handleClickOpen}>Empty Cart</Button>
        <Button onClick={handleClickOpen}>Finish Purchase</Button>
      </ButtonGroup>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button
            onClick={() => dispatch(emptyCart())}
            color="primary"
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
