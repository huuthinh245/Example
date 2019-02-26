import React from 'react';
import {
    SafeAreaView,
    TouchableOpacity,
    Text,
    WebView,
    Alert, 
    Platform
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import Pdf from 'react-native-pdf';

export default class DowloadView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: 'file:///Users/thinh/Library/Developer/CoreSimulator/Devices/91B53EDD-DB82-42DE-85EF-54FF779158F8/data/Containers/Data/Application/0F13583B-A203-4411-A286-D72548C6C1CB/Documents/RNFetchBlob_tmp/RNFetchBlobTmp_n48m2ro4axqlskfsep3zr'
        }

    }
    downloadFile = () => {
        const { config, fs } = RNFetchBlob;
        // const date = new Date();
        const DownloadDir = fs.dirs.DownloadDir; // this is the pictures directory. You can check the available directories in the wiki.
        const options = {
            fileCache: true,
            path: RNFetchBlob.fs.dirs.DocumentDir + "/me_" + 'example.pdf',
            addAndroidDownloads: {
                useDownloadManager: true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
                notification: true,
                path: DownloadDir + "/me_" + 'example.pdf', // this is the path where your downloaded file will live in
                description: 'Downloading image.'
            }
        }
        config(options).fetch('GET', "https://www.antennahouse.com/XSLsample/pdf/sample-link_1.pdf")
            .then((res) => {
                // do some magic here
                console.log(res.path());
                this.setState({ data: 'file://' + res.path() });
            })
    }

    deleteFile = () => {
        const { config, fs } = RNFetchBlob;
        const DownloadDir = Platform.OS === 'ios' ?  RNFetchBlob.fs.dirs.DocumentDir : fs.dirs.DownloadDir;
        fs.unlink(DownloadDir + '/me_example.pdf')
        .then((res) => {
            console.log(res);
        })
    }
    checkExistFile = () => {
        const { config, fs } = RNFetchBlob;
        const DownloadDir = Platform.OS === 'ios' ?  RNFetchBlob.fs.dirs.DocumentDir : fs.dirs.DownloadDir;
        console.log(DownloadDir + '/me_example.pdf');
        fs.exists(DownloadDir + '/me_example.pdf')
        .then((exist) => {
            if(exist) {
                Alert.alert(
                    'Delete',
                    'would you like to delete  ?',
                    [
                      {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      {text: 'OK', onPress: () => this.deleteFile()},
                    ],
                    {cancelable: false},
                  );
            }else {
                Alert.alert(
                    'Download',
                    'would you like to download  ?',
                    [
                      {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      {text: 'OK', onPress: () => this.downloadFile()},
                    ],
                    {cancelable: false},
                  );
            }
        })
        .catch(() => { });
    }
    render() {
        const source = {uri:'file:////Users/thinh/Library/Developer/CoreSimulator/Devices/91B53EDD-DB82-42DE-85EF-54FF779158F8/data/Containers/Data/Application/0F13583B-A203-4411-A286-D72548C6C1CB/Documents/RNFetchBlob_tmp/RNFetchBlobTmp_n48m2ro4axqlskfsep3zr',cache:true};
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', }}>
                <TouchableOpacity
                    onPress={this.downloadFile}
                >
                    <Text>
                        download
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this.checkExistFile}
                >
                    <Text>
                        check file exist
                    </Text>
                </TouchableOpacity>
                <Pdf 
                source={this.state.data ? { uri: this.state.data } : source}
                style={{
                    flex: 1,
                    borderWidth: 2,
                    width: '100%'
                }}
                onLoadComplete={(numberOfPages,filePath)=>{
                    console.log(`number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page,numberOfPages)=>{
                    console.log(`current page: ${page}`);
                }}
                onError={(error)=>{
                    console.log(error);
                }}
                />
            </SafeAreaView>
        )
    }
}