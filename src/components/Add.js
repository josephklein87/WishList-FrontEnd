import React, { useState} from "react";
import { Modal, Button } from "react-bootstrap";
import "../App.css";

//only need props as a param if we are passing in props to this component (we are going to here).
const Add = (props) => {
  let emptyWishList = {
    gift_picture: "",
    gift_name: "",
    gift_price: "",
    on_sale: false,
    link: "",
    tags: "",
    been_purchase: false,
  };
  const [wishList, setWishList] = useState(emptyWishList);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (event) => {
    if (event.target.type !== "checkbox") {
    setWishList({ ...wishList, [event.target.name]: event.target.value })
    } else {
    setWishList({ ...wishList, [event.target.name]: event.target.checked })  
    }
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleCreate(wishList);
    setIsOpen(false);
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
    <Button onClick={toggleModal}>Add Gift</Button>
    <Modal show={isOpen} onHide={toggleModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add Gift</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="add-form" onSubmit={handleSubmit}>
          <label htmlFor="gift_picture">Image URL: </label>
          <br />
          <input
            className="url"
            type="text"
            name="gift_picture"
            value={wishList.gift_picture}
            onChange={handleChange}
          />
          <br />
          <br />
          <label htmlFor="gift_name">Gift name: </label>
          <br />
          <input
            className="gift-name"
            type="text"
            name="gift_name"
            value={wishList.gift_name}
            onChange={handleChange}
          />
          <br />
          <br />
          <label htmlFor="gift_price">Price: </label>
          <br />
          <input
            className="gift-price"
            type="number"
            name="gift_price"
            value={wishList.gift_price}
            onChange={handleChange}
          />
          <br />
          <br />
          <label htmlFor="on_sale">Is it on sale?: </label>
          <br />
          <input
            type="checkbox"
            name="on_sale"
            value={wishList.on_sale}
            onChange={handleChange}
          />
          <br />
          <br />
          <label htmlFor="tags">Tags/Categories: </label>
          <br />
          <input
            className="tags"
            type="text"
            name="tags"
            value={wishList.tags}
            onChange={handleChange}/>
            <br />
            <br />
            <label htmlFor="link">Link to Purchase: </label>
            <br />
            <input
              className="link"
              type="text"
              name="link"
              value={wishList.link}
              onChange={handleChange}
            />
            <br />
            <br />
            <label htmlFor="been_purchase">Purchased?: </label>
            <br />
            <input
              type="checkbox"
              name="been_purchase"
              value={wishList.been_purchase}
              onChange={handleChange}
            />
            <br />
            <br />
            <input className="add-gift" type="submit" />
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};


export default Add;
