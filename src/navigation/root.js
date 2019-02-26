import React from 'react';
import {
    Animated, SafeAreaView
} from 'react-native';
import {
    createAppContainer,
    createBottomTabNavigator,
    createSwitchNavigator,
    createStackNavigator
} from 'react-navigation';
import Home from 'screens/Home/HomeContainer';
import Camera from 'screens/QRCode/QRContainer';
import ImagePicker from 'screens/ImagePicker/PickerContainer';
import Login from 'screens/Login/LoginContainer';
import Download from 'screens/Download/DownloadContainer';
import { width } from 'utils/metrics'




class TabWrapper extends React.Component {
    state = {
        translateX: new Animated.Value(0)
    }

    componentDidMount() {
        Animated.timing(this.state.translateX, {
            duration: 600,
            toValue: 1,
            useNativeDriver: true
        }).start();
    }
    render() {
        const translateX = this.state.translateX.interpolate({
            inputRange: [0, 1],
            outputRange: [width, 0],
            extrapolate: 'clamp'
        });

        const TabNavigator = createBottomTabNavigator({
            Home: {
                screen: Home
            },
            Image: {
                screen: ImagePicker
            },
            Download: {
                screen: Download
            },
            Camera: {
                screen: Camera
            }
        });

        const Tabs = createAppContainer(TabNavigator);

        return (
            <Animated.View
             style={{flex: 1, transform: [{ translateX }] }}
            >
                <Tabs />
            </Animated.View>
        )
    }
}

const AuthNavigator = createSwitchNavigator({
    Login: {
        screen: Login
    },
    Main: {
        screen: TabWrapper
    },

}, {
        initialRouteName: 'Login'
    })

export default createAppContainer(AuthNavigator);