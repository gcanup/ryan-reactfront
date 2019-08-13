import React from "react";
import {Redirect} from 'react-router-dom'


class Signin extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: "",
      redirectToReferer: false,
      loading: false
    };
  }
  handleChange = name => event => {
    this.setState({ error: ""});
    this.setState({ [name]: event.target.value });
  };

  authenticate = (jwt) => {
    if(typeof window !== "undefined") {
      localStorage.setItem("jwt", JSON.stringify(jwt))
      this.setState({redirectToReferer: true})
  }
}

  clickSubmit = event => {
    event.preventDefault()
    this.setState({
      loading: true
    })
    const { email, password } = this.state;
    const user = {// it was meant like name: name , but save identification so
      email,
      password
    };
    console.log(user)
    this.signin(user)
    .then(data => {
      if (data.error) {
        console.log('Signed in failed', data.error)
        this.setState({ error: data.error, loading: false})
      }
      else {
        //authenticate
        this.authenticate(data)
         console.log('Signed in successfully')
      }
          
    });
  };

  signin = user => {
    return fetch("http://localhost:8080/signin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };

  signinForm = (email, password) => 
      <form>
        <div className="form-group">
          <label className="text-muted">Email</label>
          <input
            onChange={this.handleChange("email")}
            type="email"
            className="form-control"
            value={email}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Password</label>
          <input
            onChange={this.handleChange("password")}
            type="password"
            className="form-control"
            value={password}
          />
        </div>
        <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
          Submit
        </button>
      </form>

  render() {
    const { email, password, error, redirectToReferer, loading } = this.state;
    console.log(redirectToReferer, loading)
    if(redirectToReferer) {
      return <Redirect to='/' />
    }
    return (
      <div className="container">
        <h2> Sign In </h2>
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
        {loading? <div className='jumborton text-center'> <h2>Loading</h2> </div>: '' }
        {this.signinForm(email, password)}
      </div>
    );
  }
}

export default Signin;
