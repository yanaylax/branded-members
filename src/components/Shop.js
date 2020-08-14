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
  FormLabel,
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

  //   if (!current) {
  //     return <Redirect to="/" />;
  //   }

  return (
    <main>
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
            Something short and leading about the collection below—its contents,
            the creator, etc. Make it short and sweet, but not too short so
            folks don&apos;t simply skip over it entirely.
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
            .filter((card) => card.name.includes(search))
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
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.name}
                    </Typography>
                    <Typography>{`${card.price}$`}</Typography>
                  </CardContent>
                  <CardActions className={classes.margin}>
                    <Modal />
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Container>
    </main>
  );
}
