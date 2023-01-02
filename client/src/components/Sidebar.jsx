import { Category } from '@mui/icons-material'
import React from 'react'
import { useState } from 'react'

const Sidebar =(props) => {
    const {groups,sumbitcategory} = props

    const submitCat = (e)=>{
        e.preventDefault();
        sumbitcategory(groups.filter((gr=>gr.category===e.target.value)))
        
    }

  return (
    <div>
        <h3>Categories</h3>
    <div style={{display:'flex',flexDirection:'column',marginTop:'5rem',marginLeft:'10px' ,width:'100px'}}>
        
        <button  value="Sports" onClick={submitCat} >Sports</button>
        <button value="Anime" onClick={submitCat} >Anime</button>

     
        <button value="LifeStyle" onClick={submitCat}>LifeStyle</button>
        <button  value="IT" onClick={submitCat}>IT</button>
        <button  value="Fashion" onClick={submitCat}>Fashion</button>
        <button  value="Movies"  onClick={submitCat}>Movies</button>
        <button  value="Healthy"  onClick={submitCat}>Healthy</button>
        <button  value="Animals"  onClick={submitCat}>Animals</button>
        <button  value="Celebrities"  onClick={submitCat}>Celebrities</button>

    </div>
    </div>
  )
}

export default Sidebar
