// //@flow
// import React, { Component } from 'react';
// import { StyleSheet, View, Dimensions, Image, Text, Animated, SafeAreaView, TextInput } from 'react-native';
// import Interactable from 'react-native-interactable';
// import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
// import _ from 'lodash';
// import ClusteredMapView from 'react-native-maps-super-cluster'
// import CustomMarker from './CustomMarker';
// import SaeInput from 'elements/SaeInput';
// import { generateRandomPoints } from './generator';
// const Screen = {
//   width: Dimensions.get('window').width,
//   height: Dimensions.get('window').height
// }

// const TextInputA = Animated.createAnimatedComponent(TextInput);

// type State = {
//   orientation: string,
//   height: number,
//   width: number,
//   tyle: any,
//   page: number
// }

// export default class MapPanel extends Component<any, State> {
//   _deltaY: any;
//   map: any;
//   constructor(props: any) {
//     super(props);
//     this._deltaY = new Animated.Value(Screen.height - 100);
//     this.state = {
//       orientation: 'portrait',
//       height: Screen.height,
//       width: Screen.width,
//       tyle: 1,
//       page: 1
//     }
//   }
//   shouldComponentUpdate(nextProps: any) {
//     if (!_.isEqual(this.props.data, nextProps.data)) {
//       console.log('render');
//       return true;
//     }
//     return false;
//   }
//   componentDidMount() {
//     Dimensions.addEventListener('change', this.change);
//   }

//   componentWillMount() {
//     Dimensions.removeEventListener('change', () => { })
//   }
//   change = ({ window }: any) => {
//     const { width, height } = window;
//     if (width < height) {
//       this.setState({ orientation: 'portrait', height, width, tyle: 1 });
//       this._deltaY = new Animated.Value(Screen.height - 100);
//     } else {
//       this.setState({ orientation: 'landscape', height, width, tyle: height / width });
//       this._deltaY = new Animated.Value(Screen.width - 100);
//     }

//   }
//   renderCluster = (cluster: any, onPress: Function) => {
//     const pointCount = cluster.pointCount,
//       coordinate = cluster.coordinate,
//       clusterId = cluster.clusterId

//     return (
//       <Marker identifier={`cluster-${clusterId}`} coordinate={coordinate} onPress={onPress}>
//         <View style={styles.clusterContainer}>
//           <Text style={styles.clusterText}>
//             {pointCount}
//           </Text>
//         </View>
//       </Marker>
//     )
//   }
//   renderMarker = (pin: any) => {
//     return (
//       <CustomMarker id={pin.id} identifier={`pin-${pin.id}`} key={pin.id} coordinate={pin.location} />
//     )
//   }

//   onRegionChangeComplete = (region: any) => {
//     this.props.getMapData(this.state.page + 1);
//     this.setState({
//       page: this.state.page + 1
//     })
//   }

//   getBoundingBox = (region) => ([
//     region.longitude - region.longitudeDelta / 2, // westLng - min lng 
//     region.latitude - region.latitudeDelta / 2, // southLat - min lat 
//     region.longitude + region.longitudeDelta / 2, // eastLng - max lng 
//     region.latitude + region.latitudeDelta / 2 // northLat - max lat 
//   ])
  
//   render() {
//     return (
//       <SafeAreaView style={styles.container}>
//         <ClusteredMapView
//           provider={PROVIDER_GOOGLE}
//           style={styles.map}
//           data={this.props.data}
//           onRegionChangeComplete={this.onRegionChangeComplete}
//           renderMarker={this.renderMarker}
//           renderCluster={this.renderCluster}
//           initialRegion={{ latitude: 10, longitude: 108, latitudeDelta: 12, longitudeDelta: 12 }}>
//         </ClusteredMapView>
//         <Text onPress={() => this.props.loadMoreData()}>load more</Text>
//         <Animated.View
//           style={{
//             height: 40,
//             alignItem: 'center',
//             zIndex: 1,
//             paddingHorizontal: 20,
//           }}
//           pointerEvents={'box-none'}
//         >
//           {/* <TextInputA
//             placeholder="search"
//             style={[styles.textInput, {
//               borderWidth: this._deltaY.interpolate({
//                 inputRange: [0, Screen.height - 600, Screen.height - 90],
//                 outputRange: [1, 0.1, 0],
//                 extrapolateRight: 'clamp'
//               })
//             }]}
//           /> */}
//         </Animated.View>
//         <SafeAreaView style={styles.panelContainer} pointerEvents={'box-none'}>
//           <Animated.View
//             pointerEvents={'box-none'}
//             style={[styles.panelContainer, {
//               backgroundColor: 'transparent',
//               opacity: this._deltaY.interpolate({
//                 inputRange: [0, Screen.height - 90],
//                 outputRange: [0.5, 0],
//                 extrapolateRight: 'clamp'
//               })
//             }]}
//           >
//           </Animated.View>
//           <Interactable.View
//             verticalOnly={true}
//             snapPoints={[{ y: 0 }, { y: Screen.height - 300 }, { y: Screen.height - 90 }]}
//             boundaries={{ top: -300 }}
//             initialPosition={{ y: this.state.height - 90 }}
//             animatedValueY={this._deltaY}>
//             <Animated.View
//               style={[styles.panel, {
//                 backgroundColor: 'white',
//                 opacity: this._deltaY.interpolate({
//                   inputRange: [Screen.height - 95, Screen.height - 90],
//                   outputRange: [1, 1],
//                   extrapolateRight: 'clamp'
//                 })
//               }]}
//             >
//               <SafeAreaView>
//                 <View style={[styles.panelHeader]}>
//                   <View style={styles.panelHandle} />
//                 </View>
//                 <Text style={styles.panelTitle}>San Francisco Airport</Text>
//                 <Text style={styles.panelSubtitle}>International Airport - 40 miles away</Text>
//                 <View style={styles.panelButton}>
//                   <Text style={styles.panelButtonTitle}>Directions</Text>
//                 </View>
//                 <View style={styles.panelButton}>
//                   <Text style={styles.panelButtonTitle}>Search Nearby</Text>
//                 </View>
//                 <Image style={styles.photo} source={require('assets/logo/airport.jpg')} />
//               </SafeAreaView>
//             </Animated.View>
//           </Interactable.View>
//         </SafeAreaView>

