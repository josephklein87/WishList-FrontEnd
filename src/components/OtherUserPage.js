import React, { useState, useEffect } from 'react'
import '../App.css';
import axios from 'axios';
import { AiFillCheckCircle } from 'react-icons/ai'

const OtherUserPage = (props) => {
    const [otherUserID, setOtherUserID] = useState()
    const [relationshipID, setRelationshipID] = useState()
    const [otherUserBirthday, setOtherUserBirthday] = useState("")

    const addFriend = {user: props.user.id, following: otherUserID}


    const getOtherUserID = () => {
        axios
          .get(`https://wshlstapi.herokuapp.com/api/useraccount`)
          .then(
            (res) => {
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].username == props.otherUser) {
                        setOtherUserID(res.data[i].id)
                        setOtherUserBirthday(res.data[i].birthday)
                    }
                }
            },
            (err) => console.error(err)
          )
          .catch((error) => console.error(error));
      }

    const createFriendship = () => {
        axios.post("https://wshlstapi.herokuapp.com/api/follow", addFriend).then((response) => {
        console.log(response);
        setRelationshipID(response.data.id)
        });
    }

    const getRelationshipID = () => {
        axios
            .get("https://wshlstapi.herokuapp.com/api/follow")
            .then(
                (res) => {
                    for (let i = 0; i < res.data.length; i++) {
                        if (res.data[i].user == props.user.id && res.data[i].following == otherUserID) {
                            setRelationshipID(res.data[i].id)
                            console.log(relationshipID)
                        }
                    }
                }
            )
    }

    const deleteFriendship = () => {
        axios
            .delete(`https://wshlstapi.herokuapp.com/api/follow/${relationshipID}`)
            .then((res) => {
                console.log(relationshipID)
                props.getFollowRelationships()
            })
    }
    
    useEffect(() => {
        getRelationshipID()
    }, [otherUserID]);

    useEffect(() => {
        getOtherUserID()
    }, [props.otherUser]);

    useEffect(() => {
        props.getFollowRelationships()
    }, [relationshipID]);

    return (
        <>
        <div className='other-user-page-header'>
            <h1 className="my-gifts-header">{props.otherUser}'s Wishlist</h1>
            <h2 className="other-user-birthday">Birthday: {otherUserBirthday}</h2>
            <div className='other-user-page-buttons-container'>
                {props.userRelationships.following_list.indexOf(props.otherUser) >= 0 ?
                <button className='btn btn-outline-secondary' onClick={deleteFriendship}> FRIENDS <AiFillCheckCircle id='friends-check-icon' size={'1em'}/></button>
                :
                <button className='btn btn-secondary' onClick={createFriendship}>ADD FRIEND</button>
                }   
                <button className='btn btn-secondary' onClick={()=>{props.setPageState("all-gifts")}}>BACK TO SEARCH</button>
            </div>
        </div>
        </>
    )



}

export default OtherUserPage