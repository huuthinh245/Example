//@flow
import React, { Component } from 'react';
import {
  Text,
} from 'react-native';
import { Provider } from 'react-redux';
import firebase from 'react-native-firebase';
import type { NotificationOpen, Notification } from 'react-native-firebase';
import stores from './src/store';
import Root from 'navigation/root';
import NavigationService from 'navigation/NavigationService';
declare var console: any;
console.disableYellowBox = true;
export default class App extends Component<any> {
  notificationOpenedListener: any;
  notificationDisplayedListener: any;
  notificationListener: any;
  
  async componentDidMount() {
    await firebase.messaging().requestPermission();
    const notificationOpen: NotificationOpen = await firebase.notifications().getInitialNotification();
      // firebase.notifications().getInitialNotification().then( notification => {
      //   console.log(notification);
      // })
      this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
        console.log('notificationOpen');
        // Get the action triggered by the notification being opened
        const action = notificationOpen.action;
        // Get information about the notification that was opened
        const notification = notificationOpen.notification;
        console.log(notificationOpen);
      });

      this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {
        console.log('notificationDisplayedListener',  notification);
        // Process your notification as required
        // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
      });
      this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
        console.log('notification ', notification);
        // Process your notification as required
      });
  }
  componentWillUnmount() {
    this.notificationDisplayedListener();
    this.notificationListener();
    this.notificationOpenedListener();
  }
  render() {
    return (
      <Provider store={stores}>
        <Root
          ref={navigationRef => {
            NavigationService.setNavigationRoot(navigationRef);
          }}
        />
      </Provider>
    );
  }
}

// import React, { Component } from "react"
// import {
//   AppRegistry,
//   Button,
//   StyleSheet,
//   Text,
//   View,
//   Alert,
//   NativeModules,
//   TouchableOpacity } from "react-native"

// const { RNTwitterSignIn } = NativeModules

// const Constants = {
//   //Dev Parse keys
//   TWITTER_COMSUMER_KEY: "9Z5eOeZ4V49olatzrmYLYMtMf",
//   TWITTER_CONSUMER_SECRET: "tfsFGGZk4npOqgc9okIYApjtsoG5HqMdXIVBAsWxRKpnYkLARz"
// }

// export default class TwitterButton extends Component {
//   state = {
//     isLoggedIn: false
//   }

//   _twitterSignIn = () => {
//     RNTwitterSignIn.init(Constants.TWITTER_COMSUMER_KEY, Constants.TWITTER_CONSUMER_SECRET)
//     RNTwitterSignIn.logIn()
//       .then(loginData => {
//         console.log(loginData)
//         const { authToken, authTokenSecret } = loginData
//         if (authToken && authTokenSecret) {
//           this.setState({
//             isLoggedIn: true
//           })
//         }
//       })
//       .catch(error => {
//         console.log(error)
//       }
//     )
//   }

//   handleLogout = () => {
//     console.log("logout")
//     RNTwitterSignIn.logOut()
//     this.setState({
//       isLoggedIn: false
//     })
//   }

//   render() {
//     const { isLoggedIn } = this.state
//     return (
//       <View style={this.props.style}>
//         {isLoggedIn
//           ? <TouchableOpacity onPress={this.handleLogout}>
//               <Text>Log out</Text>
//             </TouchableOpacity>
//           : <Button name="logo-twitter" style={styles.button} onPress={this._twitterSignIn} title="Login with Twitter">
//             </Button>}
//       </View>
//     )
//   }
// }

// const styles = StyleSheet.create({
//   button: {
//     backgroundColor: '#1b95e0',
//     color: 'white',
//     width: 200,
//     height: 50
//   }
// })
