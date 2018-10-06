import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import { withRouter } from 'react-router-dom';
import Companies from './companies';
import Routes from './Routes';
import './index.css'

class Dashboard extends Component {


    render() {
        return (
            <div className="container" style={{ paddingBottom: '100px' }}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-2">
                                <div className="create-company-text">
                                    Create Company
                                </div>
                                <Card className="add-company-card">
                                    <div className='add-company-button-wrapper'>
                                        <button className="add-company-button" onClick={() => { this.props.history.push('/create-company') }}>
                                            <img src={require('./../../assets/icons/round_add_circle_outline_black.png')} />
                                        </button>
                                    </div>
                                </Card>
                            </div>
                            <div className="col-md-2">
                                <div className="create-company-text">
                                    Create Route
                                </div>
                                <Card className="add-company-card">
                                    <div className='add-company-button-wrapper'>
                                        <button className="add-company-button" onClick={() => { this.props.history.push('/create-route') }}>
                                            <img src={require('./../../assets/icons/round_add_circle_outline_black.png')} />
                                        </button>
                                    </div>
                                </Card>
                            </div>
                            <div className="col-md-2">
                                <div className="create-company-text">
                                    Create Ride
                                </div>
                                <Card className="add-company-card">
                                    <div className='add-company-button-wrapper'>
                                        <button className="add-company-button" onClick={() => { this.props.history.push('/create-ride') }}>
                                            <img src={require('./../../assets/icons/round_add_circle_outline_black.png')} />
                                        </button>
                                    </div>
                                </Card>
                            </div>
                        </div>
                        <hr />
                        <h3> Companies </h3>
                        <Companies history={this.props.history} />
                        <hr />
                        <h3> Routes </h3>
                        <Routes history={this.props.history} />

                    </div>
                </div>
            </div>
        );
    }
}


export default withRouter(Dashboard);