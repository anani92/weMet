import React, { useEffect, useState } from 'react';
import { Grid, TextField, Button, Card, CardContent, Typography } from '@material-ui/core';
import Sidebar from './Sidebar';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';


const Groups = () => {
  const {user} = useAuthContext()
  const [groups,setGroups] = useState([]);
  const [title,settitle] = useState('');
  const [desc,setdesc] = useState('');
  const [filtergroups,setFiltergroups] = useState(groups);
  const [categorys,setCategory]=useState('')
  const [load,setload]=useState(false);

    
// console.log(user.user._id)

    useEffect(()=>{
    axios.get("http://localhost:8000/api/group")

    .then((res)=>{setGroups(res.data);setFiltergroups(res.data);setload(true)})
    .catch((err) => console.log(err))
  },[])
  // console.log(filtergroups)

  console.log(categorys)
  // console.log(title)
  // console.log(desc)


  const handelSubmit = (e) =>{
    e.preventDefault()
      var person ={
        'title':title,
        'description':desc,
        "owner":user.user._id+'',
        "category":categorys,
      }
      console.log(person)
      
      axios.post("http://localhost:8000/api/group/new",person)
      .then((res)=>{
        setGroups([...groups,res.data])
        setFiltergroups([...groups,res.data])
      }
        )
      .catch(console.log("nooooooooooddododod"))
    

    
  }


  return (
    <div className="App" style={{display:'flex',flexDirection:'column',position:'absolute'}}>
      <div>
      <Sidebar groups={groups} sumbitcategory={setFiltergroups} >
      
      </Sidebar>
      
      {load&& filtergroups.map(groups=>
      
      <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
          <CardContent>
            {groups.title}
            </CardContent>
            </Card> )}

      
      {/* {load&&  filtergroups.map((group,i)=> <Card index={i}>{group.title}</Card> )} */}
      
      </div>
      <Grid>
      

        <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
          <CardContent>
            <Typography gutterBottom variant="h5">
              Add Group
            </Typography>
            <form onSubmit={handelSubmit}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField type="title" placeholder="Enter Title" label="Title" variant="outlined" onChange={e=>{settitle(e.target.value)}} fullWidth required />
                </Grid>
                <Grid item xs={12}>
                  <TextField type="description" placeholder="Enter Description" label="Description" variant="outlined"  onChange={e=>{setdesc(e.target.value)}} fullWidth required />
                </Grid>
                <Grid item xs={12}>
                  <select onChange={e=>setCategory(e.target.value)} >
                      <option value="Sports">Sports</option>
                      <option value="Anime">Anime</option>
                      <option value="IT">IT</option>
                      <option value="Fashion">Fashion</option>
                      <option value="Movies">Movies</option>
                      <option value="Healthy">Healthy</option>
                      <option value="Celebrities">Celebrities</option>
                      <option value="Drama">Drama</option>
                     
                  </select>
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  )
}

export default Groups;