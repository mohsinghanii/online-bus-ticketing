import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import ReactLoading from "react-loading";
import { connect } from 'react-redux';
import { BusAction } from '../../store/actions/index'
// components
import RouteCard from './RouteCard';


class Routes extends Component {

    componentDidMount() {
        this.props.getRoutesAction()
    }

    render() {
        return (

            <div>
                {
                    this.props.getRoutesLoader ?
                        <div style={{ width: '100px', margin: '0 auto', marginTop: '50px' }}>
                            <ReactLoading type={'spokes'} width={100} color="#999" />
                        </div>
                        : ''
                }
                <Grid container spacing={24}>
                    {
                        !this.props.getRoutesLoader && this.props.routes && this.props.routes.map((route, i) => {
                            return (
                                <Grid item sm={3} key={i}>
                                    <RouteCard
                                        history={this.props.history}
                                        route={route}
                                    />
                                </Grid>
                            )
                        })
                    }
                </Grid>
                {
                    this.props.getRoutesError && !this.props.getRoutesLoader && !this.props.routes ?
                        <div>{this.props.getRoutesError}</div> : ''
                }
            </div>

        );
    }
}


const mapStateToProps = state => {
    const {
        BusReducer: {
            routes, getRoutesLoader, getRoutesError
        }
    } = state

    return {
        routes, getRoutesLoader, getRoutesError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getRoutesAction: () => dispatch(BusAction.getRoutes()),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Routes)