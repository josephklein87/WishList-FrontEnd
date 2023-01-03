import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Add from "./components/Add";
import Edit from "./components/Edit";
import Nav from "./components/Nav";

const App = () => {
  let [gifts, setGifts] = useState([]);
  let [user, setUser] = useState({});

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

  useEffect(() => {
    getGifts();
  }, []);

  return (
    <>
        <Nav user={user} setUser={setUser} />
          <div className="ribbon-1 left">Wshlst</div>
        <Add handleCreate={handleCreate} />
        <div className="gifts">
          {gifts.map((gift) => {
            return (
              <div className="gift" key={gift.id}>
                <img src={gift.gift_picture} />
                <h4>{gift.gift_name}</h4>
                <h5>Price: {gift.gift_price}</h5>
                <a href={gift.link}>Link to Purchase</a>
                {/* <div className='tags'>
                {gift.tags.map((tag)=> {
                  <p>{tag}</p>
                })}
              </div> */}<div className="box">
          <div className="ribbon-2">{gift.been_purchase ? <p>Purchased</p> : <p>Not Purchased</p>}</div>
          </div>
                <button className="btn" onClick={handleDelete} value={gift.id}>
                  {" "}
                  X{" "}
                </button>
                <Edit handleUpdate={handleUpdate} gift={gift} />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default App;
