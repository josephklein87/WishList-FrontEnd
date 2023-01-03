import React, { useState } from 'react'
import '../App.css';
import axios from 'axios';

const Nav = (props) => {
    let [loginModal, setLoginModal] = useState(false)
    let [createAccountModal, setCreateAccountModal] = useState(false)
    let [createUser, setCreateUser] = useState({})
    let [error, setError] = useState('')

    const handleUserCreate = (e) => {
        e.preventDefault();
        let userObj = {
          email: createUser.email,
          password: createUser.password
        }
        axios.post(
          'http://localhost:8000/api/useraccount',
          userObj
        ).then((res)=>{
          setCreateUser('')
        //   setAccountCreated(true)
        })
      }

      const handleUserLogin = (e) => {
        e.preventDefault();
        let userObj = {
          email: createUser.email,
          password: createUser.password
        }
        axios.put(
            'http://localhost:8000/api/useraccount/login',
            userObj
          ).then((res)=>{
            console.log(res)
            if (res.data.error === "password") {
                setError("Password doesn't match")
            } else if (res.data.error === "email") {
                setError("Email doesn't exist in database")
            } else {
                props.setUser(res.data)
                setCreateUser("")
                toggleLoginModal()
            }
          //   setAccountCreated(true)
          })
      }


      const handleChange = (event) => {
        setCreateUser({ ...createUser, [event.target.name]: event.target.value })
      }

      const toggleCreateAccountModal = () => {
        setCreateAccountModal(!createAccountModal)
      }

      const toggleLoginModal = () => {
        setLoginModal(!loginModal)
      }

      const handleLogOut = () => {
        props.setUser({})
      }

    return(
    <>
    <div className='navbar'>
    <h1>WSHLST</h1>
            {(props.user.email) ? 
                <ul className='nav-ul'>
                    <li className='nav-links'>logged in: {props.user.email}</li>
                    <li className='logout-btn nav-links' onClick={handleLogOut}>LOGOUT</li>
                </ul>
                :
            <ul className='nav-ul'>
            <li className='nav-links' onClick={toggleLoginModal}>LOGIN</li>
            <li className='nav-links'onClick={toggleCreateAccountModal}>CREATE ACCOUNT</li>
            </ul>
        }
    </div>

    {loginModal ? 
    <div className='login-modal-outer'>
    <form onSubmit={handleUserLogin} className='account-form'>
        <p onClick={toggleLoginModal} className="close-modal">X</p>
        <h1>Login to Account</h1>
        <label htmlFor="email">Email </label>
        <br />
        <input type="text" name="email" onChange={handleChange}/>
        <br />
        <br />
        <label htmlFor="password">Password </label>
        <input type="password" name="password" onChange={handleChange}/>
        <br />
        <input type="submit"/>
        <p>{error}</p>
    </form>
    </div>
    :
    null
    }

{createAccountModal ? 
    <div className='login-modal-outer'>
    <form onSubmit = {handleUserCreate} className='account-form'>
        <p onClick={toggleCreateAccountModal} className="close-modal">X</p>
        <h1>Create Account</h1>
        <label htmlFor="email">Email </label>
        <br />
        <input type="text" name="email" onChange={handleChange}/>
        <br />
        <br />
        <label htmlFor="password">Password </label>
        <input type="password" name="password" onChange={handleChange}/>
        <br />
        <input type="submit"/>
    </form>
    </div>
    :
    null
    }


    </>
    )
}

export default Nav