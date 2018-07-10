/**
 * User: abhijit.baldawa
 */

import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import {fetchFirstPageSeries, clearError, fetchPage} from "../actions/actions";

import TopFrame from './frame/TopFrame';
import SeriesList from './grid/GridComponent';
import Pagination from './pagination/Pagination';
import ErrorModal from './modals/modal';

const AppComponent = (props) => {
    const { isLoading, seriesArr, errorMessage, initialStateQueried, links, navigation } = props;

    let errorModal;

    if( errorMessage ) {
        errorModal = <ErrorModal
                        open={true}
                        title={"Error"}
                        bodyText={errorMessage}
                        handleClose={()=> props.clearError()}
                     />
    }

    if( !initialStateQueried ) {
        props.fetchFirstPageSeries();
    }

    return (
        <div>
            <TopFrame title={"Viaplay"}/>
            <SeriesList seriesArr={seriesArr}/>
            <Pagination
                navigation={navigation}
                isLoading={isLoading}
                links={links}
                onPagination={ URL => props.fetchPage(URL)}
            />
            {errorModal}
        </div>
    );
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            fetchFirstPageSeries,
            clearError,
            fetchPage
        },
        dispatch
    );
};

const mapStateToProps = state => ({
    isLoading: state.isLoading,
    seriesArr: state.seriesArr,
    errorMessage: state.errorMessage,
    initialStateQueried: state.initialStateQueried,
    links: state.links,
    navigation: state.navigation
});

const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);
export default App;