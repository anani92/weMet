import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, styled, Tab, Tabs, Avatar } from '@material-ui/core';
import { useNavigate } from 'react-router-dom'
// date fns
// import formatDistanceToNow from 'date-fns/formatDistanceToNow'
// const Search = styled("div")(({ theme }) => ({
//   backgroundColor: "white",
//   padding: "0 10px",
//   borderRadius: theme.shape.borderRadius,
//   width: "32%",
// }));

const useStyles = makeStyles((theme) => ({
  appbarWrapper: {
    width: '90%',
    margin: '0 auto',

  },
  appbarTitle: {
    flexGrow: '1',
    cursor: 'pointer',
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
  // search: {
  //   backgroundColor: "white",
  //   padding: "0 10px",
  //   borderRadius: theme.shape.borderRadius,
  //   width: "40%",
  // },
  Tab: {
    fontSize: '1.1rem',
  },
}));
const Navbar = () => {
  const navigate = useNavigate();
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
            <h1 className={classes.appbarTitle} onClick={() => navigate('/')}>
              we<span className={classes.colorText}>Met</span>
            </h1>
            {/* <Search className={classes.search} >
              <InputBase placeholder="search..." />
            </Search> */}
            <Tabs sx={{ marginLeft: "auto" }} indicatorColor="secondary" textColor="inherit">
              <Tab className={classes.Tab} label="Groups" onClick={() => navigate("/groups")} />
              {!user ? <Tab className={classes.Tab} label="Sign In" onClick={() => navigate("/login")} /> : <Tab className={classes.Tab} label="Logout" onClick={handleLogout} />}
              <Tab><Avatar src="" >Hi</Avatar></Tab>
            </Tabs>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    </div >

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