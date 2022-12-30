import React from 'react'

const Register = () => {
    return (
        <div>
            <form >
                <div>
                    <input type="text" placeholder='Enter username' />
                </div>
                <div>
                    <input type="email" placeholder='Enter email' />
                </div>
                <div>
                    <input type="password" placeholder='Enter password' />
                </div>
                <div>
                    <input type="password" placeholder='Confirm Passowrd' />
                </div>
                <div>
                    <input type="submit" value="Submit" />
                </div>
            </form>
        </div>
    )
}

export default Register