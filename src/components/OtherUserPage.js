import React, { useState, useEffect } from 'react'
import '../App.css';
import axios from 'axios';

const OtherUserPage = (props) => {


    return (
        <>
        <div className='other-user-page-header'>
            <h1 className="my-gifts-header">{props.otherUser.toUpperCase()}'S WISHLIST</h1>
            <div className='other-user-page-buttons-container'>
                <button className='btn btn-secondary'>ADD FRIEND</button>
                <button className='btn btn-secondary' onClick={()=>{props.setPageState("all-gifts")}}>BACK TO SEARCH</button>
            </div>
        </div>
        </>
    )



}

export default OtherUserPage