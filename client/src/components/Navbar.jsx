import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
const Navbar = () => {
  // destruct logout from custom hook useLogout
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const handleLogout = () => {
    logout()
  }
  const navigate = useNavigate()
  return (
    <div style={{ display: 'flex' }}>
      <Button
        variant='outlined'
        color='success'
        onClick={() => navigate(`/`)}
      >
        Home
      </Button>
      {!user &&
        (
          <div>

            <Button
              variant='outlined'
              color='success'
              onClick={() => navigate(`/login`)}
            >
              Sign In
            </Button>
            <Button
              variant='outlined'
              color='success'
              onClick={() => navigate(`/register`)}
            >
              Sign Up
            </Button>
          </div>
        )}

      {user && <div>
        <Button
          variant='outlined'
          color='success'
          onClick={handleLogout}
        >
          Logout
        </Button>
        <span>Welcome {user.email}</span>
      </div>}

    </div>

  )
}

export default Navbar