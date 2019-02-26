import React from 'react';
import {
    SafeAreaView,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import LoginView from './LoginView';
import { login } from 'action//authAction';
class LoginContainer extends React.Component {

    render() {
        return  <LoginView {...this.props} />
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.get('user').toJS()
    }
}

const mapDispatchToProps = (dispatch) => ({
    login: ( { username, password }) => dispatch(login({ username, password }))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
