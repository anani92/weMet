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
                navigate(`/login`)
            })
            .catch(err => {
                setBackendErrors(err.response.data.error)
                // console.log(err.response.data.error)
                // const errorResponse = err.response.data.error; // Get the errors from err.response.data
                // const errorArr = []; // Define a temp error array to push the messages in
                // for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                //     errorArr.push(errorResponse[key].message)
                // }
                // setBackendErrors(errorArr);
            })
    }
    const theme = createTheme();
    return (
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
                    <Avatar sx={{ m: 1, bgcolor: 'success.main' }}>
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
                            autoComplete="Email"
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
                            autoComplete="password"
                            autoFocus
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="success"
                            sx={{ mt: 3, mb: 1 }}
                        >
                            Log In
                        </Button>
                        <Button
                            fullWidth
                            variant="outlined"
                            color="success"
                            startIcon={<GoogleIcon />}
                            sx={{ mt: 1, mb: 1 }}
                        >
                            Continue with Google
                        </Button>
                        <Button
                            fullWidth
                            variant="outlined"
                            color="success"
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
    )
}

export default Login