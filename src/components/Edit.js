import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "../App.css";

const Edit = (props) => {
  const [show, setShow] = useState(false);
  const [gift, setGift] = useState({ ...props.gift });

  
    const handleChange = (event) => {
        if (event.target.type !== "checkbox") {
        setGift({ ...gift, [event.target.name]: event.target.value })
        }else {
        setGift({ ...gift, [event.target.name]: event.target.checked })   
        }
    }
    
    const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleUpdate(gift);
    handleClose();
  };

    return (
        <>
            {props.user.username === props.gift.posted_by ?
             <>
             <Button variant="primary" onClick={handleShow}>
               Edit Gift
             </Button>
       
             <Modal show={show} onHide={handleClose}>
               <Modal.Header closeButton>
                 <Modal.Title>Edit Gift</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                 <form className="edit-form" onSubmit={handleSubmit}>
                 <label htmlFor="gift_picture">Image URL: </label>
                   <br />
                   <input
                     className="url"
                     type="text"
                     name="gift_picture"
                     value={gift.gift_picture}
                     onChange={handleChange}
                   />
                   <br />
                   <br />
                   <label htmlFor="gift_name">Gift Name: </label>
                   <br />
                   <input
                     className="gift-name"
                     type="text"
                     name="gift_name"
                     value={gift.gift_name}
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
                     value={gift.gift_price}
                     onChange={handleChange}
                   />
                   <br />
                   <br />
                   <label htmlFor="on_sale">Is It On Sale?: </label>
                   <br />
                   <input
                     type="checkbox"
                     name="on_sale"
                     value={gift.on_sale}
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
                     value={gift.tags}
                     onChange={handleChange}
                   />
                   <br />
                   <br />
                   <label htmlFor="link">Link to Purchase: </label>
                   <br />
                   <input
                     className="link"
                     type="text"
                     name="link"
                     value={gift.link}
                     onChange={handleChange}
                   />
                   <br />
                   <br />
                   <input className="add-gift" variant="primary" type="submit" value="Save Changes"/>
                 </form>
               </Modal.Body>
               {/* <Modal.Footer>
               </Modal.Footer> */}
             </Modal>
           </>
            :
            null
        }
        </>
    )
    }

  

export default Edit;
