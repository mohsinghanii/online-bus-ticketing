import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ItemHeader from './ItemHeader';
import ItemTable from './ItemTable';
import Spinner from '../common/Spinner';
import { getItemByName } from '../../actions/itemActions';

class Item extends Component {

  componentDidMount() {
    if (this.props.match.params.itemname) {
      this.props.getItemByName(this.props.match.params.categoryname, this.props.match.params.itemname);
    }
  }

  render() { 
    console.log("category and item data by name" ,this.props.item)
    return (
      <div>
        <ItemHeader />
        <ItemTable />
      </div>
    );
  }
}

Item.propTypes = {
  getItemByName: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {

  const { item : { item } } = state
  return {
      item
  }
};

export default connect(
  mapStateToProps,
  { getItemByName }
)(Item);