//       </SafeAreaView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // justifyContent: 'center',
//     // alignItems: 'center',
//     backgroundColor: '#efefef',
//   },
//   textInput: {
//     borderRadius: 2,
//     flex: 1,
//     backgroundColor: 'white',
//     shadowColor: 'black',
//     shadowOffset: { width: 2, height: 2 },
//     shadowRadius: 2,
//     shadowOpacity: 0.2,

//   },
//   panelContainer: {
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//   },
//   panel: {
//     height: Screen.height + 300,
//     padding: 20,
//     //borderTopLeftRadius: 20,
//     //borderTopRightRadius: 20,
//     shadowColor: 'black',
//     shadowOffset: { width: 0, height: 0 },
//     shadowRadius: 5,
//     shadowOpacity: 0.4,
//   },
//   panelHeader: {
//     alignItems: 'center'
//   },
//   panelHandle: {
//     width: 40,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: '#00000040',
//     marginBottom: 10
//   },
//   panelTitle: {
//     fontSize: 27,
//     height: 35
//   },
//   panelSubtitle: {
//     fontSize: 14,
//     color: 'gray',
//     height: 30,
//     marginBottom: 10
//   },
//   panelButton: {
//     padding: 20,
//     borderRadius: 10,
//     backgroundColor: '#459FED',
//     alignItems: 'center',
//     marginVertical: 10
//   },
//   panelButtonTitle: {
//     fontSize: 17,
//     fontWeight: 'bold',
//     color: 'white'
//   },
//   photo: {
//     width: Screen.width - 40,
//     height: 225,
//     marginTop: 30
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject
//   },
//   clusterContainer: {
//     width: 30,
//     height: 30,
//     padding: 6,
//     borderWidth: 1,
//     borderRadius: 15,
//     alignItems: 'center',
//     borderColor: '#65bc46',
//     justifyContent: 'center',
//     backgroundColor: 'white',
//   },
//   clusterText: {
//     fontSize: 13,
//     color: '#65bc46',
//     fontWeight: '500',
//     textAlign: 'center',
//   },
//   controlBar: {
//     top: 48,
//     left: 25,
//     right: 25,
//     height: 40,
//     borderRadius: 20,
//     position: 'absolute',
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     backgroundColor: 'white',
//     justifyContent: 'space-between',
//   },
//   button: {
//     paddingVertical: 8,
//     paddingHorizontal: 20,
//   },
//   novaLabLogo: {
//     right: 8,
//     bottom: 8,
//     width: 64,
//     height: 64,
//     position: 'absolute',
//   },
//   text: {
//     fontSize: 16,
//     fontWeight: 'bold'
//   },
//   clusterContainer: {
//     width: 24,
//     height: 24,
//     borderWidth: 1,
//     borderRadius: 12,
//     alignItems: 'center',
//     borderColor: '#65bc46',
//     justifyContent: 'center',
//     backgroundColor: '#fff'
//   },
//   counterText: {
//     fontSize: 14,
//     color: '#65bc46',
//     fontWeight: '400'
//   },
//   calloutStyle: {
//     width: 64,
//     height: 64,
//     padding: 8,
//     borderRadius: 8,
//     borderColor: '#65bc46',
//     backgroundColor: 'white',
//   },
// });
