import React, { useEffect, useState } from 'react'
// import { Grid, TextField, Button, Card, CardContent, Typography, Box } from '@material-ui/core';
import Sidebar from '../components/Sidebar'
import axios from 'axios'
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  CssBaseline,
  Grid,
  TextField,
  Button,
  Box,
  Typography,
  CardContent,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CardMedia,
  CardActions,
} from '@mui/material/'
// import bg1 from '../utils/bg1.jpg'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const Groups = () => {
  const { user } = useAuthContext()
  const [groups, setGroups] = useState([])
  const [title, settitle] = useState('')
  const [desc, setdesc] = useState('')
  const [filtergroups, setFiltergroups] = useState(groups)
  const [categorys, setCategory] = useState('')
  const [load, setload] = useState(false)
  const navigate = useNavigate()
  // console.log(user.user._id)

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/group')

      .then((res) => {
        setGroups(res.data)
        setFiltergroups(res.data)
        setload(true)
      })
      .catch((err) => console.log(err))
  }, [])

  const handelSubmit = (e) => {
    e.preventDefault()
    if (!user) {
      navigate('/')
    }
    let person = {
      title: title,
      description: desc,
      owner: user.user._id,
      category: categorys,
    }

    axios
      .post('http://localhost:8000/api/group/new', person)
      .then((res) => {
        setGroups([res.data, ...groups])
        setFiltergroups([res.data, ...groups])
      })
      .catch(console.log('nooooooooooddododod'))
  }

  const buttonStyle = {
    color: 'white',
    fontWeight: '700',
    backgroundColor: '#063970',
  }

  return (
    <Box
      sx={{
        // backgroundImage: `url(${bg1})`,
        backgroundSize: 'cover',
        // width: `calc(90vw)`,
        height: '90vh',
        // backgroundPosition: '25% 75%',
        opacity: '',
        // marginLeft: '1rem auto',
        // padding: '1rem',
      }}
    >
      <CssBaseline />
      <Grid container spacing={2} marginTop="2px">
        {/* Sidebar */}
        <Grid item xs={12} md={2}>
          <Sidebar groups={groups} sumbitcategory={setFiltergroups} />
        </Grid>
        {/* Main */}
        <Grid item xs={12} md={7} sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {load &&
            filtergroups.map((groups) => (
              <Card sx={{ width: 400, margin: '.5rem auto' }} elevation={4}>
                <CardMedia
                  sx={{ height: 140 }}
                  image="https://global-uploads.webflow.com/5e157548d6f7910beea4e2d6/62dea764ea3e597ad347e785_group-logo-maker.png"
                  title={groups.title}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    color="#CFA76E"
                  >
                    {groups.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {groups.description}
                  </Typography>
                  <Typography variant="body2" color="#CFA76E">
                    added{' '}
                    {formatDistanceToNow(new Date(groups.createdAt), {
                      addSuffix: true,
                    })}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    sx={{ color: '#063970', fontWeight: '600' }}
                    onClick={
                      !user
                        ? () => {
                            navigate(`/`)
                          }
                        : () => navigate(`/group/${groups._id}/posts`)
                    }
                  >
                    View Post...
                  </Button>
                </CardActions>
              </Card>
            ))}
        </Grid>
        {/* Form */}
        <Grid item xs={12} md={3}>
          <Card
            sx={{
              maxWidth: 450,
              margin: '0 1.3rem 0 .5rem',
              padding: '1rem 0 .5rem 1rem',
            }}
          >
            <CardContent>
              <Typography
                ml={1}
                align="left"
                variant="h5"
                color="#CFA76E"
                fontWeight="bold"
                gutterBottom
              >
                Add Group
              </Typography>
              <form onSubmit={handelSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      type="text"
                      placeholder="Enter Title"
                      label="Title"
                      variant="outlined"
                      onChange={(e) => {
                        settitle(e.target.value)
                      }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="text"
                      placeholder="Enter Description"
                      label="Description"
                      variant="outlined"
                      onChange={(e) => {
                        setdesc(e.target.value)
                      }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-helper-label">
                        Category
                      </InputLabel>

                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        label="Category"
                        onChange={(e) => setCategory(e.target.value)}
                        fullWidth
                      >
                        <MenuItem value="Sports">Sports</MenuItem>
                        <MenuItem value="Anime">Anime</MenuItem>
                        <MenuItem value="Movies">Movies</MenuItem>
                        <MenuItem value="Marriage">Marriage</MenuItem>
                        <MenuItem value="IT">IT</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      sx={buttonStyle}
                      type="submit"
                      variant="contained"
                      fullWidth
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Groups
