import React from "react";
import {Redirect} from 'react-router-dom'
import {signin, authenticate} from '../auth/'


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
    signin(user)
    .then(data => {
      if (data.error) {
        console.log('Signed in failed', data.error)
        this.setState({ error: data.error, loading: false})
      }
      else {
        //authenticate
        authenticate(data, () => {
          this.setState({redirectToReferer: true})
        })

         console.log('Signed in successfully')
      }
          
    });
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
    if(redirectToReferer) {
      return <Redirect to='/' />
    }
    return (
      <div className="container mt-2">
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
