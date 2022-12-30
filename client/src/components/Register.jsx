import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'
const Register = () => {
    // User coming from db saved in state
    const [user, setUser] = useState({})
    // front end validation schema with yup - not realted to backend schemas 
    const schema = yup.object().shape({
        username: yup.string().required("Username can't be blank!").min(6, "Username must be at lease 6 characters!"),
        email: yup.string().email("Email must be valid").required("Email can't be blank"),
        password: yup.string().trim().required("Password can't be blank").min(4, "Password must be between 4-20 characters!").max(20, "Password must be between 4-20 characters!"),
        confirmPassword: yup.string().required("Password Confirmation can't be blank").oneOf([yup.ref("password"), null], "Password doesn't match"),
    })
    // formhook replacing onChange, to deal with user inputs & handleSubmit function & errors
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    })
    // when actual submitting happens
    const onSubmit = (formUser) => {
        axios.post(`http://localhost:8000/api/createUser`, formUser)
            .then((res) => { setUser(res.data) })
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <p>{errors.username?.message}</p>
                    <input type="text" placeholder='Enter username' {...register("username")} />
                </div>
                <div>
                    <p>{errors.email?.message}</p>
                    <input type="email" placeholder='Enter email' {...register("email")} />
                </div>
                <div>
                    <p>{errors.password?.message}</p>
                    <input type="password" placeholder='Enter password' {...register("password")} />
                </div>
                <div>
                    <p>{errors.confirmPassword?.message}</p>
                    <input type="password" placeholder='Confirm Passowrd' {...register("confirmPassword")} />
                </div>
                <div>
                    <input type="submit" value="Submit" />
                </div>
            </form>
        </div>
    )
}

export default Register