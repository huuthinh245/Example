//@flow
import React from 'react';
import { Marker } from 'react-native-maps';

interface LatLng {
    longitude: number,
    latitude: number
}
type MakerProps = {
    coordinate: LatLng,
    identifier: string,
    id: number
}
export default class CustomMaker extends React.Component<MakerProps, any> {
    shouldComponentUpdate(nextProps: any) {
        if (this.props.coordinate.latitude !== nextProps.coordinate.latitude
            && this.props.coordinate.longitude !== nextProps.coordinate.longitude) {
            return true;
        }
        return false;
    }
    render() {
        return (
            <Marker
                tracksViewChanges={false}
                key={this.props.id}
                identifier={this.props.identifier}
                coordinate={{
                    latitude: this.props.coordinate.latitude,
                    longitude: this.props.coordinate.longitude
                }}
                tracksViewChanges={false}
            />
        )
    }
}