import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { Redirect, Link } from "react-router-dom";
import { read } from "./apiUser";
import DeleteUser from "./DeleteUser"
import profileImg from "../images/alias.jpeg";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      redirectToSignin: false
    };
  }

  init = userId => {
    const token = isAuthenticated().token;
    read(userId, token).then(data => {
      if (data.error) {
        this.setState({ redirectToSignin: true });
      } else {
        this.setState({ user: data });
      }
    });
  };

  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.init(userId);
  }

  componentWillReceiveProps(props) {
    const userId = this.props.match.params.userId;
    this.init(userId);
  }

  render() {
    const { redirectToSignin, user } = this.state;
    if (redirectToSignin) return <Redirect to="/signin" />;
    const photoUrl = user._id?`${process.env.REACT_APP_API_URL}/user/photo/${user._id}?${new Date().getTime()}`: profileImg

    return (
      <div className="container text-center">
        <h2 className="mt-5 mb-5">Profile</h2>
        <div className="row">
          <div className="col-md-6">
          <img 
            style={{height: "200px", width:"auto"}} 
            className='img-thumbnail' 
            src={photoUrl}
            onError={i => (i.target.src = `${profileImg}`)} 
            alt={user.name}/>
          </div>
          <div className="col-md-6">
            <div className="lead mt-5 ml-5">
            <p>Hello {user.name}</p>
            <p>Email: {user.email}</p>
            <p>{`Joined ${new Date(
              this.state.user.created
            ).toDateString()}`}</p>
            {isAuthenticated().user && isAuthenticated().user._id === user._id && (
              <div className="d-inline-block mt-5">
                <Link
                  className="btn btn-raised btn-success mr-5"
                  to={`/user/edit/${user._id}`}
                >
                  Edit Profile
                </Link>
                <DeleteUser userId={user._id}/>
            </div>
            )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
