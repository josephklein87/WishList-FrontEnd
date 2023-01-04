import React, { useState } from 'react'
import '../App.css';
import axios from 'axios';
import { AiFillGift } from 'react-icons/ai'

import Add from './Add';

const Nav = (props) => {
    let [createUser, setCreateUser] = useState({})
    let [error, setError] = useState('')

    let loginModal = document.getElementById('loginModal')


    const handleUserCreate = (e) => {
        e.preventDefault();
        let userObj = {
          email: createUser.email,
          password: createUser.password,
          username: createUser.username
        }
        axios.post(
          'http://localhost:8000/api/useraccount',
          userObj
        ).then((res)=>{
          props.setUser(res.data)
          setCreateUser('')
          document.getElementById('signupClose').click()
        })
      }

      const handleUserLogin = (e) => {
        e.preventDefault();
        let userObj = {
          email: createUser.email,
          password: createUser.password,
          username: createUser.username
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
                document.getElementById('loginClose').click()
            }
          //   setAccountCreated(true)
          })
      }

      const handleChange = (event) => {
        setCreateUser({ ...createUser, [event.target.name]: event.target.value })
      }

      const handleLogOut = () => {
        props.setUser({})
      }

    return(
    <>
      <div className='navbar navbar-expand-lg fixed-top'>
        <div className='container-fluid'>
          <div className='nav-brand'>
            <AiFillGift className='gift-icon' size={'2em'}/>
            <h1 id='navTitle'>WSHLST</h1>
          </div>
                {(props.user.email) ? 
                  <div className='d-flex pe-3'>
                    <Add handleCreate={props.handleCreate} user={props.user} />
                    <div className='dropdown'>
                        <button className='btn btn-light dropdown-toggle' type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                          {props.user.username}
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                          <li><a className='dropdown-item' onClick={handleLogOut}>Log Out</a></li>
                        </ul>
                    </div>
                  </div>
                    :
                <div className='d-flex pe-2 pt-1'>
                  <button type="btn" class="btn nav-btn" data-bs-toggle="modal" data-bs-target="#loginModal">
                    LOGIN
                  </button>
                  <button type="btn" class="btn nav-btn" data-bs-toggle="modal" data-bs-target="#signupModal">
                    CREATE ACCOUNT
                  </button>
                </div>
            }
        </div>
      </div>
      {/* Login Modal */}
      <div className='modal fade' id='loginModal' tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h3 class="modal-title" id="exampleModalLabel">Login</h3>
              <button type="button" id='loginClose' class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form onSubmit={handleUserLogin} className='account-form'>
                <div className='mb-3'>
                  <label className='form-label' htmlFor="email">Email </label>
                  <input className='form-control' type="text" name="email" onChange={handleChange}/>
                </div>
                <div className='mb-3'>
                  <label className='form-label' htmlFor="password">Password </label>
                  <input className='form-control' type="password" name="password" onChange={handleChange}/>
                  <div id="passwordHelpBlock" class="form-text">
                    {error}
                  </div>
                </div>
                <div className='d-flex justify-content-end'>
                  <button className='btn' type="submit">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Signup Modal */}
      <div className='modal fade' id='signupModal' tabindex="-1" aria-labelledby="signupModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h3 class="modal-title" id="exampleModalLabel">Create an Account</h3>
              <button type="button" id='signupClose' class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form onSubmit={handleUserCreate} className='account-form'>
                <div className='mb-3'>
                  <label className='form-label' htmlFor="email">Email </label>
                  <input className='form-control' type="text" name="email" onChange={handleChange}/>
                </div>
                <div className='mb-3'>
                  <label className='form-label' htmlFor="username">Username </label>
                  <input className='form-control' type="text" name="username" onChange={handleChange}/>
                </div>
                <div className='mb-3'>
                  <label className='form-label' htmlFor="password">Password </label>
                  <input className='form-control' type="password" name="password" onChange={handleChange}/>
                  <div id="passwordHelpBlock" class="form-text">
                    {error}
                  </div>
                </div>
                <div className='d-flex justify-content-end'>
                  <button className='btn' type="submit">Create</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </>
    )
}

export default Nav