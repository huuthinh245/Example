import React from 'react';
import {
    Text,
    Image,
    View,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Animated
} from 'react-native';
import { imagePicker } from 'lib/ImagePicker';
import ProgressiveImage from './ProgressImage';
import { width } from 'utils/metrics';
export default class PickerView extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            listImg: []
        }
    }
    _renderImage = ({ item }) => {
            return (
                    <ProgressiveImage
                        thumbnailSource={{ uri: `https://images.pexels.com/photos/671557/pexels-photo-671557.jpeg?w=50&buster=${Math.random()}` }}
                        source={{ uri: item.path }}
                        style={{ width, height: 300, }}
                        resizeMode="cover"
                    />
            )
    }
    _picker = () => {
        imagePicker((data) => {
            if (data) {
                this.setState({
                    ...this.state.listImg,
                    listImg: this.state.listImg.concat(data)
                })
            }
        })
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={this._picker}
                >
                    <Text>image picker</Text>
                </TouchableOpacity>
                <FlatList
                    keyExtractor={(item, index) => `${index}`}
                    data={this.state.listImg}
                    renderItem={this._renderImage}
                />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
        backgroundColor: 'lemonchiffon'
    }
})
