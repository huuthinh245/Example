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
export default class PickerView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listImg: []
        }
    }
    _renderImage = () => {
        if (this.state.listImg.length > 0) {
            return (
                <FlatList
                    keyExtractor={(item, index) => `${Math.random()}`}
                    data={this.state.listImg}
                    renderItem={({ item }) => {
                        return (
                            <ProgressiveImage
                                thumbnailSource={{ uri: `https://images.pexels.com/photos/671557/pexels-photo-671557.jpeg?w=50&buster=${Math.random()}` }}
                                source={{ uri: item.path }}
                                style={{ width: 300, height: 300, }}
                                resizeMode="cover"
                            />
                        );

                    }}
                />
            )
        }
        return null;
    }
    _picker = () => {
        imagePicker((data) => {
            console.log(data);
            if (data) {
                this.setState({
                    listImg: [...this.state.listImg, ...data]
                })
            }
        })
    }
    render() {
        console.log(this.state.listImg);
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={this._picker}
                >
                    <Text>image picker</Text>
                </TouchableOpacity>
                {this._renderImage()}
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
