/**
 * User: abhijit.baldawa
 *
 * This Component creates a app bar
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = {
    root: {
        flexGrow: 1
    },
    bgColor: {
        backgroundColor: "black"
    }
};

function TopFrame(props) {
    const { classes, title } = props;
    return (
        <div className={classes.root} style={{"marginBottom":"10px"}}>
            <AppBar position="static" classes={{colorPrimary: classes.bgColor}}>
                <Toolbar>
                    <Typography variant="title" color="inherit">
                       <img src="/images/viaplayLogo.png" style={{width: "144px", height:"35px"}}/>
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

TopFrame.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopFrame);