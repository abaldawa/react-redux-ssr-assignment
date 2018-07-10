/**
 * User: abhijit.baldawa
 *
 * This Component is used to create one series item on the UI
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {ObjParse} from "../../../common/utils";

const styles = theme => ({
    root: {
        padding: theme.spacing.unit,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        whiteSpace: 'nowrap',
        marginBottom: theme.spacing.unit
    },
});

function Series(props) {
    const { classes, title, thumbnailUrl, imdbRating, imdbUrl } = props;

    const
        firstComp = thumbnailUrl ? <img src={thumbnailUrl} /> : title;

    return (
        <a href={imdbUrl}>
            <Paper className={classes.root} elevation={1} style={thumbnailUrl ? {}: {"minHeight": "326px", "minWidth": "198px"}}>
                <Typography variant="headline" component="h3">
                    {firstComp}
                </Typography>
                <Typography component="p">
                    Rating: {imdbRating}
                </Typography>
            </Paper>
        </a>
    );
}

Series.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Series);