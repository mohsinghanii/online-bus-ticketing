import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { RideAction } from '../../store/actions/rideAction';
import { BusAction } from './../../store/actions/busAction';
import TextField from '../common/TextField';
import SelectList from '../common/SelectList';
import './index.css'

class CreateRide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rideTitle: '',
      ride_id: '',
      company: '',
      bus: '',
      depDate:'',
      arrDate:'',
      errors: {},
      open: false,
      routes: [{ label: '* Select City / Stops', value: 0 }],
      companies: [{ label: '* Select Company', value: 0 }],
      buses: [{ label: '* Select Bus', value: 0 }],
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.isCreated && !nextProps.isLoading && this.props.isLoading) {
      this.props.history.push('/dashboard')
    }

    if (this.props.routes !== nextProps.routes) {
      this.createSelectRouteOptions(nextProps.routes)
    }

    if (this.props.companies !== nextProps.companies) {
      this.createSelectCompanyOptions(nextProps.companies)
    }

    if (this.props.getBuses !== nextProps.getBuses) {
      this.createSelectBusesOptions(nextProps.getBuses)
    }
  }

  componentWillMount() {
    this.props.getRoutesAction()
  }

  componentDidMount() {
    this.props.getRoutesAction()
    if (this.props.routes) {
      this.createSelectRouteOptions(this.props.routes)
    }
    if (this.props.companies) {
      this.createSelectCompanyOptions(this.props.companies)
    }
  }

  createSelectRouteOptions = (routes) => {
    let routesTitles = []
    routes && routes.map((route, i) => {
      routesTitles.push({ label: route.title, value: i + 1 })
    })

    this.setState({
      routes: routesTitles
    })
  }

  createSelectCompanyOptions = (companies) => {
    let companyTitles = []
    companies && companies.map((company, i) => {
      companyTitles.push({ label: company.companyName, value: company.company_id })
    })

    this.setState({
      companies: companyTitles
    })
  }

  createSelectBusesOptions = (buses) => {
    let busTitles = []
    buses && buses.map((bus, i) => {
      busTitles.push({ label: bus.bus_name, value: bus.bid })
    })

    this.setState({
      buses: busTitles
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
    const newRoute = {
      ride_id: this.state.ride_id,
      ride_title: this.state.rideTitle,
      bid: this.state.bus,
      cid: this.state.company,
      arrDate: this.state.arrDate,
      depDate: this.state.depDate
    };
    this.props.createRideAction(newRoute);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.name === 'company') {
      this.props.getBusesAction(e.target.value)
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <Card className="fade-in create-company-container">
        <h1 className="display-4 text-center">Create Ride</h1>

        <form onSubmit={this.onSubmit}>

          <TextField
            placeholder="Ride ID"
            name="ride_id"
            value={this.state.ride_id}
            onChange={this.onChange}
            error={errors.ride_id}
            info="A Unique Route Id"
            required
          />

          <TextField
            placeholder="Ride Title"
            name="rideTitle"
            value={this.state.rideTitle}
            onChange={this.onChange}
            error={errors.rideTitle}
            info="A Route Title for this Identification in our System"
            required
          />

          <TextField
            placeholder="Ride Departure"
            type="date"
            name="depDate"
            value={this.state.depDate}
            onChange={this.onChange}
            error={errors.depDate}
            required
          />


          <TextField
            placeholder="Ride Arrival"
            type="date"
            name="arrDate"
            value={this.state.arrDate}
            onChange={this.onChange}
            error={errors.arrDate}
            required
          />



          <SelectList
            placeholder="Select a Company"
            name="company"
            value={this.state.company}
            onChange={this.onChange}
            options={this.state.companies}
            error={errors.company}
            info="Select a Company whice provide us Bus for travel"
            required
          />

          {
            (this.state.company) ? // if we have company then show the buses
              <SelectList
                placeholder="Select a Bus"
                name="bus"
                value={this.state.bus}
                onChange={this.onChange}
                options={this.state.buses}
                error={errors.bus}
                info="Select a Bus which will ready to ride"
                required
              /> :
              ""
          }

          <SelectList
            placeholder="Select Route"
            name="stop"
            value={this.state.stop}
            onChange={this.onChange}
            options={this.state.routes}
            error={errors.stop}
            info="Select a route where bus will travel"
            required
          />

          <input
            type="submit"
            value="Submit"
            onClick={this.onSubmit}
            className="btn btn-info btn-block mt-4"
          />
        </form>
      </Card>
    );
  }
}

CreateRide.propTypes = {
};

const mapStateToProps = state => {
  const {
    BusReducer: {
      routes, getRoutesLoader, getRoutesError,
      getBusLoader, getBuses, getBusesError
    },
    CompanyReducer: { companies, getCompaniesError, getCompaniesLoader },
    RideReducer: { isLoading , isCreated, error}

  } = state

  return {
    isLoading , isCreated, error, // ride creation redux state
    routes, getRoutesLoader, getRoutesError,
    getBusLoader, getBuses, getBusesError,
    companies, getCompaniesError, getCompaniesLoader
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createRideAction: (obj) => dispatch(RideAction.createRide(obj)),
    getRoutesAction: () => dispatch(BusAction.getRoutes()),
    getBusesAction: (cid) => dispatch(BusAction.getBuses(cid)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles({})(CreateRide)));
