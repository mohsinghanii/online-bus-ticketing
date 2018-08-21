import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { BusAction } from '../../store/actions/index'
import TextField from '../common/TextField'
import SelectList from '../common/SelectList'
import './index.css'

class CreateRide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routeTitle: '',
      route_id: '',
      stops: [],
      aboutRoute: '',
      errors: {},
      open: false,
      routes: [{ label: '* Select City / Stops', value: 0 }]
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.createdRoute && !nextProps.createRouteLoader && this.props.createRouteLoader) {
      this.props.history.push('/dashboard')
    }

    if (this.props.routes !== nextProps.routes) {
      this.createSelectRouteOptions(nextProps.routes)
    }
  }

  componentWillMount() {
    this.props.getRoutesAction()
  }

  componentDidMount() {
    if (this.props.routes) {
      this.createSelectRouteOptions(this.props.routes)
    }
  }

  createSelectRouteOptions = (routes) => {
    let routesTitles = []
    routes.map((route, i) => {
      routesTitles.push({ label: route.title, value: i + 1 })
    })

    this.setState({
      routes: routesTitles
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
      route_id: this.state.route_id,
      routeTitle: this.state.routeTitle,
      stops: this.state.stops,
      aboutRoute: this.state.aboutRoute,
    };
    // this.props.createRoute(newRoute);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <Card className="fade-in create-company-container">
        <h1 className="display-4 text-center">Create Ride</h1>

        <form onSubmit={this.onSubmit}>

          <TextField
            placeholder="Route ID"
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

          <SelectList
            placeholder="stops"
            name="stops"
            value={this.state.stops}
            onChange={this.onChange}
            options={this.state.routes}
            error={errors.stops}
            info="Give us a city where your head office"
            required
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

CreateRide.propTypes = {
};

const mapStateToProps = state => {
  const {
    BusReducer: {
      createdRoute, createRouteError, createRouteLoader,
      routes, getRoutesLoader, getRoutesError,
    }
  } = state

  return {
    createdRoute, createRouteError, createRouteLoader,
    routes, getRoutesLoader, getRoutesError,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createRoute: (route) => dispatch(BusAction.createRoute(route)),
    getRoutesAction: () => dispatch(BusAction.getRoutes())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles({})(CreateRide)));
