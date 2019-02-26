import {
    NavigationActions,
    StackActions
} from 'react-navigation';

let navigationRef;

const setNavigationRoot = (ref) => {
    return  navigationRef = ref;
 }

 const navigate = (routeName, params) => {
     navigationRef.dispatch(
         NavigationActions.navigate({
             routeName,
             ...(params && params) 
         })
     )
 }

 const reset = (routeName) => {
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