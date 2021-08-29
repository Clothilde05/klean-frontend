import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ImageBackground, SafeAreaView, ScrollView, StatusBar } from "react-native";
import { connect } from "react-redux";
import ScreenTitles from "../lib/ScreenTitles.js";
import ButtonElement from "../lib/ButtonElement";
import Participants from "../lib/Participants";
import BadgesList from "../lib/BadgesList.js";
import { windowDimensions } from "../lib/windowDimensions.js";
import { typography } from "../lib/typography.js";
import { colors } from "../lib/colors.js";
import changeDateFormat from "../lib/changeDateFormat";
import { showLocation } from "react-native-map-link";
import PROXY from "../proxy.js";

function ConnectedEventDetailMapStack(props) {

    let idCW = props.cwIdMapStack;

    const [cleanwalk, setCleanwalk] = useState(null);
    const [error, setError] = useState(null);

    //L'admin est retiré des participants et sera considéré comme organisateur
    const dataParticipants = (admin, participants) => {
        participants.unshift(admin);
        return participants;
    };

    useEffect(() => {
        async function loadData() {
            //Requête pour charger la cleanwalk enregistrée en base de données grâce à son ID
            const responseCleanwalk = await fetch(PROXY + `/load-cleanwalk/${idCW}/${props.tokenObj.token}`);
            const jsonResponseCleanwalk = await responseCleanwalk.json();

            setCleanwalk(jsonResponseCleanwalk.cleanwalk);
        }
        loadData();
    }, []);

    let participate = async () => {
        //Requête pour inscrire un participant à une cleanwalk
        let data = await fetch(PROXY + "/subscribe-cw", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `cleanwalkID=${props.cwIdMapStack}&token=${props.tokenObj.token}`,
        });

        let body = await data.json();

        //Sauvegarde de cette information dans le store (cwsStore)
        if (body.result == true) {
            props.addCwsPart(idCW);
            props.navigation.navigate("Profil");
        } if (body.result == false){
            setError(body.error)
        }
    };

    const unsubscribeCw = async () => {
        //Requête pour désinscrire un participant à une clanwalk
        let rawResponse = await fetch(`${PROXY}/unsubscribe-cw`, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `token=${props.tokenObj.token}&idCW=${idCW}`
        });

        let body = await rawResponse.json();

        //Sauvegarde de cette information dans le store (cwsStore)
        if (body.result == true) {
            props.desinsCws(idCW);
            props.navigation.navigate("Profil");
        } if (body.result == false){
            setError(body.error)
        }
    }

    const deleteCw = async () => {
        //Requête pour supprimer une cleanwalk
        let rawResponse = await fetch(`${PROXY}/delete-cw/${props.tokenObj.token}/${idCW}`, {
            method: 'DELETE'
        });

        let body = await rawResponse.json();

        //Sauvegarde de cette information dans le store (cwsStore)
        if (body.result == true) {
            props.supCws(idCW);
            props.navigation.navigate("Profil");
        } if (body.result == false){
            setError(body.error)
        }
    }

    //Cleanwalks auxquelles l'utilisateur participe
    const checkCwsParticipate = props.cwsStore.infosCWparticipate.findIndex(
        index => index.toString() === idCW.toString()
    );

    //Cleanwalks que l'utilisateur organise
    const checkCwsOrganize = props.cwsStore.infosCWorganize.findIndex(
        index => index.toString() === idCW.toString()
    );

    let btnActive = false;
    let confirmButton;

    //Boutons générés en fonction 
    if (checkCwsParticipate !== -1) {
        confirmButton = <View style={styles.confirmButton}>
                            <ButtonElement
                                typeButton="middleSecondary"
                                text="Se désinscrire"
                                onPress={ () => unsubscribeCw() }
                            />
                        </View>;
        btnActive = true;
    } else if (checkCwsOrganize !== -1) {
        confirmButton = <View style={styles.confirmButton}>
                            <ButtonElement
                                typeButton="middleSecondary"
                                text="Supprimer la cleanwalk"
                                onPress={ () => deleteCw() }
                            />
                        </View>;
        btnActive = true;
    } else {
        confirmButton = <View style={styles.confirmButton}>
                            <ButtonElement
                                typeButton="middleSecondary"
                                text="Participer"
                                onPress={ () => participate() }
                            />
                        </View>;
    }

    let errors = (
        <View>
            <Text>{error};</Text>
        </View>
    );

    if (cleanwalk === null) {
        return <View style={{ flex: 1, backgroundColor: colors.white }}></View>;
    } else {

        return (

            <SafeAreaView style={styles.container}>
                <ScrollView>

                    <ImageBackground
                        style={styles.banner}
                        source={require('../assets/imagesKlean/BannerCleanwalk.jpg')}
                    >
                        <ButtonElement
                            style={styles.backButton}
                            typeButton="back"
                            onPress={() => props.navigation.navigate('ConnectedMapScreen')}
                        />
                        {btnActive ? 
                            <ButtonElement
                                style={styles.goButton}
                                typeButton="go"
                                onPress={() => showLocation({
                                    latitude: cleanwalk.cleanwalkCoordinates.latitude,
                                    longitude: cleanwalk.cleanwalkCoordinates.longitude,
                                    title: cleanwalk.cleanwalkTitle,
                                })} 
                            /> : 
                            <ButtonElement
                                style={styles.goButton}
                                typeButton="go"
                                disabled={true}
                            />
                        }
                    </ImageBackground>

                    <View style={styles.generalInfoCleanwalk}>
                        <Text style={typography.h2}>
                            {cleanwalk.cleanwalkTitle}
                        </Text>
                        <Text style={typography.bodyLight}>
                            {cleanwalk.cleanwalkCity.cityName}
                        </Text>
                        <Text style={typography.bodyLight}>
                            Début : {changeDateFormat(cleanwalk.startingDate)}
                        </Text>
                        <Text style={typography.bodyLight}>
                            Fin : {changeDateFormat(cleanwalk.endingDate)}
                        </Text>
                    </View>

                    <View style={styles.descriptionCleanwalk}>
                        <Text style={typography.h3}>Description</Text>
                        <View style={styles.cleanwakDescriptionContainer}>
                            <Text style={typography.bodyLight}>
                                {cleanwalk.cleanwalkDescription}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.badges}>
                        <BadgesList data={cleanwalk.toolBadge} />
                    </View>

                    <View>
                        <ScreenTitles titleType="secondary" title="Participants" />
                    </View>

                    <View style={styles.participantsContainer}>
                        <View style={styles.participantsList}>
                            <Participants data={dataParticipants(cleanwalk.admin, cleanwalk.participantsList)} />
                        </View>

                        <View style={styles.chat}>
                            <ScreenTitles titleType="secondary" title="Chat" />
                            <ButtonElement
                                typeButton="chat"
                                btnActive={btnActive}
                                onPress={() => props.navigation.navigate('ChatMapStack')}
                            />
                        </View>
                    </View>

                    {errors}
                    {confirmButton}

                </ScrollView>
            </SafeAreaView>

        );
    }

}

