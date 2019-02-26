import React from 'react';
import CameraView from './CameraView';

class QRCodeContainer extends React.Component {
    render() {
        return (
            <CameraView {...this.props}/>
        )
    }
}

export default QRCodeContainer;