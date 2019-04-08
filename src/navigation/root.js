import React from 'react';
import {
    Animated,
    View
} from 'react-native';
import {
    createAppContainer,
    createBottomTabNavigator,
    createSwitchNavigator,
    createStackNavigator,
    SafeAreaView
} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from 'screens/Home/HomeContainer';
import Camera from 'screens/QRCode/QRContainer';
import ImagePicker from 'screens/ImagePicker/PickerContainer';
import Login from 'screens/Login/LoginContainer';
import Download from 'screens/Download/DownloadContainer';
import Maps from 'screens/Maps/MapContainer';
import { width, scaleByHeight, scale } from 'utils/metrics'


const TabNavigator = createBottomTabNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Ionicons name="ios-home" size={30} color={tintColor} />
        }
    },
    Maps: {
        screen: Maps,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Ionicons name="ios-map" size={30} color={tintColor} />
        }
    },
    Camera: {
        screen: Camera,
        navigationOptions: {
            //  tabBarVisible: false,
            title: '',
            tabBarIcon: ({ tintColor, focused }) => {
            console.log(scale(40));
            return (
                <View
                    style={{
                        height: scale(70),
                        width: scale(70),
                        borderRadius: 100,
                        backgroundColor: '#FE6D64',
                        paddingTop: 15,
                        alignItems: 'center',
                    }}
                >
                    <Ionicons name="ios-camera" size={scale(40)} color={tintColor} />
                </View>
            )},
        }
    },
    Image: {
        screen: ImagePicker,
        navigationOptions: {
            tabBarVisble: false,
            tabBarIcon: ({ tintColor }) => <Ionicons name="ios-image" size={30} color={tintColor} />
        }
    },
    Download: {
        screen: Download,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Ionicons name="ios-cloud-download" size={30} color={tintColor} />
        }
    }
}, {
        initialRouteName: 'Maps',
        tabBarOptions: {
            style: {
                backgroundColor: '#223a42'
            },
            allowFontScaling: true,
            labelStyle: {
                fontSize: 12
            }
        }
});
// const Tabs = createAppContainer(TabNavigator);

class TabWrapper extends React.Component {
    static router = TabNavigator.router;
    state = {
        translateX: new Animated.Value(0)
    }

    componentDidMount() {
        Animated.timing(this.state.translateX, {
            duration: 350,
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



        return (
            <Animated.View
                style={{ flex: 1, transform: [{ translateX }] }}
            >
                    <TabNavigator navigation={this.props.navigation} />
            </Animated.View>
        )
    }
}

const AuthNavigator = createSwitchNavigator({
    Login: {
        screen: Login
    },
    Main: {
        screen: TabNavigator
    },

}, {
        initialRouteName: 'Login'
    })

export default createAppContainer(AuthNavigator);