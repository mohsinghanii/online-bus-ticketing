import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        width: '100%',
    }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

class MultiSelectList extends React.Component {

    render() {
        const { classes } = this.props;
        let { name, value, info, error, onChange, options, disabled, required, placeholder } = this.props
        
        const selectOptions = options.map((option, i) => (
            <MenuItem key={i} value={option.value}>
                <Checkbox checked={value.indexOf(option.value) > -1} />
                <ListItemText primary={option.value} />
            </MenuItem>
        ));

        return (
            <FormControl required={required} className={classes.formControl}>
                <InputLabel htmlFor="age-required">{placeholder}</InputLabel>
                <Select
                    multiple
                    value={value}
                    onChange={onChange}
                    input={<Input id="select-multiple-checkbox" />}
                    renderValue={selected => selected.join(', ')}
                    // MenuProps={MenuProps}
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

MultiSelectList.propTypes = {
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

MultiSelectList.defaultProps = {
    error: false,
    disabled: false,
    required: false,
};

export default withStyles(styles)(MultiSelectList);  