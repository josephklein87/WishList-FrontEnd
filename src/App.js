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
import SearchBar from './components/SearchBar';

const App = () => {
  let [gifts, setGifts] = useState([]);
  let [user, setUser] = useState({});
  let [searchResults, setSearchResults] = useState({});
  let [searchParams, setSearchParams] = useState({});
  let [beenPurchased, setBeenPurchased] = useState(gifts.been_purchase);
  let [onSale, setOnSale] = useState(gifts.link);
  let [pageState, setPageState]= useState("")


  const getGifts = () => {
    axios
      .get("http://localhost:8000/api/gifts")
      .then(
        (response) => {
        if (pageState=="my-gifts" && user.email) {
          let myList = response.data.filter(gift => {return gift.posted_by.toLowerCase()===user.username}) 
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
    axios.post("http://localhost:8000/api/gifts", addGift).then((response) => {
      console.log(response);
      getGifts();
    });
  };

  const handleDelete = (event) => {
    axios
      .delete("http://localhost:8000/api/gifts/" + event.target.value)
      .then((response) => {
        getGifts();
      });
  };

  const handleUpdate = (editGift) => {
    console.log(editGift);
    axios
      .put("http://localhost:8000/api/gifts/" + editGift.id, editGift)
      .then((response) => {
        getGifts();
      });
  };

  const purchaseChange = (gift) => {
    let purchaseToggle = { ...gift, been_purchase: !gift.been_purchase };
    console.log(gift.been_purchase);
    axios
      .put("http://localhost:8000/api/gifts/" + gift.id, purchaseToggle)
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

  useEffect(() => {
    getGifts();
  }, [pageState]);

  return (
    <>
      <Nav user={user} setUser={setUser} handleCreate={handleCreate} setPageState={setPageState} />
       <div className='spacer'></div>
       
        {pageState =="my-gifts" && user.email ? <h1 className='my-gifts-header'>MY WISHLIST</h1> : null}
        {pageState =="all-gifts" ? <SearchBar gifts={gifts} setGifts={setGifts}/> : null}
        
      <div className="gifts">
        {gifts.map((gift) => {
          return (
            <div className="gift" key={gift.id}>
              <div>
                <p className="user">{gift.posted_by}</p>
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
  );
};

export default App;
