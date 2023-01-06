import React, { useState, useEffect } from 'react'
import '../App.css';
import axios from 'axios';

const SearchBar = (props) => {

    let [search, setSearch] = useState("")
    let [searchOption, setSearchOption] = useState('gifts')
    // let [giftsSearch, setGiftsSearch] = useState({})
    let [searchList, setSearchList] = useState({})

    const giftListFull = () => {
        axios
          .get("http://localhost:8000/api/gifts")
          .then(
            (response) => setSearchList(response.data),
            (err) => console.error(err)
          )
          .catch((error) => console.error(error));
      };


    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const handleOption = (e) => {
        setSearchOption(e.target.value)
    }

    const searchFilter = (e) => {
        e.preventDefault();
        let searchInputLower = search.toLowerCase()
        console.log(searchInputLower);
        if (searchOption === "gifts") {
           let itemSearch = searchList.filter(gift => {return gift.tags.toLowerCase().includes(searchInputLower) || gift.gift_name.toLowerCase().includes(searchInputLower)})
            props.setGifts(itemSearch)
        } else {
           let userSearch = searchList.filter(gift => {return gift.posted_by.toLowerCase()===searchInputLower}) 
            props.setGifts(userSearch)
        }
    }

    const clearSearch = () =>{
        props.setGifts(searchList)
    }

    useEffect(() => {
        giftListFull();
      }, []);
    

    
    return (

        <>
        <div className='search-container'>
        <form onSubmit={searchFilter} className='searchbar'>
            <select name="search-select" className='select-dropdown' onChange={handleOption}>
                <option value='gifts'>Gifts</option>
                <option value='users'>Users</option>
            </select>
            <input className='form-control search-input' type="text" placeholder='Search Here' onChange={handleSearch}></input>
            <div className='button-div'>
                <input className='btn btn-secondary search-button' type="submit" value="Search" />
                <button type="button" className='btn btn-secondary clear-search-button' onClick={clearSearch}>Clear</button>
            </div>
        </form>
        
        </div>
        </>

    )

}

export default SearchBar