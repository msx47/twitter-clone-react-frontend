import React, { Component } from "react";
import Favicon from "../assets/static/favicon-blue.png";
import "./page-styles/login.css";
import loader from "../assets/static/ajax-loader-blue.gif";
import PropTypes from "prop-types";
import Loader from "../components/Loader";
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";
import { Helmet } from "react-helmet";

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      response: {},
      errors: {},
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.ui.errors) {
      this.setState({ errors: nextProps.ui.errors });
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: this.state.email.trim(),
      password: this.state.password,
    };
    this.props.loginUser(userData, this.props.history);
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  render() {
    const { errors } = this.state;
    const {
      ui: { loading, netError },
    } = this.props;
    return !netError ? (
      <div className="login-wrapper">
        <Helmet>
          <title>Login to Whiner!!</title>
        </Helmet>
        <div className="login-main">
          <div className="login-header">
            <div className="login-logo">
              <img src={Favicon} alt="logo" />
            </div>
            <h3 className="login-h3">Login to Whiner</h3>
          </div>
          <div className="form-wrapper">
            <form
              action="#"
              className="login-form"
              onSubmit={this.handleSubmit}
            >
              <div className="form-control">
                <label htmlFor="email" className="login-label">
                  E-mail
                </label>
                <input
                  type="text"
                  className="register"
                  id="email"
                  onChange={this.handleChange}
                  placeholder="Enter your Email"
                />

                <div className="login-error">
                  {errors.email ? errors.email : null}
                </div>
              </div>
              <div className="form-control">
                <label htmlFor="password" className="login-label">
                  Password
                </label>
                <input
                  type="password"
                  className="register"
                  id="password"
                  onChange={this.handleChange}
                  placeholder="Enter your password"
                />

                <div className="login-error">
                  {errors.password ? errors.password : null}
                </div>
              </div>
              <div className="btn-login">
                {loading ? (
                  <button className="login-button" type="submit">
                    <img src={loader} alt="loading" />
                  </button>
                ) : (
                  <button className="login-button" type="submit">
                    Login
                  </button>
                )}
              </div>
              {errors.error && (
                <div
                  style={{
                    color: "#fff",
                    backgroundColor: "crimson",
                    marginTop: "8px",
                    width: "100%",
                    padding: "8px",
                    textAlign: "center",
                    fontSize: "1.2em",
                  }}
                >
                  Email unverified. Please check your email for verification
                  link.
                </div>
              )}
              <div className="general-error">
                {errors.general ? errors.general : null}
              </div>
              {/* <div className='rickroll'><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Forgot Password</a></div> */}
            </form>
          </div>
        </div>
      </div>
    ) : (
      <Loader flag={true} />
    );
  }
}

Login.propTypes = {
  ui: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.user,
  ui: state.ui,
});

const mapActionsToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapActionsToProps)(Login);
