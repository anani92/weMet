import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import {
  Box,
  Button,
  Card,
  CssBaseline,
  Grid,
  Paper,
  TextField,
} from '@mui/material/'
import { Favorite, FavoriteBorder, MoreVert } from '@mui/icons-material'
import {
  Avatar,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  Typography,
} from '@mui/material'
import ModeCommentIcon from '@mui/icons-material/ModeComment'
import { useAuthContext } from '../hooks/useAuthContext'
import { formatDistanceToNow } from 'date-fns'
import SendIcon from '@mui/icons-material/Send'
const Comments = () => {
  const navigate = useNavigate()

  const { user } = useAuthContext()

  const { id } = useParams()
  const [post, setPost] = useState({})
  const [userFull, setUserFull] = useState({})

  const [comments, setComments] = useState([])
  const [commentTitle, setcommentTitle] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [loaded2, setLoaded2] = useState(false)
  const [loaded3, setLoaded3] = useState(false)

  useEffect(() => {
    loaded3 ||
    axios
      .get(`http://localhost:8000/api/post/post/${id}`)
      .then((res) => {
        setPost(res.data)

        setLoaded3(true)
      })
      .catch(console.log('post'))


    loaded2 ||
      axios
        .get('http://localhost:8000/api/users/user/' + post.user)
        .then((res) => {
          setUserFull(res.data.user)
          console.log(userFull)
          setLoaded2(true)
        })
        .catch(err=>console.log(err))

    loaded ||
      axios
        .get(`http://localhost:8000/api/post/post/${id}/comm`)
        .then((res) => {
          setComments(res.data.allcomments)
          console.log(res.data.allcomments)
        })
        .then(setLoaded(true))

        .catch(console.log('comments'))


  })

  const handelcomment = (e) => {
    e.preventDefault()

    if (!user) {
      navigate('/login')
    }
    const commentFromForm = {
      title: user.user.name + ': ' + commentTitle,
      user: user._id,
      post: id,
    }
    console.log(commentFromForm)
    axios
      .post('http://localhost:8000/api/post/comm/new', commentFromForm)
      .then((res) => {
        console.log(res.data)
        setComments([res.data, ...comments])
        setcommentTitle('')
      })
      .catch((err) => console.log(err))
  }
  return (
    <Box
      sx={{
        backgroundSize: 'cover',
        height: '90vh',
        opacity: '',
      }}
    >
      <CssBaseline />
      <Grid container spacing={2} marginTop="2px">
        <Grid item xs={12} md={8} marginLeft="20rem">
          <Card sx={{ width: '70%' }}>
            <CardHeader
              avatar={
                <Avatar src={''} aria-label="Mecipe">
                  R
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVert />
                </IconButton>
              }
              title={loaded && userFull.name}
              subheader={formatDistanceToNow(
                new Date(loaded2 && post.createdAt),
                { addSuffix: true }
              )}
            />
            <CardMedia
              component="img"
              height="20%"
              image="https://images.pexels.com/photos/4534200/pexels-photo-4534200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Paella dish"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {post.title}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite sx={{ color: 'red' }} />}
                >
                  {post.Likes}
                </Checkbox>
              </IconButton>
              <IconButton aria-label="Comment">
                <ModeCommentIcon />
                {comments.length}
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={8} marginLeft="20rem" alignContent={'right'}>
          {comments.map((comm, id) => (
            <Paper
              elevation={2}
              sx={{
                backgroundColor: '#F7F5EB',
                opacity: '.8',
                padding: '.9rem',
                marginBottom: '.9rem',
                width: '70%',
                display: 'flex',
                flexDirection: 'column',
              }}
              key={id}
            >
              {comm.title}
              <span style={{ color: '#1C315E', fontSize: '.9rem' }}>
                {formatDistanceToNow(new Date(comm.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </Paper>
          ))}
        </Grid>

        {/* Comments */}
        <Grid item xs={12} md={8} marginLeft="20rem" marginBottom={'3rem'}>
          <form onSubmit={handelcomment}>
            <Typography gutterBottom>Write a Comment:</Typography>
            <TextField
              style={{ width: '60%' }}
              onChange={(e) => setcommentTitle(e.target.value)}
            />
            <Button
              style={{ height: '30px' }}
              startIcon={<SendIcon />}
              size="large"
              type="submit"
            />
          </form>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Comments

// <CardHeader
//               avatar={
//                 <Avatar
//                   src={''}
//                   aria-label="Mecipe"
//                 >
//                   R
//                 </Avatar>
//               }
//               action={
//                 <IconButton aria-label="settings">
//                   <MoreVert />
//                 </IconButton>
//               }
//               title={loaded && userFull.username}
//               subheader={formatDistanceToNow(new Date(loaded2 && post.createdAt), { addSuffix: true })}
//             />
