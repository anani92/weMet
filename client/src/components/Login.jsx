import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [backendErrors, setBackendErrors] = useState([])
    const [userToken, setUserToken] = useState({})
    const navigate = useNavigate()
    const handleSubmit = () => {
        axios.post(`http://localhost:8000/api/login`)
            .then((res) => { setUserToken(res.data.token) })
            .then(() => navigate(-1))
            .catch(err => {
                const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                const errorArr = []; // Define a temp error array to push the messages in
                for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message)
                }
                setBackendErrors(errorArr);
            })
    }
    console.log(userToken)
    return (
        <div onSubmit={handleSubmit}>
            <form >
                <div>{backendErrors.map((err, i) => <p key={i}>{err}</p>)}</div>
                <div>
                    <input type="email" placeholder='Enter email' />
                </div>
                <div>
                    <input type="password" placeholder='Enter password' />
                </div>
                <div>
                    <input type="submit" value="Submit" />
                </div>
                <div><h1>Login with Google</h1></div>
                <div><h1>Login with GitHub</h1></div>
            </form>
        </div>
    )
}

export default Login