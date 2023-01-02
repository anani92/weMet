import { Avatar, Button } from '@mui/material'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Toolbar, Typography, Tabs, Tab, styled } from '@material-ui/core';
import { Icon, InputBase } from "@mui/material";
// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "32%",
}));

const useStyles = makeStyles((theme) => ({
  appbarWrapper: {
    width: '80%',
    margin: '0 auto',
  },
  appbarTitle: {
    flexGrow: '1',
  },

  colorText: {
    color: '#CFA76E',
    fontFamily: 'Nunito',
  },
  title: {
    color: '#fff',
    fontSize: '4.5rem',

  },
  appBar: {
    backgroundColor: '#063970',
  },
  search: {
    backgroundColor: "white",
    padding: "0 10px",
    borderRadius: theme.shape.borderRadius,
    width: "40%",
  },
  Tab: {
    fontSize: '1.1rem',
  },
}));
const Navbar = () => {
  // destruct logout from custom hook useLogout
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const handleLogout = () => {
    logout()
  }
  const classes = useStyles();
  const openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  return (
    <div>
      <React.Fragment>
        <AppBar className={classes.appBar}>
          <Toolbar className={classes.appbarWrapper}>
            <h1 className={classes.appbarTitle}>
              we<span className={classes.colorText}>Met</span>
            </h1>
            <Search className={classes.search} >
              <InputBase placeholder="search..." />
            </Search>
            <Tabs sx={{ marginLeft: "auto" }} indicatorColor="secondary" textColor="inherit">
              <Tab className={classes.Tab} label="Main" onClick={(() => openInNewTab("http://localhost:3000"))} />
              <Tab className={classes.Tab} label="Sign In" onClick={() => openInNewTab("http://localhost:3000/login")} />
              <Tab className={classes.Tab} label="Home" onClick={() => openInNewTab("http://localhost:3000/register")} />
              <Tab className={classes.Tab} label="Logout" onClick={handleLogout} />
            </Tabs>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    </div>

    // <div style={{ display: 'flex' }}>
    //   <Button
    //     variant='outlined'
    //     color='success'
    //     onClick={() => navigate(`/`)}
    //   >
    //     Home
    //   </Button>
    //   {!user &&
    //     (
    //       <div>

    //         <Button
    //           variant='outlined'
    //           color='success'
    //           onClick={() => navigate(`/login`)}
    //         >
    //           Sign In
    //         </Button>
    //         <Button
    //           variant='outlined'
    //           color='success'
    //           onClick={() => navigate(`/register`)}
    //         >
    //           Sign Up
    //         </Button>
    //       </div>
    //     )}

    //   {user && <div>
    //     <Button
    //       variant='outlined'
    //       color='success'
    //       onClick={handleLogout}
    //     >
    //       Logout
    //     </Button>

    //     {user.provider ? <div>
    //       <span>{user.username}</span>
    //       <Avatar alt="prof pic" src={user._json.avatar_url} />
    //     </div> : <p>Welcome {user.user.username}, Memeber since {formatDistanceToNow(new Date(user.user.createdAt), { addSuffix: true })}</p>}

    //   </div>}

    // </div>

  )
}

export default Navbar