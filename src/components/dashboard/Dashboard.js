import React, { Component } from 'react';
import CompanyCard from '../CompanyCard/index'
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CreateCompany from './../CreateCompany/index'
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
    this.props.getCompanies()
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
            <Grid container spacing={24}>
              {
                this.props.companies && this.props.companies.map((company, i) => {
                  return (
                    <Grid item sm={4} key={i}>
                      <CompanyCard />
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
  const { CompanyReducer: { companies, createCompanyError, createCompanyLoader } } = state

  return {
    companies, createCompanyError, createCompanyLoader
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCompanies: () => dispatch(CompanyAction.getCompanies())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Dashboard));