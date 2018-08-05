import React, { Component } from 'react';
import CompanyCard from './CompanyCard'
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import ReactLoading from "react-loading";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { CompanyAction } from '../../store/actions/index'
import './index.css'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      companies: [0, 1, 2, 3, 4, 5, 6]
    }

    this.gotoCreateCompany = this.gotoCreateCompany.bind(this)
  }

  gotoCreateCompany() {
    this.props.history.push('/create-company')
  }

  componentWillMount() {
    this.props.companies ? '' : this.props.getCompanies()
  }

  render() {
    return (
      <div className="container" style={{ paddingBottom: '100px' }}>
        <div className="row">
          <div className="col-md-12">
            <div className="create-company-text">
              Create Company
            </div>
            <Card className="add-company-card">
              <div className='add-company-button-wrapper'>
                <button className="add-company-button" onClick={this.gotoCreateCompany}>
                  <img src={require('./../../assets/icons/round_add_circle_outline_black.png')} />
                </button>
              </div>
            </Card>
            <hr />
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
        </div>
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
)(withRouter(Dashboard));