import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Avatar, Box, Button, createTheme, CssBaseline, Grid, TextField, ThemeProvider, Typography } from '@mui/material'
import { Container } from '@mui/material'
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useAuthContext } from '../hooks/useAuthContext'
// import social2 from '../utils/social2.jpg'

const Login = () => {
    const [backendErrors, setBackendErrors] = useState("")
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { dispatch } = useAuthContext()
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:8000/api/login`, { email, password })
            .then((res) => {
                localStorage.setItem('user', JSON.stringify(res.data));
                dispatch({ type: 'LOGIN', payload: res.data })
                navigate(`/`)
            })
            .catch(err => {
                setBackendErrors(err.response.data.error)
            })
    }
    const google = () => {
        window.open("http://localhost:8000/auth/google", "_self")
        const getUser = () => {
            fetch("http://localhost:8000/auth/login/success", {
                method: "GET",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                },
            })
                .then((res) => {
                    if (res.status === 200) return res.json();
                    // throw new Error("Authentication has been failed");
                })
                .then((resObject) => {
                    dispatch({ type: "LOGIN", payload: resObject.user });
                    localStorage.setItem("user", JSON.stringify(resObject.user));
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        getUser();

    }
    const github = () => {
        window.open("http://localhost:8000/auth/github", "_self")
        const getUser = () => {
            fetch("http://localhost:8000/auth/login/success", {
                method: "GET",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                },
            })
                .then((res) => {
                    if (res.status === 200) return res.json();
                    // throw new Error("Authentication has been failed");
                })
                .then((resObject) => {
                    dispatch({ type: "LOGIN", payload: resObject.user });
                    localStorage.setItem("user", JSON.stringify(resObject.user));
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        getUser();
    }
    const theme = createTheme();
    return (
        <Box
        // sx={{
        //     backgroundImage: `url(${social2})`,
        //     backgroundSize: 'cover',
        //     width: `calc(90vw)`,
        //     height: "90vh",
        //     backgroundPosition: '25% 75%',
        //     opacity: "",
        //     margin: '1rem auto',
        //     padding: '1rem',
        // }}
        >

            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 3,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'info.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Log In
                        </Typography>
                        <Box
                            component='form'
                            onSubmit={handleSubmit}
                            noValidate
                            sx={{ mt: 1 }}
                        >
                            <Typography component="h1" variant="h5">
                                {/* {backendErrors.map((err, i) => <p style={{ color: 'red', textAlign: 'center' }} key={i}>{err ? err : null}</p>)} */}
                                <p style={{ color: 'red', textAlign: 'center' }}>{backendErrors}</p>
                            </Typography>
                            <TextField
                                margin="normal"
                                // required
                                fullWidth
                                onChange={(e) => setEmail(e.target.value)}
                                type='email'
                                label="Email"
                                placeholder='Enter email...'
                                // autoComplete="Email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                // required
                                onChange={(e) => setPassword(e.target.value)}
                                type='password'
                                fullWidth
                                label="Password"
                                placeholder='Enter password...'
                                // autoComplete="password"
                                autoFocus
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="info"
                                sx={{ mt: 3, mb: 1 }}
                            >
                                Log In
                            </Button>
                            <Button
                                fullWidth
                                onClick={google}
                                variant="outlined"
                                color="info"
                                startIcon={<GoogleIcon />}
                                sx={{ mt: 1, mb: 1 }}
                            >
                                Continue with Google
                            </Button>
                            <Button
                                fullWidth
                                onClick={github}
                                variant="outlined"
                                color="info"
                                startIcon={<GitHubIcon />}
                                sx={{ mt: 1, mb: 3 }}
                            >
                                Continue with GitHub
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link to={`/register`} variant="body2">
                                        Don't have an account? Sign Up
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider >
        </Box>

    )
}

export default Login