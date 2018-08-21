import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AddCityDialog from './dialog';
// import SelectListGroup from '../common/SelectListGroup';
import Card from '@material-ui/core/Card';
import { CompanyAction, BusAction } from '../../store/actions/index'
import TextField from '../common/TextField'
import MultiSelectList from '../common/MultiSelectList'
import AddIcon from '@material-ui/icons/Add';
import { Button } from '@material-ui/core';
import './index.css'

class CreateRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routeTitle: '',
      route_id: '',
      city: [],
      aboutRoute: '',
      errors: {},
      open: false,
      cities: [{ label: '* Select City / Stops', value: 0 }]
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.createdCompany && !nextProps.createCompanyLoader && this.props.createCompanyLoader) {
      this.props.history.push('/dashboard')
    }

    if (this.props.cities !== nextProps.cities) {
      this.setState({
        cities: nextProps.cities ? nextProps.cities : []
      })
    }
  }

  componentWillMount() {
    this.props.getCitiesAction()
  }

  componentDidMount() {
    this.setState({
      cities: this.props.cities ? this.props.cities : []
    })
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onSubmit(e) {
    e.preventDefault();

    const newCompany = {
      route_id: this.state.route_id,
      routeTitle: this.state.routeTitle,
      city: this.state.city,
      aboutRoute: this.state.aboutRoute,
    };
    this.props.createCompany(newCompany);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    const { classes } = this.props;
    // Select options for city


    return (
      <Card className="fade-in create-company-container">
        <AddCityDialog
          open={this.state.open}
          handleClose={this.handleClose}
        />
        <h1 className="display-4 text-center">Create Route</h1>
        <Button onClick={this.handleClickOpen} variant="fab" mini color="secondary" aria-label="Add" className={classes.button}>
          <AddIcon />
        </Button>

        <form onSubmit={this.onSubmit}>

          <TextField
            placeholder="Company ID"
            name="route_id"
            value={this.state.route_id}
            onChange={this.onChange}
            error={errors.route_id}
            info="A Unique Route Id"
            required
          />

          <TextField
            placeholder="Route Title"
            name="routeTitle"
            value={this.state.routeTitle}
            onChange={this.onChange}
            error={errors.routeTitle}
            info="A Route Title for this Identification in our System"
            required
          />

          <MultiSelectList
            placeholder="City"
            name="city"
            value={this.state.city}
            onChange={this.onChange}
            options={this.state.cities}
            error={errors.city}
            info="Give us a city where your head office"
            required
            multiple={true}
          />

          <TextField
            placeholder="Short Detail"
            name="aboutRoute"
            value={this.state.aboutRoute}
            onChange={this.onChange}
            error={errors.aboutRoute}
            info="Tell us a little about this route"
            multiline
          />

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

CreateRoute.propTypes = {
};

const mapStateToProps = state => {
  const {
    CompanyReducer: { createdCompany, createCompanyError, createCompanyLoader },
    BusReducer: { cities, getCitiesLoader, getCitiesError }
  } = state

  return {
    createdCompany, createCompanyError, createCompanyLoader,
    cities, getCitiesLoader, getCitiesError
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createCompany: (company) => dispatch(CompanyAction.createCompany(company)),
    getCitiesAction: () => dispatch(BusAction.getCities())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles({})(CreateRoute)));
