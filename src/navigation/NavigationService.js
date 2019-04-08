//@flow
import {
    NavigationActions,
    StackActions
} from 'react-navigation';
import type { Route } from 'react-navigation';
let navigationRef;

const setNavigationRoot = (ref: any) => {
    return  navigationRef = ref;
 }

 const navigate = (routeName: any , params: any) => {
     navigationRef.dispatch(
         NavigationActions.navigate({
             routeName,
             ...(params && params) 
         })
     )
 }

 const reset = (routeName: any) => {
    navigationRef.dispatch(
        StackActions.reset({
            index: 0,
            actions:[
                NavigationActions.navigate({ routeName })
            ]
        })
    );
 }
 export default {
     setNavigationRoot,
     navigate,
     reset
 }