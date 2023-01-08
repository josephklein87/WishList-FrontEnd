import React, { useState } from 'react'
import '../App.css';

const UserSearch = (props) => {
    let [searchResults, setSearchResults] = useState(props.searchResults)

    return (
        <>
        <h1>results</h1>
        {/* {searchResults.map((results) => {
            return(
                <h1> test</h1>
                // <div className='listed-user'>
                // <p>{results.email}</p>
                // <button>Add Friend</button>
                // </div>
            )
          })} */}
        </>
    )

}

export default UserSearch