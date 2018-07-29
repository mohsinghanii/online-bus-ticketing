import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { CompanyAction } from '../../store/actions/index'
import './index.css'


class Company extends React.Component {
    //   constructor(props) {
    //     super(props)
    //   }

    componentWillMount() {
        let company_id = this.props.match.params.cid
        this.props.getCompany({ company_id })
    }

    render() {
        const { classes, company, getCompanyLoader, getCompanyError } = this.props;
        return (
            <Card className={classes.card} className="fade-in company-container">
                <h2>Company : {
                    !getCompanyLoader && company ?
                        company.companyName : ''
                }</h2>
            </Card>
        );
    }
}

Company.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    const { CompanyReducer: { company, getCompanyLoader, getCompanyError } } = state

    return {
        company, getCompanyLoader, getCompanyError
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCompany: (company_id) => dispatch(CompanyAction.getCompany(company_id))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(withStyles({})(Company)));
