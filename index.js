/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry, Platform} from 'react-native';
import App from './App';
import  Permissions from 'react-native-permissions';
import {name as appName} from './app.json';
import googleConfig from './src/lib/googleConfig';
import bgMessage from './bgMessage';

const requestPermissions = async () => {
    try {
      await Permissions.request('location', { type: 'always' });
      await Permissions.request('photo', { type: 'always' });
      await Permissions.request('camera');
      if (Platform.OS === 'ios') {
        await Permissions.request('notification', { type: ['alert', 'badge'] });
      }
      if(Platform.OS === 'android') {
          await Permissions.request('storage')
      }
    } catch (error) {
      console.log(error);
    }
  };

googleConfig();
requestPermissions();

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging); 