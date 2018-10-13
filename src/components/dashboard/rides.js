import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import ReactLoading from "react-loading";
import { connect } from 'react-redux';
import { RideAction } from '../../store/actions/rideAction';
// components
import RideCard from './rideCard';


class Rides extends Component {

    componentDidMount() {
        this.props.getRidesAction()
    }

    render() {
        return (

            <div>
                {
                    this.props.isLoading ?
                        <div style={{ width: '100px', margin: '0 auto', marginTop: '50px' }}>
                            <ReactLoading type={'spokes'} width={100} color="#999" />
                        </div>
                        : ''
                }
                <Grid container spacing={24}>
                    {
                        !this.props.isLoading && this.props.rides && this.props.rides.map((ride, i) => {
                            return (
                                <Grid item sm={3} key={i}>
                                    <RideCard
                                        history={this.props.history}
                                        ride={ride}
                                    />
                                </Grid>
                            )
                        })
                    }
                </Grid>
                {
                    this.props.error.isError && !this.props.isLoading ?
                        <div>{this.props.error.message}</div> : ''
                }
            </div>

        );
    }
}


const mapStateToProps = state => {
    const {
        RideReducer: {
            isLoading, error, rides
        }
    } = state

    return {
        isLoading, error, rides
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getRidesAction: () => dispatch(RideAction.getRides()),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Rides)