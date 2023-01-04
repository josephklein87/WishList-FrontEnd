import React, { useState } from 'react'
import '../App.css';
import axios from 'axios';

const Tags = (props) => {

    const [tags, setTags] = useState(props.gift.tags.split(" "))

    return(
        <>
        <div className='tags-container'>
        {tags.map((tag)=>{
            return(
            <p className='tag-box'>{tag}</p>
            )
        })}
        </div>
        </>
    )

}

export default Tags