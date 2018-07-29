import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userAuthActions } from './../../store/actions/userAction';
import { loginUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';
import Card from '@material-ui/core/Card';
import './index.css'

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated) {
      this.props.history.push('/dashboard');
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  }

  render() {
    const { errors } = this.state;

    return (
      <Card className="login-form-container fade-in">
        <h1 className="display-4 text-center">Log In</h1>
        <p className="lead text-center">Sign in to your Secured.fyi account</p>
        <form onSubmit={this.onSubmit}>
          <TextFieldGroup
            placeholder="Email Address"
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.onChange}
            error={errors.email}
          />

          <TextFieldGroup
            placeholder="Password"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.onChange}
            error={errors.password}
          />

          <input type="submit" className="btn btn-info btn-block mt-4" />
        </form>
      </Card>
    );
  }
}

Login.propTypes = {
  isError: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  loginUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.userAuth.isAuthenticated,
  isError: state.userAuth.isError,
  error: state.userAuth.error
});

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (userObj) => dispatch(userAuthActions.signin(userObj))
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
