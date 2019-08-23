import React, { Component } from "react";
import { listUsers } from "./apiUser";
import profileImg from '../images/alias.jpeg'
import { Link } from 'react-router-dom'

export default class User extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    listUsers().then(data => {
      console.log(data);
      if(data.error) {
        console.log(data.error);
      } else {
        this.setState({ users: data });
      }
    });
  }

  renderUsers = users => (
    <div className="p-2 row">
      {users.map((user, i) => (
        <div className="card col-md-3 m-4 text-center" key={i} >
          <img 
            style={{ height: "200px", width: "auto" }} 
            className='img-thumbnail' 
            src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`} 
            onError={i => (i.target.src = `${profileImg}`)}
            alt={users.name}
            />
          {/* style={{width: '100%', height: '20vh', objectFit: 'cover'}} /> */}
          <div className="card-body">
            <h5 className="card-title">{user.name}</h5>
            <p className="card-text">
              {user.email}
            </p>
            <Link to={`user/${user._id}`} className="btn btn-raised btn-primary">
              View Profile
            </Link>
          </div>
        </div>
      ))}
    </div>
  );

  render() {
    const { users } = this.state;
    console.log(users);
    return (
      <div className="container">
        <h2 className="my-5">Users:</h2>
        {this.renderUsers(users)}
      </div>
    );
  }
}
