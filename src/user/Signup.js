import React, { Component } from "react";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
        name: "",
        email: "",
        password: "",
        error: "",
        open: false,
        recaptcha: false
    };
}
handleChange = name => event => {
  this.setState({ error: "" });
  this.setState({ [name]: event.target.value });
}

clickSubmit = event => {
  event.preventDefault()
  const { name, email, password } = this.state;
  const user = {
    name,  // it was meant like name: name , but save identification so 
    email,
    password
  };
 //console.log(user);
    fetch("http://localhost:8080/signup", {
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
}

  render() {
    const {name, email, password} = this.state
    return (
      <div className='container'>
      <h2> Signup </h2>
      <form>
      <div className="form-group">
          <label className="text-muted">Name</label>
          <input
              onChange={this.handleChange("name")}
              type="text"
              className="form-control"
              value={name}
          />
      </div>
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

      {/* <div className="form-group">
          <label className="text-muted">
          </label>

          <input
              type="text"
              className="form-control"
          />
      </div> */}

      <button
          onClick={this.clickSubmit}
          className="btn btn-raised btn-primary"
      >
          Submit
      </button>
  </form>
  </div>
    )
  }
}

export default Signup;
