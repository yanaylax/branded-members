import { makeStyles } from "@material-ui/core/styles";

export const useStylesLogin = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  club: {
    backgroundColor: theme.palette.grey[50],
    paddingTop: theme.spacing(10),
  },
  paper: {
    margin: theme.spacing(18, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    flexGrow: "1",
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const useStylesTable = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  add: {
    margin: theme.spacing(1,4),
  },
  modal: {
      margin: theme.spacing(1),
      marginRight:theme.spacing(2)
  },
  grid: {
      paddingRight: theme.spacing(2)
  },
  title: {
      marginTop: theme.spacing(18),
  },
  button: {
      display:"flex",
      justifyContent:"flex-end"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  
  
}));

export const useStylesShop = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },

  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(18, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%",
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  margin: {
    margin: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export const useStylesClubDesc = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    margin: theme.spacing(10, 6),
  },
  title: {
    fontSize: "4rem",
    fontWeight: "bold",
    marginBottom: theme.spacing(2),
  },
  club: {
    marginTop: theme.spacing(5),
  },
}));
