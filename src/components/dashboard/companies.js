import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import ReactLoading from "react-loading";
import { connect } from 'react-redux';
import { CompanyAction } from '../../store/actions/index'
// components
import CompanyCard from './CompanyCard';


class Companies extends Component {

    componentDidMount() {
        this.props.getCompanies()
    }

    render() {
        return (

            <div>
                {
                    this.props.getCompaniesLoader ?
                        <div style={{ width: '100px', margin: '0 auto', marginTop: '50px' }}>
                            <ReactLoading type={'spokes'} width={100} color="#999" />
                        </div>
                        : ''
                }
                <Grid container spacing={24}>
                    {
                        !this.props.getCompaniesLoader && this.props.companies && this.props.companies.map((company, i) => {
                            return (
                                <Grid item sm={3} key={i}>
                                    <CompanyCard
                                        company={company}
                                        selectedCompanyAction={this.props.selectedCompanyAction}
                                        history={this.props.history}
                                    />
                                </Grid>
                            )
                        })
                    }
                </Grid>
                {
                    this.props.getCompaniesError && !this.props.getCompaniesLoader && !this.props.companies ?
                        <div>{this.props.getCompaniesError}</div> : ''
                }
            </div>

        );
    }
}


const mapStateToProps = (state) => {
    const { CompanyReducer: { companies, getCompaniesError, getCompaniesLoader } } = state

    return {
        companies, getCompaniesError, getCompaniesLoader
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCompanies: () => dispatch(CompanyAction.getCompanies()),
        selectedCompanyAction: (obj) => dispatch(CompanyAction.selectedCompany(obj))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Companies);