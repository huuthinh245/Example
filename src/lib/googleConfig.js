import { GoogleSignin } from 'react-native-google-signin';


const iosClientId = '64250710601-jhml51j06okrmeg3csf6u49acbh7s0c0.apps.googleusercontent.com';
const webClientId = '64250710601-b2e5bjuc55gidl8gr5ssukll0ivjmeha.apps.googleusercontent.com';
export const googleConfig = async () => {
    await GoogleSignin.configure({
        iosClientId,
        webClientId,
        offlineAccess: true
    })
}

export default googleConfig;