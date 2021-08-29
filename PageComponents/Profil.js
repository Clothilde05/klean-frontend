import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, StatusBar, Image, SafeAreaView, ActivityIndicator } from "react-native";
import { colors } from "../lib/colors";
import { typography } from "../lib/typography";
import ScreenTitles from "../lib/ScreenTitles";
import ButtonElement from "../lib/ButtonElement";
import CleanwalkList from "../lib/CleanwalkList";
import { connect } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { windowDimensions } from "../lib/windowDimensions";
import ChangePassword from "../lib/ChangePassword";
import { ScrollView } from "react-native-gesture-handler";
import * as ImagePicker from 'expo-image-picker';
import PROXY from "../proxy";

function Profil(props) {

  const [isCwOnOrganize, setIsCwOnOrganize] = useState(true);
  const [isStatOnPerso, setIsStatOnPerso] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [listCWparticipate, setListCWparticipate] = useState([]);
  const [listCWorganize, setListCWorganize] = useState([]);
  const [infosUser, setInfosUser] = useState("");
  const [badge, setBadge] = useState({
    bumblebin: {
      name: "Bumble Bin",
      img: require("../assets/imagesKlean/Robot1Carre.png"),
    },
    optimusklean: {
      name: "Optimus Klean",
      img: require("../assets/imagesKlean/Robot2Carre.png"),
    },
    trashexterminator: {
      name: "Trash Exterminator",
      img: require("../assets/imagesKlean/Robot3Carre.png"),
    },
  });
  const [statPerso, setStatPerso] = useState(null);
  const [statCity, setStatCity] = useState(null);

  useEffect(() => {
    const loadProfil = async () => {
      //Requête pour afficher les éléments du profil de l'utilisateur
      let rawResponse = await fetch(`${PROXY}/load-profil/${props.tokenObj.token}`);
      let response = await rawResponse.json();
      if (response.result) {
        setListCWparticipate(response.infosCWparticipate);
        setListCWorganize(response.infosCWorganize);
        setInfosUser(response.infosUser);
        setStatPerso(response.statPerso);
        setStatCity(response.statCity);
      }
    };
    loadProfil();
  }, [props.cwsStore]);

  //Demande d'autorisation pour ouvrir la galerie du téléphone
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  //Aller chercher une photo dans la galerie du téléphone
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.cancelled) {
      return result.uri;
    } else {
      return false
    }
  };

  function modal() {
    setModalVisible(false);
  }

  //Déconnexion
  const signoutAppli = () => {
    props.signOut();
    AsyncStorage.setItem('token', JSON.stringify({ token: "XeDLDMr3U4HSJSl74HJpKD", IsFirstVisit: false }));
  }

  //Liste des cleanwalks auxquelles l'utilisateur participe
  let cwListParticipate;
  if (listCWparticipate.length > 0) {
    cwListParticipate = (
      <View style={styles.list}>
        <CleanwalkList
          onPress={() =>
            props.navigation.navigate("ConnectedEventDetailProfilStack")
          }
          listCW={listCWparticipate}
        />
      </View>
    );
  } else {
    cwListParticipate = (
      <View style={styles.ctTextNoCw}>
        <Text style={styles.textNoCw}>
          {"Vous ne participez à aucune cleanwalk :\("}
        </Text>
      </View>
    );
  }

  //Liste des cleanwalks que l'utilisateur organise
  let cwListOrganize;
  if (listCWorganize.length > 0) {
    cwListOrganize = (
      <View style={styles.list}>
        <CleanwalkList
          onPress={() =>
            props.navigation.navigate("ConnectedEventDetailProfilStack")
          }
          listCW={listCWorganize}
        />
      </View>
    );
  } else {
    cwListOrganize = (
      <View style={styles.ctTextNoCw}>
        <Text style={styles.textNoCw}>
        {"Vous n'organisez pas encore de cleanwalks :\("}
        </Text>
      </View>
    );
  }

  if (
    cwListParticipate === null ||
    cwListOrganize === null ||
    statPerso === null ||
    statCity === null 
  ) {
    return (
      <View style={styles.wait}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  } else {

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.header}>
          <View style={styles.dull}></View>
          <Text style={styles.mainTitle}> MON PROFIL </Text>
          <View style={styles.logout}>
            <ButtonElement
              typeButton="logout"
              onPress={ () => signoutAppli() }
            />
          </View>
        </SafeAreaView>

        <ScrollView>
          {isCwOnOrganize ? (
            <>
              <ScreenTitles title="Cleanwalks" titleType="secondary" />
              <View style={styles.switch}>
                <ButtonElement
                  text="J'organise"
                  typeButton="middleFine"
                  outline={false}
                  onPress={() => setIsCwOnOrganize(true)}
                />
                <ButtonElement
                  text="Je participe"
                  typeButton="middleFine"
                  outline={true}
                  onPress={() => setIsCwOnOrganize(false)}
                />
              </View>
              {cwListOrganize}
            </>
          ) : (
            <>
              <ScreenTitles title="Cleanwalks" titleType="secondary" />
              <View style={styles.switch}>
                <ButtonElement
                  text="J'organise"
                  typeButton="middleFine"
                  outline={true}
                  onPress={() => setIsCwOnOrganize(true)}
                />
                <ButtonElement
                  text="Je participe"
                  typeButton="middleFine"
                  outline={false}
                  onPress={() => setIsCwOnOrganize(false)}
                />
              </View>
              {cwListParticipate}
            </>
          )}

          {isStatOnPerso ? (
            <>
              <ScreenTitles title="Statistiques" titleType="secondary" />
              <View style={styles.switch}>
                <ButtonElement
                  text="Personnelles"
                  typeButton="middleFine"
                  outline={false}
                  onPress={() => setIsStatOnPerso(true)}
                />
                <ButtonElement
                  text="Ville"
                  typeButton="middleFine"
                  outline={true}
                  onPress={() => setIsStatOnPerso(false)}
                />
              </View>
              <View style={styles.stat}>
                <Image
                  style={styles.robot}
                  source={
                    statPerso < 20
                      ? badge.bumblebin.img
                      : statPerso < 50
                      ? badge.optimusklean.img
                      : badge.trashexterminator.img
                  }
                />
                <View style={styles.statBody}>
                  <Text style={styles.statBodyTitle}>
                    {statPerso < 20
                      ? badge.bumblebin.name
                      : statPerso < 50
                      ? badge.optimusklean.name
                      : badge.trashexterminator.name}
                  </Text>
                  <Text style={styles.statBodyText}>
                    {statPerso} Cleanwalks réalisées
                  </Text>
                </View>
              </View>
            </>
          ) : (
            <>
              <ScreenTitles title="Statistiques" titleType="secondary" />
              <View style={styles.switch}>
                <ButtonElement
                  text="Personnelles"
                  typeButton="middleFine"
                  outline={true}
                  onPress={() => setIsStatOnPerso(true)}
                />
                <ButtonElement
                  text="Ville"
                  typeButton="middleFine"
                  outline={false}
                  onPress={() => setIsStatOnPerso(false)}
                />
              </View>
              <View style={styles.stat}>
                <Image
                  style={styles.robot}
                  source={require("../assets/imagesKlean/CityPicto.png")}
                />
                <View style={styles.statBody}>
                  <Text style={styles.statBodyTitle}>
                    {statCity["city_info"][0].cityName}
                  </Text>
                  <Text style={styles.statBodyText}>
                    {statCity.points} points
                  </Text>
                </View>
              </View>
            </>
          )}

          <ScreenTitles
            title="Informations personnelles"
            titleType="secondary"
          />
          <View style={styles.infoPerso}>

          <Image
            style={styles.avatar}
            source={{uri: infosUser.avatarUrl}}
            
          />
            <View style={styles.statBody}>
              <Text style={styles.statBodyTitle}>{infosUser.firstName}</Text>
              <Text style={styles.statBodyText}>{infosUser.lastName}</Text>
              <Text style={styles.statBodyText}>{infosUser.email}</Text>
              <ButtonElement
                text="Modifier mot de passe"
                typeButton="password"
                onPress={() => setModalVisible(true)}
              />
              <ButtonElement
                text="Modifier ma photo"
                typeButton="password"

                onPress={async () => {
                  let image = await pickImage();
                  
                  if (image) {
                  var data = new FormData();
                  data.append('avatar', {
                    uri: image,
                    type: 'image/jpeg',
                    name: 'avatar.jpg',
                  });

                  //Requête pour enregistrer la photo dans Cloudindary et l'URL en base de données
                  var rawResponse = await fetch (PROXY + `/upload-photo/${props.tokenObj.token}`, {
                    method: 'POST',
                    body: data
                  });
              
                  var response = await rawResponse.json();

                  if(response.result) {
                  let copy = {...infosUser}
                  copy.avatarUrl = response.resultCloudinary.secure_url
                  setInfosUser(copy)
                  }

                }}}
                
              />
            </View>
          </View>
          <ChangePassword
            visible={modalVisible}
            close={modal}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wait: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: StatusBar.currentHeight,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dull: {
    paddingLeft: 35,
  },
  logout: {
    paddingRight: 10,
  },
  mainTitle: {
    fontSize: typography.h1.fontSize,
    fontFamily: typography.h1.fontFamily,
    paddingVertical: 10,
    textAlign: "center",
  },
  switch: {
    flexDirection: "row",
    alignSelf: "center",
  },
  list: {
    marginBottom: 30
  },
  stat: {
    flexDirection: "row",
    height: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  robot: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderColor: colors.grey,
    borderWidth: 1,
    marginRight: 15,
  },
  statBody: {
    marginLeft: 15,
  },
  statBodyTitle: {
    fontSize: typography.h2.fontSize,
    fontFamily: typography.h2.fontFamily,
  },
  statBodyText: {
    fontSize: typography.bodyLight.fontSize,
    fontFamily: typography.bodyLight.fontFamily,
  },
  avatar: {
    width: 100,
    height: 100,
    backgroundColor: colors.grey,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginRight: 15,
  },
  infoPerso: {
    flexDirection: "row",
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
  },
  ctTextNoCw: {
    height: windowDimensions.height * 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
});

function mapDispatchToProps(dispatch) {
  return {
    signOut: function () {
      dispatch({ type: "signOut" });
    },
  };
}

function mapStateToProps(state) {
  return { tokenObj: state.tokenObj, cwsStore: state.cwsStore };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profil);
