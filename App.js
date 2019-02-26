
import React, { Component } from 'react';
import {
  Text
} from 'react-native';
import { Provider } from 'react-redux';
import firebase from 'react-native-firebase';

import stores from './src/store';
import Root from 'navigation/root';
import NavigationService from 'navigation/NavigationService';

export default class App extends Component {

  async componentDidMount() {
    await firebase.messaging().requestPermission();
      // firebase.notifications().getInitialNotification().then( notification => {
      //   console.log(notification);
      // })
      this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
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
      this.notificationListener = firebase.notifications().onNotification((notification) => {
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