function mapDispatchToProps(dispatch) {
    return {
        desinsCws: function (idCW) {
            dispatch({ type: "desinsCws", idCW });
        },
        addCwsPart: function (idCW) {
            dispatch({ type: "addCwsPart", idCW });
        },
        supCws: function (idCW) {
            dispatch({ type: "supCws", idCW });
        }
    };
}

function mapStateToProps(state) {
    return { tokenObj: state.tokenObj, cwIdMapStack: state.cwIdMapStack, cwsStore: state.cwsStore };
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: "#fff",
    },
    banner: {
        width: windowDimensions.width,
        height: 100,
        marginTop: 29,
        justifyContent: "space-between",
        paddingLeft: 17,
        paddingRight: 17,
        flexDirection: "row",
        alignItems: "center",
        marginTop: StatusBar.currentHeight || 0,
    },
    backButton: {
        position: "absolute",
        zIndex: 10,
    },
    goButton: {
        position: "absolute",
        zIndex: 10,
    },
    generalInfoCleanwalk: {
        marginTop: 11,
        marginBottom: 11,
        marginLeft: 18,
    },
    descriptionCleanwalk: {
        marginBottom: 11,
        marginLeft: 18,
    },
    cleanwakDescriptionContainer: {
        marginRight: 18,
    },
    badges: {
        marginLeft: 11,
        marginBottom: 30,
    },
    participantsContainer: {
        flexDirection: "column",
        height: 300,
    },
    participantsList: {
        marginTop: 11,
        marginBottom: 30,
    },
    chat: {
        marginTop: 11,
        marginRight: 18,
    },
    confirmButton: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 11,
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedEventDetailMapStack);