import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import HandshakeIcon from '@mui/icons-material/Handshake'
import { useLocation } from 'react-router-dom'
const Navbar = () => {
  const navigate = useNavigate()
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const handleLogout = () => {
    logout()
  }
  const { pathname } = useLocation()

  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  var photo = ''
  if (user)
    if (user.hasOwnProperty('provider')) {
      if (user.provider === 'github') {
        photo = user.photos[0].value
      } else {
        console.log(user._json.picture)
        photo = user._json.picture
      }
    }
  return (
    <AppBar position="static" sx={{ backgroundColor: '#1d1931' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <HandshakeIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            we
            <span
              style={{ color: '#CFA76E', fontFamily: 'Nunito' }}
              onClick={() => navigate('/dash')}
            >
              Met
            </span>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography
                  textAlign="center"
                  onClick={() => navigate('/groups')}
                >
                  Group
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography
                  textAlign="center"
                  onClick={() => navigate('/chats')}
                >
                  Chats
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          <HandshakeIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            we
            <span
              style={{ color: '#CFA76E', fontFamily: 'Nunito' }}
              onClick={() => navigate('/dash')}
            >
              Met
            </span>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              <span onClick={() => navigate('/groups')}>Groups</span>
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              <span onClick={() => navigate('/chats')}>Chats</span>
            </Button>
          </Box>
          {pathname !== '/chats' && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {/* {user ? : <Avatar alt="MB" src={user._json.picture} />} */}
                  <Avatar alt="MB" src={photo} />
                </IconButton>
              </Tooltip>
              {/* <Typography> {userName}</Typography> */}
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  {user ? (
                    <Typography textAlign="center" onClick={handleLogout}>
                      Logout
                    </Typography>
                  ) : (
                    <Typography
                      textAlign="center"
                      onClick={() => navigate('/')}
                    >
                      Login
                    </Typography>
                  )}
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
