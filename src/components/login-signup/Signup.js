import React from "react";
import { ModalBody } from "reactstrap";

class Signup extends React.Component {
  state = {
    username: "",
    password: "",
    email: "",
    password_confirmation: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <>
        <ModalBody>
          <form onSubmit={(e) => this.props.handleSignUp(e, this.state)}>
            <input
              type="text"
              onChange={this.handleChange}
              value={this.state.username}
              name="username"
              placeholder="username"
            ></input>
            <input
              type="text"
              onChange={this.handleChange}
              name="email"
              placeholder="Email"
              value={this.state.email}
            />
            <input
              type="password"
              onChange={this.handleChange}
              value={this.state.password}
              name="password"
              placeholder="Password"
            ></input>
            <input
              type="password"
              onChange={this.handleChange}
              name="password_confirmation"
              placeholder="Password Confirmation"
              value={this.state.password_confirmation}
            />
          </form>
          <br />
          <button
            color="primary"
            onClick={(e) => this.props.handleSignUp(e, this.state)}
          >
            Create an Account
          </button>{" "}
        </ModalBody>
      </>
    );
  }
}
export default Signup;
