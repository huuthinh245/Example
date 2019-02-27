import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
    Text,
    View,
    Animated,
    ActivityIndicator
} from 'react-native';
import LoginFb from './fblogin';
import LoginGg from './google';
import SaeInput from 'elements/SaeInput';
import Icon from 'utils/Icon';
import NavigationService from 'navigation/NavigationService';
import { getFontSize } from 'utils/metrics';


export default class LoginView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: 'tunghoang',
            password: 'tuho168',
            scale: new Animated.Value(0)
        }
    }

    componentDidMount() {
        console.log(this.props);
        Animated.timing(this.state.scale, {
            duration: 2000,
            toValue: 1
        }).start();
    }
    _login = () => {
        this.props.login({ username: this.state.username, password: this.state.password });
        // NavigationService.navigate('Main');
    }
    render() {
        const scale = this.state.scale.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0.5],
            extrapolate: 'clamp'
        });
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Animated.View
                    style={[styles.container]}
                >
                    <Animated.Image
                        source={Icon.logo}
                        style={{
                            height: 200,
                            width: '100%'
                        }}
                    />
                    <View style={{ width: '100%', paddingHorizontal: 10 }}>
                        <SaeInput
                            labelString={'username'}
                            value={this.state.username}
                            onChangeText={(username) => this.setState({ username })}
                        />
                        <SaeInput
                            labelString={'password'}
                            value={this.state.password}
                            onChangeText={(password) => this.setState({ password })}
                        />

                        <TouchableOpacity
                            onPress={this._login}
                            style={styles.button}
                            activeOpacity={1}
                        >
                            {
                                this.props.user.loading ? <ActivityIndicator size="small" color="black" style={{ marginVertical: 10 }} />
                                :
                                <Text style={{ color: 'white', fontSize: getFontSize(14), marginVertical: 10 }}>Sign In</Text>
                            }
                        </TouchableOpacity>
                    </View>
                    <LoginFb />
                    <LoginGg />
                </Animated.View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f4',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5
    },
    button: {
        backgroundColor: '#3866b8',
        alignSelf: 'center',
        borderRadius: 5,
        flexDirection: 'row',
        marginBottom: 5,
        marginTop: 20,
        alignItems: 'center',
        width: '50%',
        justifyContent: 'center'
    },

})