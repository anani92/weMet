import { Button, Divider, Paper, Stack, Typography } from '@mui/material'
import React from 'react'

const Sidebar = (props) => {
  const { groups, sumbitcategory } = props

  const submitCat = (e) => {
    e.preventDefault();
    sumbitcategory(groups.filter((gr => gr.category === e.target.value)))

  }
  const resetAll = (e) => {
    e.preventDefault()
    sumbitcategory(groups)
  }
  const buttonStyle = {
    color: '#063970',
    fontWeight: '700',
  }
  return (
    <Paper
      elevation={3}
      sx={{ padding: '1rem 0 2.4rem 1rem', bgcolor: '', margin: '0 1rem' }}
    >
      <Stack
        mt={2}

        direction="column"
        divider={<Divider orientation="horizontal" flexItem />}
        spacing={1}
        width='45%'
        marginLeft={3}
      >
        <Button sx={buttonStyle} value="All" onClick={resetAll} >All </Button>
        <Button sx={buttonStyle} value="Sports" onClick={submitCat} >Sports</Button>
        <Button sx={buttonStyle} value="Anime" onClick={submitCat} >Anime</Button>
        <Button sx={buttonStyle} value="Movies" onClick={submitCat}>Movies</Button>
        <Button sx={buttonStyle} value="Marriage" onClick={submitCat}>Marriage</Button>
        <Button sx={buttonStyle} value="IT" onClick={submitCat}>IT</Button>
      </Stack>
    </Paper>
  )
}

export default Sidebar
