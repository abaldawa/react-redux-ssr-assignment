/**
 * User: abhijit.baldawa
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});

function ContainedButtons(props) {
    const { classes, color, text, disabled, onPagination, url } = props;
    return (
        <div>
            <Button
                variant="contained"
                color={color}
                className={classes.button}
                disabled={disabled}
                onClick={()=> onPagination(url)}
            >
                {text}
            </Button>
        </div>
    );
}

ContainedButtons.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContainedButtons);