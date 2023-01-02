import { Avatar, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
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

        {user.provider ? <div>
          <span>{user.username}</span>
          <Avatar alt="prof pic" src={user._json.avatar_url} />
        </div> : <h1>{user.user.username}, Registered {formatDistanceToNow(new Date(user.user.createdAt), { addSuffix: true })}</h1>}

      </div>}

    </div>

  )
}

export default Navbar