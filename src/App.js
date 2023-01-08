import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Components

import Edit from './components/Edit'
import Nav from './components/Nav';
import UserSearch from './components/UserSearch';
import Tags from './components/Tags';
import Welcome from './components/Welcome'
import SearchBar from './components/SearchBar';
import OtherUserPage from "./components/OtherUserPage";
import Friends from "./components/Friends"


const App = () => {
  let [gifts, setGifts] = useState([]);
  let [user, setUser] = useState({});
  let [searchResults, setSearchResults] = useState({})
  let [searchParams, setSearchParams] = useState({})
  let [beenPurchased, setBeenPurchased] = useState(gifts.been_purchase);
  let [onSale, setOnSale] = useState(gifts.link);
  let [pageState, setPageState]= useState("")
  let [otherUser, setOtherUser]= useState("")
  const [userRelationships, setUserRelationships] = useState(user)

  const getGifts = () => {
    axios
      .get("https://wshlstapi.herokuapp.com/api/gifts")
      .then(
        (response) => {
        if (pageState==="my-gifts" && user.email) {
          let myList = response.data.filter(gift => {return gift.posted_by.toLowerCase()===user.username.toLowerCase()}) 
          setGifts(myList)
        } else if (pageState === "user-gifts" && user.email) {
          let myList = response.data.filter(gift => {return gift.posted_by.toLowerCase()===otherUser.toLowerCase()}) 
          setGifts(myList)
        } else if (pageState === "user-friends" && user.email) {
          let myList = response.data.filter(gift => {return gift.posted_by.toLowerCase()===otherUser.toLowerCase()})
          setGifts(myList)
        } else {
          setGifts(response.data)
        }
        },
        (err) => console.error(err)
      )
      .catch((error) => console.error(error));
  };

  const handleCreate = (addGift) => {
    console.log(addGift);
    console.log(user);
    axios.post("https://wshlstapi.herokuapp.com/api/gifts", addGift).then((response) => {
      console.log(response);
      getGifts();
    });
  };

  const handleDelete = (event) => {
    axios
      .delete("https://wshlstapi.herokuapp.com/api/gifts/" + event.target.value)
      .then((response) => {
        getGifts();
      });
  };

  const handleUpdate = (editGift) => {
    console.log(editGift);
    axios
      .put("https://wshlstapi.herokuapp.com/api/gifts/" + editGift.id, editGift)
      .then((response) => {
        getGifts();
      });
  };

  const purchaseChange = (gift) => {
    let purchaseToggle = { ...gift, been_purchase: !gift.been_purchase };
    console.log(gift.been_purchase);
    axios
      .put("https://wshlstapi.herokuapp.com/api/gifts/" + gift.id, purchaseToggle)
      .then((response) => {
        getGifts();
      });
  };

  const handleRibbonClick = (beenPurchased, id) => {
    setGifts(
      gifts.map((gift) => {
        if (gift.id === id) {
          return {
            ...gift,
            been_purchase: !beenPurchased,
          };
        }
        return gift;
      })
    );
  };

  const handleOnSale = (id) => {
    setGifts(
      gifts.map((gift) => {
        if (gift.id === id) {
          return {
            ...gift,
            on_sale: !onSale,
          };
        }
        return gift;
      })
    );
  };

  const findUserGifts = (thisUser) => {
    setPageState("user-gifts")
    setOtherUser(thisUser)
  }

  const getFollowRelationships = () => {
    axios
        .get(`https://wshlstapi.herokuapp.com/api/followers/${user.id}`)
        .then(
            (res) => {
                setUserRelationships(res.data)
            }
        )
}

  useEffect(() => {
    getGifts();
    getFollowRelationships();
  }, [pageState]);

  
  return (
    <>

      <Nav user={user} setUser={setUser} handleCreate={handleCreate} setPageState={setPageState} />
      {user.username === undefined ? 
        <Welcome />
        :
        <>
        <div className='spacer'></div>
       
        {pageState ==="my-gifts" && user.email ? <h1 className='my-gifts-header'>MY WISHLIST</h1> : null}
        {pageState ==="user-gifts"&& user.email ? <OtherUserPage user={user} otherUser={otherUser} setOtherUser={setOtherUser} setPageState={setPageState} getFollowRelationships={getFollowRelationships} userRelationships={userRelationships}/> : null} 
        {pageState ==="all-gifts" ? <SearchBar gifts={gifts} setGifts={setGifts} setOtherUser={setOtherUser} otherUser={otherUser} pageState={pageState} setPageState={setPageState}/> : null}
        {pageState ==="user-friends" && user.email ? <Friends user={user} findUserGifts={findUserGifts} setPageState={setPageState} getFollowRelationships={getFollowRelationships} userRelationships={userRelationships}/> : null}

      { pageState !== "user-friends" && user.email ?
        <>
        <div className="gifts">
          {gifts.map((gift) => {
            return (
              <div className="gift" key={gift.id}>
                <div>
                  <p className="user" onClick={()=>{findUserGifts(gift.posted_by)}}>{gift.posted_by}</p>
                </div>
                <img className="picture" src={gift.gift_picture} />

                <Tags gift={gift} />

                <hr class="style-one"></hr>
                <h4>{gift.gift_name}</h4>

                <h5>${gift.gift_price}</h5>

                <div
                  className={`sale ${
                    gift.on_sale ? "purchased" : "not-purchased"
                  }`}
                  onClick={() => handleOnSale(gift.on_sale, gift.id)}
                >
                  {gift.on_sale ? (
                    <p className="onSale">
                      <a href={gift.link} class="alert-link">
                        Item on Sale
                      </a>
                    </p>
                  ) : (
                    <p className="notOnSale">
                      <a href={gift.link} class="alert-link">
                        Item at Full Price.
                      </a>{" "}
                    </p>
                  )}
                </div>
                <div
                  className={` ${ gift.been_purchase
                        ? "ribbon-2 purchased"
                        : "ribbon-2 not-purchased"
                  }`}
                  onClick={() => handleRibbonClick(gift.been_purchase, gift.id)}
                >
                    {gift.been_purchase ? (
                      <p className="ribb purchased">Purchased</p>
                    ) : (
                      <p className="ribb not-purchased">Not Purchased</p>
                    )}
                </div>

                {user.username === gift.posted_by ? (
                  <button
                    className="delete"
                    onClick={handleDelete}
                    value={gift.id}
                  >
                    {" "}
                    X{" "}
                  </button>
                ) : null}

                <div className="edit">
                  <Edit handleUpdate={handleUpdate} gift={gift} user={user} />
                </div>
              </div>
                  );
                })}
            </div>
            </>
            
          :
          null
          }
          </>
        }
        
    </>
  )
  
}

export default App;
