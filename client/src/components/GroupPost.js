import React from 'react'
import Post from './Post'
import { Box } from '@mui/material'
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from '@material-ui/core'

const GroupPost = () => {
  return (
    <div>
      <h1>Category</h1>
      <Grid>
        <Card
          style={{
            maxWidth: 450,
            padding: '20px 5px',
            marginLeft: '75%',
            marginTop: '5%',
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h5">
              Add Post
            </Typography>
            <form>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    type="title"
                    placeholder="Enter Title"
                    label="post"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
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
      <Box flex={4} p={{ xs: 0 }} sx={{ marginLeft: '27%', width: '40%' }}>
        <Post />
        <Post />
      </Box>
    </div>
  )
}

export default GroupPost
