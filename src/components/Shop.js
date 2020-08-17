import React, { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Container,
  InputAdornment,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
} from "@material-ui/core";
import Search from "@material-ui/icons/Search";

import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import { useStylesShop } from "../hooks/useStyles";
import Modal from "./Modal";

export default function Shop() {
  const current = useSelector((state) => state.logged);
  const shop = useSelector((state) => state.shop);
  const classes = useStylesShop();

  const [search, setSearch] = useState("");
  const [filterByPrice, setFilterByPrice] = useState("");

  if (!current) {
    return <Redirect to="/" />;
  }

  if (current === "ADMIN") {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            {`Welcome ${current.firstName} ${current.lastName}!`}
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Welcome to Branded Members club! Feel free to enjoy everything
            that's available for purchase!
          </Typography>
          <div className={classes.heroButtons}>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <TextField
                  onChange={(e) => setSearch(e.target.value)}
                  className={classes.margin}
                  id="input-with-icon-textfield"
                  label="Filter"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Price
                  </InputLabel>
                  <Select
                    onChange={(e) => setFilterByPrice(e.target.value)}
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="Age"
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value={"low-to-high"}>Low to High</MenuItem>
                    <MenuItem value={"high-to-low"}>High to Low</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {shop
            .filter((card) =>
              card.name.toLowerCase().includes(search.toLowerCase())
            )
            .sort(function (a, b) {
              return filterByPrice === "high-to-low"
                ? b.price - a.price
                : filterByPrice === "low-to-high"
                ? a.price - b.price
                : a - b;
            })
            .map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    component="img"
                    src={card.image}
                    height="140"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.name}
                    </Typography>
                    <Typography variant="h6">{`$${card.price}`}</Typography>
                  </CardContent>
                  <CardActions className={classes.margin}>
                    <Modal item={card} />
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Container>
    </div>
  );
}
