import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Dimensions
} from 'react-native';
import FBSDK, { LoginManager, AccessToken, LoginButton } from 'react-native-fbsdk';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const { GraphRequest, GraphRequestManager } = FBSDK;
const { width, height } = Dimensions.get('window');
export default class LoginFb extends React.Component {



  _loginFb = () => {
    LoginManager.logOut();
    LoginManager.logInWithReadPermissions(['public_profile'])
      .then(result => {
        if (result.isCancelled) {

        } else {
          this._getInfomationFb();
        }
      })
      .catch(err => console.log(err))
  }

  _getInfomationFb = async () => {
    const data = await AccessToken.getCurrentAccessToken();
    console.log(data);
    const requestInfo = new GraphRequest(
      '/me',
      {
        parameters: {
          fields: {
            string: 'id,name,link,gender,birthday,email'
          },
          accessToken: {
            string: data.accessToken
          }
        }
      },
      (err, result) => {
        console.log(err);
        console.log(result);
      }
    );
    new GraphRequestManager().addRequest(requestInfo).start();

  }
  render() {
    return (
      <TouchableOpacity
        onPress={this._loginFb}
        style={styles.button}
      >
        <FontAwesomeIcon style={styles.iconSize} name={'facebook'}/>
        {/* <View style={styles.iconSize}/> */}
        <Text style={{ color: 'white' }}>login with facebook</Text>
      </TouchableOpacity>
      // <LoginButton
      //   onLoginFinished={
      //     (error, result) => {
      //       if (error) {
      //         console.log("login has error: " + result.error);
      //       } else if (result.isCancelled) {
      //         console.log("login is cancelled.");
      //       } else {
      //         AccessToken.getCurrentAccessToken().then(
      //           (data) => {
      //             console.log(data.accessToken.toString())
      //           }
      //         )
      //       }
      //     }
      //   }
      //   onLogoutFinished={() => console.log("logout.")} />
    )
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3866b8',
    borderRadius: 5,
    flexDirection: 'row',
    marginBottom: 5,
    marginTop: 50,
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: '50%',
    height: 40
  },
  iconSize: {
    fontSize: 24,
    width: 40,
    color: 'white',
    textAlign: 'center'
  }
})