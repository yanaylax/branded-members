import React from "react";
import clsx from "clsx";
import { Link as RouterLink } from "react-router-dom";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link,
  Button,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import HomeIcon from "@material-ui/icons/Home";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import StoreIcon from "@material-ui/icons/Store";
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { logout } from "../features/loggedSlice";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    flexGrow: 1,
  },
  branded: {
    marginLeft: theme.spacing(2),
  },
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const current = useSelector((state) => state.logged);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className={classes.toolbar}>
          <div>
            {current ? (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <div />
            )}
            <Link
              style={{ textDecoration: "none" }}
              color="inherit"
              variant="h6"
              component={RouterLink}
              to="/"
            >
              <Button color="inherit" className={classes.branded}>
                <HomeIcon />
                Branded Members
              </Button>
            </Link>
          </div>
          {current ? (
            <Button onClick={() => dispatch(logout())} color="inherit">
              LOGOUT
            </Button>
          ) : (
            <div></div>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        {current === "ADMIN" ? (
          <List>
            <Link
              style={{ textDecoration: "none" }}
              color="inherit"
              variant="h6"
              component={RouterLink}
              to="/products"
            >
              <ListItem button key="products">
                <ListItemIcon>
                  <StoreIcon />
                </ListItemIcon>
                <ListItemText primary="Products" />
              </ListItem>
            </Link>
            <Link
              style={{ textDecoration: "none" }}
              color="inherit"
              variant="h6"
              component={RouterLink}
              to="/members"
            >
              <ListItem button key="members">
                <ListItemIcon>
                  <PeopleAltIcon/>
                </ListItemIcon>
                <ListItemText primary="Members" />
              </ListItem>
            </Link>
          </List>
        ) : (
          <List>
            <Link
              style={{ textDecoration: "none" }}
              color="inherit"
              variant="h6"
              component={RouterLink}
              to="/shop"
            >
              <ListItem button key="store">
                <ListItemIcon>
                  <StoreIcon />
                </ListItemIcon>
                <ListItemText primary="Store" />
              </ListItem>
            </Link>
            <Link
              style={{ textDecoration: "none" }}
              color="inherit"
              variant="h6"
              component={RouterLink}
              to="/cart"
            >
              <ListItem button key="cart">
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Cart" />
              </ListItem>
            </Link>
          </List>
        )}
        <Divider />
      </Drawer>
    </div>
  );
}
