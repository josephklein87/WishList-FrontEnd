
import React, { useState, useEffect } from 'react'
import './App.css';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'


// Components
import Add from './components/Add'
import Edit from './components/Edit'
import Nav from './components/Nav';
import UserSearch from './components/UserSearch';



const App = () => {
  let [gifts, setGifts] = useState([]);
  let [user, setUser] = useState({});
  let [searchResults, setSearchResults] = useState({})
  let [searchParams, setSearchParams] =useState({})

  const getGifts = () => {
    axios
      .get("http://localhost:8000/api/gifts")
      .then(
        (response) => setGifts(response.data),
        (err) => console.error(err)
      )
      .catch((error) => console.error(error));
  };

  const handleCreate = (addGift) => {
    console.log(addGift);
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
    let purchaseToggle = {...gift, been_purchase: !gift.been_purchase}
    console.log(gift.been_purchase)
    axios
    .put("http://localhost:8000/api/gifts/" + gift.id, purchaseToggle
    )
    .then((response) => {
      getGifts();
    });
  }


  useEffect(() => {
    getGifts();
  }, []);

  return (
    <>
        <Nav user={user} setUser={setUser} />
          {/* <div className="ribbon-1 left">Wshlst</div> */}
        <Add handleCreate={handleCreate} user={user} />
        <div className="gifts">
          {gifts.map((gift) => {
            return (
              <div className="gift" key={gift.id}>
                <img className="picture" src={gift.gift_picture} />
                <h4>{gift.gift_name}</h4>
                <h5>Price: ${gift.gift_price}</h5>
                <a href={gift.link}>Link to Purchase</a>
                <br />
                    <label htmlFor='been_purchase'>Purchased? </label>
                    <input  
                        type="checkbox"
                        name="been_purchase"
                        value={gift.been_purchase}
                        onChange={()=> {purchaseChange(gift)}}
                    />
                <div className="box">
          <div className="ribbon-2">{gift.been_purchase ? <p>Purchased</p> : <p>Not Purchased</p>}</div>
          </div>
          {user.username === gift.posted_by ?
                <button className="delete" onClick={handleDelete} value={gift.id}>
                  {" "}
                  X{" "}
                </button>
          :
          null
          }
                <br/>
                <Edit handleUpdate={handleUpdate} gift={gift} user={user}/>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default App;
