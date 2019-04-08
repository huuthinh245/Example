import React from 'react';
import { connect } from 'react-redux';
import Map from './TestAnimationMap';
import MapView from './Map';
import { getMapData } from 'action/mapAction';
import { selectors } from 'reducers/mapReducer';

class MapContainer extends React.Component {
    componentDidMount(){
        this.props.getMapData(1)
    }
    render(){
        return <MapView {...this.props} />;
    }
}

const mapStateToProps = (state) => {
    return {
        data: selectors.getData(state),
        loading: selectors.getLoading(state)
    }
}
const mapDispatchToProps = (dispatch) => ({
    getMapData: (page) => dispatch(getMapData(page)),
    loadMoreData: () => dispatch({ type: 'LOADMORE'})
})
export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
