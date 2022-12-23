import React, { useState } from 'react'

const Edit = (props) => {
    const [gift, setGift] = useState({...props.gift})

    const handleChange = (event) => {
        setGift({ ...gift, [event.target.name]: event.target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.handleUpdate(character)
    }

    return(
        <>
            <details>
                <summary>Edit Gift</summary>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='gift_name'>Gift: </label>
                    <input  
                        type="text"
                        name="gift_name"
                        value={gift.gift_name}
                        onChange={handleChange}
                    />
                    <br />
                    <label htmlFor="gift_picture">Picture: </label>
                    <input  
                        type="text"
                        name="gift_picture"
                        value={gift.gift_picture}
                        onChange={handleChange}
                    />
                    <br />
                    <label htmlFor='gift_price'>Price: </label>
                    <input  
                        type="number"
                        name="gift_price"
                        value={gift.gift_price}
                        onChange={handleChange}
                    />
                    <br />
                    <label htmlFor='on_sale'>On Sale? </label>
                    <input  
                        type="checkbox"
                        name="on_sale"
                        value={gift.on_sale}
                        onChange={handleChange}
                    />
                    <br />
                    <label htmlFor='link'>Link: </label>
                    <input  
                        type="text"
                        name="link"
                        value={gift.link}
                        onChange={handleChange}
                    />
                    <br />
                    <label htmlFor='tags'>Tags: </label>
                    <input  
                        type="text"
                        name="tags"
                        value={gift.tags}
                        onChange={handleChange}
                    />
                    <br />
                    <label htmlFor='been_purchase'>Purchased? </label>
                    <input  
                        type="checkbox"
                        name="been_purchase"
                        value={gift.been_purchase}
                        onChange={handleChange}
                    />
                    <br />
                </form>
            </details>
        </>
    )

}

export default Edit