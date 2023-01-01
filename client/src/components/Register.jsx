import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { Avatar, Box, Button, createTheme, CssBaseline, Grid, TextField, ThemeProvider, Typography } from '@mui/material'
import { Container } from '@mui/material'
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
// import social2 from '../utils/social2.jpg'

const Register = () => {
    const [backendErrors, setBackendErrors] = useState([])
    const { dispatch } = useAuthContext()

    const schema = yup.object().shape({
        username: yup.string().required("Username can't be blank!").min(6, "Username must be at lease 6 characters!"),
        email: yup.string().email("Email must be valid").required("Email can't be blank"),
        password: yup.string().trim().required("Password can't be blank").min(4, "Password must be between 4-20 characters!").max(20, "Password must be between 4-20 characters!"),
        confirmPassword: yup.string().required("Password Confirmation can't be blank").oneOf([yup.ref("password"), null], "Password doesn't match"),
    })
    const navigate = useNavigate()
    // formhook replacing onChange, to deal with user inputs & handleSubmit function & errors
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    })
    // when actual submitting happens
    const onSubmit = (formUser, e) => {
        e.preventDefault();
        axios.post(`http://localhost:8000/api/signup`, formUser)
            .then((res) => {
                // save this user in local storage // replacing cookies 
                localStorage.setItem('user', JSON.stringify(res.data));
                // change the global state for this user once login/register is done
                dispatch({ type: 'LOGIN', payload: res.data })
            })
            .then(() => navigate(`/`))
            .catch(err => {
                const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                const errorArr = []; // Define a temp error array to push the messages in
                for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message)
                }
                setBackendErrors(errorArr);
            })
    }
    const theme = createTheme();

    return (
        <Box
            sx={{
                // backgroundImage: `url(${social2})`,
                // backgroundSize: 'cover',
                // width: `calc(90vw)`,
                // height: "90vh",
                // backgroundPosition: 'center',
                // margin: '1rem auto',
                // padding: '1rem',
            }}
        >
            <ThemeProvider theme={theme} className="test">
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
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                            <LoginRoundedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign Up
                        </Typography>
                        <Box
                            component='form'
                            onSubmit={handleSubmit(onSubmit)}
                            noValidate
                            sx={{ mt: 1 }}
                        >
                            <Typography component="h1" variant="h5">
                                {backendErrors.map((err, i) => <p style={{ color: 'red', textAlign: 'center' }} key={i}>{err ? err : null}</p>)}
                            </Typography>
                            <TextField
                                {...register("username")}
                                margin="normal"
                                // required
                                fullWidth
                                type='text'
                                label="Username"
                                placeholder='Enter username...'
                                // autoComplete="userName"
                                autoFocus
                                error={errors.username?.message}
                                helperText={errors.username?.message}
                            />
                            <TextField
                                margin="normal"
                                {...register("email")}
                                // required
                                fullWidth
                                type='email'
                                label="Email"
                                placeholder='Enter email...'
                                // autoComplete="Email"
                                autoFocus
                                error={errors.email?.message}
                                helperText={errors.email?.message}
                            />
                            <TextField
                                margin="normal"
                                {...register("password")}
                                // required
                                type='password'
                                fullWidth
                                label="Password"
                                placeholder='Enter password...'
                                // autoComplete="password"
                                autoFocus
                                error={errors.password?.message}
                                helperText={errors.password?.message}
                            />
                            <TextField
                                margin="normal"
                                {...register("confirmPassword")}
                                // required
                                type='password'
                                fullWidth
                                label="Confirm Password"
                                placeholder='Enter password again...'
                                // autoComplete="ConfirmPassword"
                                autoFocus
                                error={errors.confirmPassword?.message}
                                helperText={errors.confirmPassword?.message}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link to={`/login`} variant="body2">
                                        Have an account? Sign In
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

export default Register