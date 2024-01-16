import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Settings from "./pages/Settings";
import Questions from "./pages/Questions";
import { Container, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css";
import logo from "./logo_smiley_final.png";
import { useState } from "react";
import RouteGuard from "./components/RouteGuard";

function App() {
  const [lastQuestionFlag, setLastQuestionFlag] = useState(false);
  const theme = createTheme({
    typography: {
      fontFamily: '"Comfortaa", sans-serif',
    },
  });

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className="background-container">
          <Paper
            className={lastQuestionFlag ? "fade-out" : "fade-in"}
            elevation={3}
            sx={{
              width: { xs: "90%", sm: "auto" },
              padding: { xs: "1px", sm: "20px" },
            }}
          >
            <Container className="container" maxWidth="sm">
              <Box
                textAlign="center"
                sx={{
                  marginTop: { xs: 2, sm: "20px" },
                  marginBottom: { xs: 2, sm: "20px" },
                }}
              >
                <img src={logo} alt="Smiley Logo" />
                <Switch>
                  <Route path="/" exact>
                    <Typography
                      sx={{
                        fontSize: {
                          lg: 50,
                          sm: 40,
                          xs: 37,
                        },
                      }}
                    >
                      Placement test
                    </Typography>
                    <RouteGuard component={Settings} requestUserData={false} />
                  </Route>
                  <Route path="/questions">
                    <RouteGuard
                      component={Questions}
                      requestUserData={true}
                      setLastQuestionFlag={setLastQuestionFlag}
                    />
                  </Route>
                  <Route path="*" render={() => <Redirect to="/" />} />
                </Switch>
              </Box>
            </Container>
          </Paper>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
