import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import Card from '@material-ui/core/Card';
import { CompanyAction } from '../../store/actions/index'
import './index.css'

class CreateCompany extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      companyName: '',
      companyId: '',
      contact: '',
      city: '',
      companyDetail: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    // if (nextProps.errors) {
    //   this.setState({ errors: nextProps.errors });
    // }
    if (nextProps.createdCompany && !nextProps.createCompanyLoader && this.props.createCompanyLoader) {
      this.props.history.push('/dashboard')
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const newCompany = {
      company_id: this.state.companyId,
      companyName: this.state.companyName,
      contact: this.state.contact,
      city: this.state.city,
      companyDetail: this.state.companyDetail,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };
    this.props.createCompany(newCompany);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, displaySocialInputs } = this.state;

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div className="swing-in-top-fwd">
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />

          <InputGroup
            placeholder="Facebook Page URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />

          <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />

          <InputGroup
            placeholder="YouTube Channel URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />

          <InputGroup
            placeholder="Instagram Page URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
        </div>
      );
    }

    // Select options for city
    const options = [
      { label: '* Select City', value: 0 },
      { label: 'Karachi', value: 'Karachi' },
      { label: 'Lahore', value: 'Lahore' },
      { label: 'Islamabad', value: 'Islamabad' },
      { label: 'Rawalpindi', value: 'Rawalpindi' }
    ];

    return (
      <Card className="fade-in create-company-container">
        <h1 className="display-4 text-center">Create Your Company</h1>
        <p className="lead text-center">
          Let's get some information to make your company stand out
              </p>
        <small className="d-block pb-3">* = required fields</small>
        <form onSubmit={this.onSubmit}>

          <TextFieldGroup
            placeholder="Company ID"
            name="companyId"
            value={this.state.companyId}
            onChange={this.onChange}
            error={errors.companyId}
            info="A Unique Company Id for you URL"
          />

          <TextFieldGroup
            placeholder="* Company Name"
            name="companyName"
            value={this.state.companyName}
            onChange={this.onChange}
            error={errors.companyName}
            info="A Company Name for Your Identification in our System"
          />

          <SelectListGroup
            placeholder="City"
            name="city"
            value={this.state.city}
            onChange={this.onChange}
            options={options}
            error={errors.city}
            info="Give us a city where your head office"
          />

          <TextFieldGroup
            placeholder="Contact Number"
            name="contact"
            value={this.state.contact}
            onChange={this.onChange}
            error={errors.contact}
            info="Give us your Contact number"
          />

          <TextAreaFieldGroup
            placeholder="Short Detail"
            name="companyDetail"
            value={this.state.companyDetail}
            onChange={this.onChange}
            error={errors.companyDetail}
            info="Tell us a little about your Company"
          />

          <div className="mb-3">
            <button
              type="button"
              onClick={() => {
                this.setState(prevState => ({
                  displaySocialInputs: !prevState.displaySocialInputs
                }));
              }}
              className="btn btn-light"
            >
              Add Social Network Links
                  </button>
            <span className="text-muted">Optional</span>
          </div>
          {socialInputs}
          <input
            type="submit"
            value="Submit"
            className="btn btn-info btn-block mt-4"
          />
        </form>
      </Card>
    );
  }
}

CreateCompany.propTypes = {
};

const mapStateToProps = state => {
  const { CompanyReducer: { createdCompany, createCompanyError, createCompanyLoader } } = state
  return {
    createdCompany, createCompanyError, createCompanyLoader
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createCompany: (company) => dispatch(CompanyAction.createCompany(company))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CreateCompany));
