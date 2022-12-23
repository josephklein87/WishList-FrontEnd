import React, { useState, useEffect } from 'react'

//only need props as a param if we are passing in props to this component (we are going to here).
const Add = (props) => {
  let emptyWishList = { gift_picture: '', gift_name: '', gift_price: '', on_sale: false, link: '', tags: '', been_purchase: false}
  const [wishList, setWishList] = useState(emptyWishList)

  const handleChange = (event) => {
    setWishList({ ...wishList, [event.target.name]: event.target.value })
  }
  
  const handleSubmit = (event) => {
    event.preventDefault()
    props.handleCreate(wishList)
  }
  
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="gift_picture">Image URL: </label>
        <input type="text" name="gift_picture" value={wishList.gift_picture} onChange={handleChange}/>
        <br />
        <br />
        <label htmlFor="gift_name">Gift name: </label>
        <input type="text" name="gift_name" value={wishList.gift_name} onChange={handleChange}/>
        <br />
        <br />
        <label htmlFor="gift_price">Price: </label>
        <input type="number" name="gift_price" value={wishList.gift_price} onChange={handleChange}/>
        <br />
        <br />
        <label htmlFor="on_sale">Is it on sale?: </label>
        <input type="checkbox" name="on_sale" value={wishList.on_sale} onChange={handleChange}/>
        <br />
        <br />
        <label htmlFor="tags">Tags/Categories: </label>
        <input type="text" name="tags" value={wishList.tags} onChange={handleChange}/>
        <br />
        <br />
        <label htmlFor="link">Link to Purchase: </label>
        <input type="text" name="link" value={wishList.link} onChange={handleChange}/>
        <br />
        <br />
        <label htmlFor="been_purchase">Purchased?: </label>
        <input type="checkbox" name="been_purchase" value={wishList.been_purchase} onChange={handleChange}/>
        <br />
        <br />
        <input type="submit"/>
      </form>
    </>
  )
}

export default Add