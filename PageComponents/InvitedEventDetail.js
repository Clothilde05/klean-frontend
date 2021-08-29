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
import PROXY from "../proxy.js";

function InvitedEventDetail(props) {

  let idCW = props.cwIdInvited;

  const [cleanwalk, setCleanwalk] = useState(null);

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

  function backArrow() {
    props.resetCwIdInvited();
    props.navigation.navigate("InvitedMapScreen");
  }

  if (cleanwalk === null) {
    return <View style={{ flex: 1, backgroundColor: colors.white }}></View>;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <ImageBackground
            style={styles.banner}
            source={require("../assets/imagesKlean/BannerCleanwalk.jpg")}
          >
            <ButtonElement
              style={styles.backButton}
              typeButton="back"
              onPress={() => backArrow()}
            />
            <ButtonElement
              style={styles.goButton}
              typeButton="go"
              disabled={true}
            />
          </ImageBackground>

          <View style={styles.generalInfoCleanwalk}>
            <Text style={typography.h2}>{cleanwalk.cleanwalkTitle}</Text>
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
              <Participants
                data={dataParticipants(
                  cleanwalk.admin,
                  cleanwalk.participantsList
                )}
              />
            </View>

            <View style={styles.chat}>
              <ScreenTitles titleType="secondary" title="Chat" />
              <ButtonElement
                typeButton="chat"
                disabled={true}
                onPress={() => props.navigation.navigate("ChatProfilStack")}
              />
            </View>
          </View>

          <View style={styles.confirmButton}>
            <ButtonElement
              typeButton="middleSecondary"
              text="Participer"
              onPress={() => {
                props.cleanwalkId;
                props.navigation.navigate("SignUp");
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    resetCwIdInvited: function () {
      dispatch({ type: "resetCwIdInvited" });
    },
  };
}

function mapStateToProps(state) {
  return { 
    tokenObj: state.tokenObj, 
    cwIdInvited: state.cwIdInvited };
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
    flexDirection: 'column',
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

export default connect(mapStateToProps, mapDispatchToProps)(InvitedEventDetail);
