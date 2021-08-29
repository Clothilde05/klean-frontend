import React from 'react';
import { StyleSheet,View } from 'react-native';
import CarrousselOnboarding from '../lib/CarrousselOnboarding';
import ButtonElement from '../lib/ButtonElement';

function OnBoarding(props) {

    return (
        <View style={styles.container}>
            <CarrousselOnboarding />
            <View style={styles.button}>
                <ButtonElement
                    text='Skip'
                    typeButton='middleSecondary'
                    onPress={() => props.navigation.navigate('InvitedMapScreen')}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: "center"
    },
    button: {
        marginBottom: 50
    }
});

export default OnBoarding;
