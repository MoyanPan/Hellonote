import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import login from "../static/images/login.png";
import { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useContext } from "react";
import { LoginContext } from "../Contexts/LoginContext";

const theme = createTheme();

export default function SignIn() {
  const { setUserObj } = useContext(LoginContext);

  // Get email and password from sign in page
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };
    console.log("userData:", userData);

    // Check existing user
    const checkUser = async () => {
      try {
        // if successful logged in
        const responseLogin = await axios.post(
          "http://localhost:3001/auth/login",
          userData
        );
        if (responseLogin.data) {
          setUserObj(responseLogin.data);
          sessionStorage.setItem("userObj", JSON.stringify(responseLogin.data));
          window.location.replace("http://localhost:3000/home");
        }
      } catch (error) {
        if (error.response.status === 400) {
          alert("Please enter a correct email address!");
        } else if (error.response.status === 401) {
          alert("Please enter a correct password!");
        }
      }
      setFormData({ email: "", password: "" });
    };
    checkUser();
  };

  const onSuccess = (res) => {
    console.log("Login Success: currentUser:", res.profileObj);

    const userData = {
      firstName: res.profileObj.givenName,
      lastName: res.profileObj.familyName,
      email: res.profileObj.email,
      password: res.profileObj.googleId,
    };

    console.log("googleloginUserDate", userData);

    const getUserInfoGoogle = async () => {
      try {
        // if successful for goole logged in at first time
        console.log("google login test");
        console.log("storage", sessionStorage.getItem("userObj"));
        const responseUserInfoGoogle = await axios.post(
          "http://localhost:3001/auth/google",
          userData
        );
        if (responseUserInfoGoogle.data) {
          setUserObj(responseUserInfoGoogle.data);
          sessionStorage.setItem(
            "userObj",
            JSON.stringify(responseUserInfoGoogle.data)
          );
          window.location.replace("http://localhost:3000/home");
        }
      } catch (error) {
        console.log("error:", error);
      }
    };
    getUserInfoGoogle();
  };

  const onFailure = (res) => {
    console.log("Login failed: res:", res);
    alert(`Failed to login. Please try again 😢 `);
    window.location.replace("http://localhost:3000/login");
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${login})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "0% 85%",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
            }}
          >
            <Typography component="h1" variant="h4" sx={{ fontWeight: "bold" }}>
              Welcome To HelloNote
            </Typography>
            <Typography
              component="h6"
              variant="body1"
              sx={{ color: "text.disabled" }}
            >
              Sign in your account
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                value={email}
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={onChange}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={onChange}
                value={password}
                autoComplete="current-password"
              />
              <Grid container>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Grid item xs sx={{ textAlign: "right", marginTop: "8px" }}>
                  <Link
                    href="#"
                    variant="body2"
                    sx={{ textDecoration: "none" }}
                  >
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={onSubmit}
                sx={{ mt: 3, mb: 5, bgcolor: "#6d8de9" }}
              >
                Sign In
              </Button>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <div>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      Sign in with &nbsp;&nbsp;
                      <Link>
                        {}
                        <GoogleLogin
                          clientId="969588223932-7bir4ult7auf3llq6bp4vmrfavta2nca.apps.googleusercontent.com"
                          render={(renderProps) => (
                            <FcGoogle
                              size={30}
                              onClick={renderProps.onClick}
                              disabled={renderProps.disabled}
                            />
                          )}
                          // buttonText="Google Login"

                          onSuccess={onSuccess}
                          onFailure={onFailure}
                          cookiePolicy="single_host_origin"
                          isSignedIn={true}
                        />
                      </Link>
                      &nbsp;&nbsp;
                      <Link href="http://localhost:3001/auth/github">
                        <FaGithub size={30} style={{ color: "black" }} />
                      </Link>
                    </span>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <p>
                    Don't have an account?&nbsp;
                    <Link
                      href="/register"
                      color="#2196f3"
                      sx={{ textDecoration: "none" }}
                    >
                      Sign up
                    </Link>
                  </p>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
