import React, { Component } from "react";
import { isAuthenticated } from "../auth/";
import {remove} from './apiUser'
import {signout} from '../auth/'
import {Redirect} from 'react-router-dom'

export default class DeleteUser extends Component {
  state={
    redirect: false
  }
  deleteAccount = () => {
    const token = isAuthenticated().token;
    const userId = this.props.userId
    remove(userId, token)
    .then(data=> {
      if(data.error) {
        console.log(data.error)
      } else {
        signout(() => console.log("User is deleted"))
        this.setState({
          redirect: true
        })
      }
    })
  }

  deleteConfirmed=() => {
    let answer = window.confirm("Are you sure, you want to delete your account?")
    if(answer) {
      this.deleteAccount()
    }
  }
  render() {
    if(this.state.redirect) {
      return <Redirect to="/"/>
    }
    return (
      <button 
      className="btn btn-raised btn-danger"
      onClick={this.deleteConfirmed}
      >
        Delete Profile
      </button>
    );
  }
}
