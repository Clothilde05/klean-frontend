import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { colors } from '../lib/colors';
import { typography } from '../lib/typography';
import NewsCards from '../lib/NewsCards';
import ScreenTitles from '../lib/ScreenTitles';

function News(props) {

    //Fake data
    let DATA1 = 
        [{
            newTitle: "World CleanUp Day",
            newsStartingDate: new Date(2021, 9, 18),
            newsDescription: "Journée mondiale du nettoyage de notre planète",
            newsImage: require('../assets/imagesKlean/WorldCleanUpDay.png'),
            newsCoordinates: { longitude: 40.129283, latitude: 2.837364, },
            newsLike: 3,
        },
        {
            newTitle: "We Love Green 2021",
            newsStartingDate: new Date(2021, 9, 11),
            newsDescription: "Un festival éco-responsable dans un écrin de verdure, le Bois de Vincennes",
            newsImage: require('../assets/imagesKlean/WeLoveGreen.jpg'),
            newsCoordinates: { longitude: 40.129283, latitude: 2.837364, },
            newsLike: 3,
        },
        {
            newTitle: "La Semaine Européenne de la Réduction des déchets ",
            newsStartingDate: new Date(2021, 11, 20),
            newsDescription: "Mobilisation pour mettre en lumière et essaimer les bonnes pratiques de production et de consommation qui vont dans le sens de la prévention des déchets",
            newsImage: require('../assets/imagesKlean/SemaineEuropeene.png'),
            newsCoordinates: { longitude: 40.129283, latitude: 2.837364, },
            newsLike: 3,
        },
        {
            newTitle: "Talents for the planet",
            newsStartingDate: new Date(2021, 10, 21),
            newsDescription: "L'événement des formations, des métiers et de l'emploi de la transition écologique et sociétale",
            newsImage: require('../assets/imagesKlean/TalentsForThePlanet.jpeg'),
            newsCoordinates: { longitude: 40.129283, latitude: 2.837364, },
            newsLike: 3,
        }]


        let DATA2 = 
        [{
            newTitle: "CleanUp - Marseille",
            newsStartingDate: new Date(2021, 9, 19),
            newsDescription: "4ème édition du World CleanUp Day, ramassage des différentes plages",
            newsImage: require('../assets/imagesKlean/WorldCleanUpDayMarseille.jpeg'),
            newsCoordinates: { longitude: 40.129283, latitude: 2.837364, },
            newsLike: 3,
        }, 
        {
            newTitle: "Congrès mondial de la nature de l'UICN",
            newsStartingDate: new Date(2021, 9, 3),
            newsDescription: "Organisé tous les quatre ans, cet événement international contribue à inscrire la biodiversité dans une stratégie nationale et mondiale",
            newsImage: require('../assets/imagesKlean/CongresUICN.png'),
            newsCoordinates: { longitude: 40.129283, latitude: 2.837364, },
            newsLike: 3,
        }, 
        {
            newTitle: "Enercoop PACA - Peyrolles",
            newsStartingDate: new Date(2021, 8, 28),
            newsDescription: "Week-end ambassadeurs : se former, échanger et s'organiser pour organiser des actions concrètes pour l'année à venir ",
            newsImage: require('../assets/imagesKlean/EnercoopPACA.png'),
            newsCoordinates: { longitude: 40.129283, latitude: 2.837364, },
            newsLike: 3,
        }]

    return (
        <View style={styles.container}>
                <SafeAreaView style={styles.header}>
                    <View style={styles.dull}></View>
                    <Text style={styles.mainTitle}> ACTUALITÉS </Text>
                </SafeAreaView>
                <ScrollView> 

                    <ScreenTitles title="Événements populaires en France" titleType="secondary" />
                        <View style={styles.event}>
                            <NewsCards data={DATA1}/>
                        </View>

                    <ScreenTitles title="Événements à proximité" titleType="secondary" />

                        <View style={styles.event}>
                            <NewsCards data={DATA2} />
                        </View>

                </ScrollView>
        </View>
    );
}

function mapStateToProps(state) {
    return { tokenObj: state.tokenObj }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    mainTitle: {
        fontSize: typography.h1.fontSize,
        fontFamily: typography.h1.fontFamily,
        paddingVertical: 10,
        textAlign: "center"
    },
    event: {
        marginTop: 9,
        marginBottom: 18,
    }
});

export default connect(mapStateToProps,null)(News);

