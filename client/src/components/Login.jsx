import React from 'react'

const Login = () => {
    return (
        <div>
            <form >
                <div>
                    <input type="email" placeholder='Enter email' />
                </div>
                <div>
                    <input type="password" placeholder='Enter password' />
                </div>
                <div>
                    <input type="submit" value="Submit" />
                </div>
            </form>
        </div>
    )
}

export default Login