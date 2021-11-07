import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#a80c0c",
    },
    secondary: {
      main: "#9e9292",
    },
    text: {
      primary: "rgba(61,58,58,0.87)",
    },
    info: {
      main: "#ec322e",
    },
  },
  typography: {
    fontSize: 32,
    fontWeightLight: 200,
    fontWeightMedium: 900,
    fontWeightBold: 1000,
    htmlFontSize: 28,
    h1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.46,
    },
    subtitle1: {
      fontSize: "0.8rem",
    },
  },
  overrides: {
    MuiButton: {
      root: {
        background: "linear-gradient(45deg, #a80c0c 30%, #9e9292 90%)",
        border: 0,
        borderRadius: 3,
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
        color: "white",
        height: 48,
        padding: "0 30px",
      },
    },
  },
});
export default theme;
