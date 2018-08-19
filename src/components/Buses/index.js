import React, { Component } from 'react';
import BusCard from './BusCard'
import Grid from '@material-ui/core/Grid';
import ReactLoading from "react-loading";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { BusAction } from '../../store/actions/index'
import './index.css'

class Buses extends Component {

    componentDidMount() {
        let { params } = this.props.match;
        this.props.getBusesAction(params.cid)
    }

    renderLoader(){
        return (
            <div style={{ width: '100px', margin: '0 auto', marginTop: '50px' }}>
                <ReactLoading type={'spokes'} width={100} color="#999" />
            </div>
        )
    }

    render() {
        let { getBusLoader, getBusesError, getBuses, selectedCompany } = this.props;

        if (getBusLoader) return this.renderLoader()
        if (getBusesError.isError) return "ERROR"

        return (
            <div className="container" style={{ paddingBottom: '100px' }}>
                <div className="row">
                    <div className="col-md-12">
                        <Grid container spacing={24}>
                            {
                                getBuses && getBuses.map((bus, i) => {
                                    return (
                                        <Grid item sm={3} key={i}>
                                            <BusCard
                                                bus={bus}
                                                company={selectedCompany}
                                            />
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
  const { 
      BusReducer : { getBusLoader, getBuses, getBusesError },
      CompanyReducer
     
    } = state

  return {
    getBusLoader,
    getBuses,
    getBusesError,
    selectedCompany: CompanyReducer.selectedCompany ? CompanyReducer.selectedCompany : {} 
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBusesAction: (cid) => dispatch(BusAction.getBuses(cid)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Buses));