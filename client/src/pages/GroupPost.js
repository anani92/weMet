import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Card,
  CssBaseline,
  Grid,
  TextField,
  Button,
  Box,
  Typography,
  CardContent,
} from '@mui/material/'
// import bg1 from '../utils/bg1.jpg'
import PostDetails from '../components/PostDetails'

const GroupPosts = () => {
  const { id } = useParams()
  const [posts, setPosts] = useState([])
  const [load, setload] = useState(false)
  const [description, setDescription] = useState('')
  const { user } = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/group/${id}/posts`)
      .then((res) => {
        setPosts(res.data.post)
        console.log(res.data.post)
        setload(true)
      })
      .catch((err) => console.log(err))
  }, [])

  const handelSubmitpost = (e) => {
    e.preventDefault()

    if (!user) {
      navigate('/')
    }
    console.log(user.user._id + '55555555555')
    const postFromForm = {
      title: description,
      user: user.user._id,
      group: id,
    }

    axios
      .post('http://localhost:8000/api/post/new', postFromForm)
      .then((res) => {
        setPosts([res.data, ...posts])
        setDescription('')
      })
      .catch((err) => console.log(err))
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
        {/* space */}
        <Grid item xs={12} md={3}></Grid>
        {/* Main */}
        <Grid
          item
          xs={12}
          md={5}
          sx={{ display: 'flex', flexDirection: 'column' }}
        >
          {load &&
            posts.map((pos, i) => (
              <PostDetails post={pos} posts={posts} setPosts={setPosts} />
            ))}
        </Grid>
        {/* Form */}
        <Grid item xs={12} md={3}>
          <Card
            sx={{
              maxWidth: 450,
              margin: '1rem 1.3rem 0 .5rem',
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
                Add Post
              </Typography>
              <form onSubmit={handelSubmitpost}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      multiline
                      rows={2}
                      type="text"
                      placeholder="Enter Description"
                      label="Description"
                      variant="outlined"
                      onChange={(e) => {
                        setDescription(e.target.value)
                      }}
                      fullWidth
                    />
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

export default GroupPosts
