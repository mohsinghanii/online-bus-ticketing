import React from 'react';
import PropTypes from 'prop-types';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Button,
    TextField,
    DialogTitle,
    CircularProgress
} from '../../material-ui/index';
import { BusAction } from '../../store/actions/index';
import { connect } from 'react-redux';


class AddCityDialog extends React.Component {

    constructor() {
        super()
        this.state = {
            open: false,
            city: '',
            createCityLoader: false,
            createdCity: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.open !== prevState.open) {
            return ({ open: nextProps.open }) // <- this is setState equivalent
        }

        if (nextProps.createCityLoader !== prevState.createCityLoader) {
            return ({ createCityLoader: nextProps.createCityLoader })
        }

        else {
            return null
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.createdCity !== this.props.createdCity) {
            this.props.handleClose()
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleSubmit() {
        const { city } = this.state;
        this.props.addCityAction({
            city,
            date_created: new Date()
        })
    }

    render() {
        return (
            <div>
                <Dialog
                    open={this.state.open}
                    onClose={this.props.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Add Bus Name and Number</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please correctly add bus name and number
                    </DialogContentText>
                        <TextField
                            margin="dense"
                            id="city"
                            label="Add City"
                            value={this.state.city}
                            type="text"
                            onChange={this.handleChange}
                            fullWidth
                        />
                    </DialogContent>
                    {
                        (this.props.createCityLoader) ?
                            <CircularProgress thickness={7} />
                            :
                            ""
                    }
                    {
                        (this.props.createCityError) ?
                            <p style={{ textAlign: 'center', color: "red" }}>{this.props.createCityError}</p>
                            :
                            ''
                    }
                    <DialogActions>
                        <Button onClick={this.props.handleClose} color="primary">
                            Cancel
                    </Button>
                        <Button onClick={this.handleSubmit} color="primary">
                            Add
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

AddCityDialog.propTypes = {
    createCityLoader: PropTypes.bool.isRequired,
    createCityError: PropTypes.bool.isRequired,
    createdCity: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
    const {
        BusReducer
    } = state
    return {
        createCityLoader: BusReducer.createCityLoader,
        createCityError: BusReducer.createCityError,
        createdCity: BusReducer.createdCity, // will not need in future
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addCityAction: (obj) => dispatch(BusAction.addCity(obj))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCityDialog)