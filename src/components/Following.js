import React, { useState} from "react";
import axios from "axios";

const Following = (props) => {
    const [isFollowing, setFollowing] = useState([])
    const [followers, setFollowers] = useState([])

    const getFollowing = () => {
        axios
          .get(`https://wshlstapi.herokuapp.com/api/followers/${props.user.id}`)
          .then(
            (res) => {
                console.log(res.data)
                setFollowing(res.data.following_list)
                setFollowers(res.data.followers_list)
            },
            (err) => console.error(err)
          )
          .catch((error) => console.error(error));
      };

    const showData = () => {
        console.log(isFollowing)
        console.log(followers)
    }

    return(
        <>
        <h1>Friends</h1>
        <button onClick={getFollowing}>{props.user.username}</button>
        <button conClick={showData}>Hi</button>
        </>
    )
}

export default Following