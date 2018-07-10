/**
 * User: abhijit.baldawa
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import {ObjParse} from '../../../common/utils';

import Series from '../series/Series'

const styles = theme => ({
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridGap: `${theme.spacing.unit * 1}px`,
    },
    paper: {
        padding: theme.spacing.unit,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        whiteSpace: 'nowrap',
        marginBottom: theme.spacing.unit,
    },
    divider: {
        margin: `${theme.spacing.unit * 2}px 0`,
    },
});

function CSSGrid(props) {
    const { classes, seriesArr = [] } = props;

    return (
        <div>
            <Grid container spacing={16}>
                {seriesArr.map((seriesObj) =>
                    <Grid item xs={false} key={ObjParse(seriesObj).getKey('guid').getVal()}>
                        <Series
                            thumbnailUrl={ ObjParse(seriesObj).getKey('thumbnailUrl').getVal()}
                            title={ObjParse(seriesObj).getKey('title').getVal()|| ''}
                            imdbRating={ObjParse(seriesObj).getKey('imdb').getKey('rating').getVal() || ''}
                            imdbUrl={ObjParse(seriesObj).getKey('imdb').getKey('url').getVal()|| '#'}
                        />
                    </Grid>
                )}
            </Grid>
            <Divider className={classes.divider} />
        </div>
    );
}

CSSGrid.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CSSGrid);