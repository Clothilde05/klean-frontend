import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { connect } from 'react-redux';

function AdminPanel(props) {

    return (
        //Composant utilisé lors du développement pour accéder à tous les autres composants
        <View style={styles.container}>  
            <Button title="login" onPress={() => props.login("7SbwmGME6r2decUp5R5NThv2cQevC1ae")} />
            <Button title="signOut" onPress={() => props.signOut()} />
            <Button title="InvitedMapScreen"
                onPress={() => props.navigation.navigate('InvitedMapScreen')} />
            <Button title="InvitedEventDetail"
                onPress={() => props.navigation.navigate('InvitedEventDetail')} />
            <Button title="Login"
                onPress={() => props.navigation.navigate('Login')} />
            <Button title="SignUp"
                onPress={() => props.navigation.navigate('SignUp')} />
        </View>
    );
}


function mapDispatchToProps(dispatch) {
    return {
        login: function (token) {
            dispatch({ type: 'login', token })
        },
        signOut: function () {
            dispatch({ type: 'signOut' })
        }
    }
}

function mapStateToProps(state) {
    return { tokenObj: state.tokenObj }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: "center",
        alignItems: "center"
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminPanel);

