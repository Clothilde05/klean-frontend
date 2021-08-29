import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, StatusBar, SafeAreaView, ActivityIndicator } from 'react-native';
import ScreenTitles from '../lib/ScreenTitles'
import ListCities from '../lib/ListCities';
import { connect } from 'react-redux';
import { colors } from '../lib/colors';
import { typography } from '../lib/typography';
import { windowDimensions } from '../lib/windowDimensions';
import PROXY from '../proxy';

function CitiesRanking(props) {

    let token = props.tokenObj.token

    const [listCities, setListCities] = useState(null)

    useEffect(() => {
        async function loadData() {
            //Requête pour récupérer les villes enregistrée en base de données et afficher leur ranking
            let rawResponse = await fetch(PROXY + `/load-cities-ranking?token=${token}`);
            let response = await rawResponse.json();
            if (response.result) {
                setListCities(response.ranking)
            }
        };
        loadData();
    }, [token]);

    if (listCities === null) {
        return (
            <View style={styles.wait}>
                <ActivityIndicator size="large" color={colors.primary}/>
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <SafeAreaView>
                    <Text style={styles.mainTitle}> CLASSEMENT DES VILLES </Text>
                </SafeAreaView>
                <ScreenTitles title="Liste des villes" titleType="secondary" />
                <ListCities data={listCities} />
                <ScreenTitles title="Ma ville" titleType="secondary" />
                <View style={styles.listItem}>
                    <Text style={styles.ranking}>#{listCities.find(obj => obj.isMyCity).ranking}</Text>
                    <Text style={styles.city}>{listCities.find(obj => obj.isMyCity).city}</Text>
                    <Text style={styles.points}>{listCities.find(obj => obj.isMyCity).points}pts</Text>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return { tokenObj: state.tokenObj }
}

const styles = StyleSheet.create({
    wait: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: StatusBar.currentHeight,
        paddingBottom: 40,
    },
    mainTitle: {
        fontSize: typography.h1.fontSize,
        fontFamily: typography.h1.fontFamily,
        paddingVertical: 10,
        textAlign: "center"
    },
    listItem: {
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: colors.grey,
        alignItems: "center",
        width: windowDimensions.width,
        paddingVertical: 9,
        paddingHorizontal: 8,
        marginBottom: 6
    },
    points: {
        marginLeft: "auto",
        textAlign: "right",
        width: windowDimensions.width * 0.25,
        fontSize: typography.bodyLightItalic.fontSize,
        fontFamily: typography.bodyLightItalic.fontFamily,
        color: "black"
    },
    ranking: {
        marginRight: "auto",
        width: windowDimensions.width * 0.25,
        fontSize: typography.body.fontSize,
        fontFamily: typography.body.fontFamily,
        color: "black"
    },
    city: {
        textAlign: "center",
        fontSize: typography.body.fontSize,
        fontFamily: typography.body.fontFamily,
        color: "black"
    }
});

export default connect(
    mapStateToProps,
    null
)(CitiesRanking);
