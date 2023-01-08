import React, { useState} from "react";
import axios from "axios";

const Following = (props) => {
    const [isFollowing, setFollowing] = useState([])
    const [followers, setFollowers] = useState([])

    return(
        <>
        <div className='other-user-page-header'>
            <h1 className="my-gifts-header">My Friends</h1>
            <h4>Following</h4>
                {props.userRelationships.following_list.map((following) => {
                    
                    return(
                        <p onClick={() => {props.findUserGifts(following)}}>{following}</p>
                    )
                    })}
            <h4>Followers</h4>
                {props.userRelationships.follower_list.map((follower) => {
                    return(
                        <p onClick={() => {props.findUserGifts(follower)}}>{follower}</p>
                    )
                })}
            <div className='other-user-page-buttons-container mt-4'>
                <button className='btn btn-secondary' onClick={()=>{props.setPageState("all-gifts")}}>BACK TO SEARCH</button>
            </div>
        </div>
        </>
    )
}

export default Following