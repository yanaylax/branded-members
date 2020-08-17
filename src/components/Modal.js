import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  Fab,
  Dialog,
  
  IconButton,
  Typography,
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";

import { itemAdded, amountIncreased } from "../features/cartSlice";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs({ item }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [amount, setAmount] = useState(1);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const addItem = () => {
    const { id, name, description, price } = item;
    let itemExists = false;
    cart.map((cartItem) => {
      if (cartItem.id === id) {
        itemExists = true;
      }
    });
    return itemExists
      ? dispatch(amountIncreased({ id, amount }))
      : dispatch(itemAdded({ id, name, description, price, amount }));
  };

  return (
    <div>
      <Fab
        onClick={handleClickOpen}
        size="small"
        color="primary"
        aria-label="add"
      >
        <AddIcon />
      </Fab>
      <Dialog
        fullWidth
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Review purchase
        </DialogTitle>
        <DialogContent
          style={{ display: "flex", justifyContent: "space-around" }}
          dividers
        >
          <div>
            <Typography gutterBottom>{item.name}</Typography>
            <Typography gutterBottom>{`Price: $${item.price}`}</Typography>
            <Typography gutterBottom>{`Total: $${
              item.price * amount
            }`}</Typography>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              size="large"
              onClick={() =>
                setAmount((oldAmount) => {
                  return oldAmount === 0 ? amount : amount - 1;
                })
              }
            >
              -
            </Button>
            <Typography dividers gutterBottom>
              {amount}
            </Typography>

            <Button size="large" onClick={() => setAmount(amount + 1)}>
              +
            </Button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={addItem} color="primary">
            Add to cart
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
