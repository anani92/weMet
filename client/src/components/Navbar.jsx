import { Button } from '@mui/material'
import { useLogout } from '../hooks/useLogout'

const Navbar = () => {
  // destruct logout from custom hook useLogout
  const { logout } = useLogout()
  const handleLogout = () => {
    logout()
  }
  return (
    <>
      <Button
        variant='outlined'
        color='success'
        onClick={handleLogout}
      >
        Logout
      </Button>
    </>

  )
}

export default Navbar