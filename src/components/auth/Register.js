import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { userAuthActions } from '../../store/actions/userAction';
import TextFieldGroup from '../common/TextFieldGroup';
import { Alert } from '../common/Alert';

import './index.css'
class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      error:''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isError) {
      this.setState({ error: nextProps.error });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    // this.props.registerUser(newUser, this.props.history);
    this.props.registerUser(newUser);

  }

  render() {
    const { error } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto fade-in signup-form-container">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your Secured.fyi account
              </p>
              <Alert type="danger" isError={this.props.isError} errorMessage={this.state.error}/>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
        
                />
                <TextFieldGroup
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                />
                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder="Confirm Password"
                  name="password2"
                  type="password"
                  value={this.state.password2}
                  onChange={this.onChange}
  
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.string,
  isError: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  auth: state.userAuth,
  error: state.userAuth.error,
  isError: state.userAuth.isError
});

const mapDispatchToProps = (dispatch) => {
  return {
    registerUser : (useObj) => dispatch(userAuthActions.signup(useObj))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Register));
