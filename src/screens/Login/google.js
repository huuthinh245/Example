import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Alert,
    Image,
    StyleSheet
} from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import Icon from 'utils/Icon';
export default class GoogleLogin extends React.Component {
    _signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(userInfo);
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // sign in was cancelled
                Alert.alert('cancelled');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation in progress already
                Alert.alert('in progress');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                Alert.alert('play services not available or outdated');
            } else {
                Alert.alert('Something went wrong', error.toString());
            }
        }
    };
    _signInGoogle = () => {
        GoogleSignin.signIn()
            .then((data) => {
                console.log(data.user);
            })
            .catch((err) => {
                console.log('err', err.code);
            })
            .done();
    };

    _signOutGoogle = () => {
        GoogleSignin.revokeAccess()
            .then(() => GoogleSignin.signOut())
            .then(() => {
                // callback();
            })
            .done();
    };
    render() {
        return (
            <TouchableOpacity
                onPress={this._signIn}
                style={styles.button}
            >
                <Image source={Icon.google}  style={styles.iconSize}/>
                <Text style={{ color: 'white' }}>login with google</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#2a84fc', 
        borderRadius: 5, 
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        width: '50%'
    },
    iconSize: {
        width: 40,
        height: 40
    }
})