import { Platform, PermissionsAndroid } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const permissionStorage = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

const imagePickerIos = async (callback) => {
    ImagePicker.openPicker({
        multiple: true,
        cropping: true,
        width: 160,
        height: 90,
        mediaType: 'photo',
        maxFiles: 6 //ios only 
    }).then(images => {
        callback(images);
    });
}


const imagePickerAndroid = async (callback) => {
    try {
        const grant = await PermissionsAndroid.request(permissionStorage);
        if(grant === PermissionsAndroid.RESULTS.GRANTED) {
            ImagePicker.openPicker({
                multiple: true,
                cropping: true,
                width: 160,
                height: 90,
                mediaType: 'photo'
            }).then(images => {
                callback(images);
            });
        }
    } catch (error) {
        
    }
}

export const imagePicker = ( callback ) => {
    return Platform.OS === 'ios' ? imagePickerIos(callback) : imagePickerAndroid(callback);
}