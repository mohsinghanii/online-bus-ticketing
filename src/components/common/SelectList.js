import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
        width: '100%',
        marginLeft: '0'
    }
});

class SelectList extends React.Component {

    render() {
        const { classes } = this.props;
        let { name, value, info, error, onChange, options, disabled, required, placeholder } = this.props
        const selectOptions = options.map((option, i) => (
            <MenuItem key={i} value={option.value}>
                {option.label}
            </MenuItem>
        ));

        return (
            <FormControl required={required} className={classes.formControl}>
                <InputLabel htmlFor="age-required">{placeholder}</InputLabel>
                <Select
                    value={value}
                    onChange={onChange}
                    name={name}
                    className={classes.selectEmpty}
                    disabled={disabled}
                    fullWidth
                    error={error}
                    placeholder={placeholder}
                >
                    {selectOptions}
                </Select>
                <FormHelperText>{info}</FormHelperText>
            </FormControl>
        );
    }
}

SelectList.propTypes = {
    classes: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
};

SelectList.defaultProps = {
    error: false,
    disabled: false,
    required: false,
};

export default withStyles(styles)(SelectList);  