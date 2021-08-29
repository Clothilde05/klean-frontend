import React from "react";
import { StyleSheet, View, FlatList, Image, Text } from "react-native";
import { typography } from "./typography";
import { windowDimensions } from "./windowDimensions";

function CarrousselOnboarding(props) {

  let renderItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={item.img}
          resizeMode="contain"
        />
        <View style={styles.body}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.desc}>{item.desc}</Text>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={DATA}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      horizontal={true}
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      bounces={false}
    />
  );

}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  image: {
    width: windowDimensions.width,
    flex: 0.7
  },
  body:{
    width: windowDimensions.width,
    paddingHorizontal: 50
  },
  title: {
    fontSize: typography.h1.fontSize,
    fontFamily: typography.h1.fontFamily,
    paddingBottom: 10
  },
  desc: {
    fontSize: typography.body.fontSize,
    fontFamily: typography.body.fontFamily
  }
});

export default CarrousselOnboarding;

let DATA = [
  {
    title: "Salut ! Bienvenue sur Klean.",
    desc: "Je m’appelle Kalvin et nous allons faire un tour de l’application ensemble. Bientôt, tu deviendras un as du cleanwalking, comme mes robots kleaner.",
    img: require('../assets/imagesKlean/onboarding1.png')
  },
  {
    title: "Trouver des cleanwalks",
    desc: "Sur l’onglet rechercher, tu peux accéder à toutes les cleanwalks proches de ta localisation. En cliquant sur le titre, tu peux accéder au détail de l’évènement et y participer.",
    img: require('../assets/imagesKlean/onboarding2.png')
  },
  {
    title: "Proposer une cleanwalk",
    desc: "En appuyant sur le bouton proposer, symbolisé par un icone « + » en bas de l’écran, tu peux organiser ta propre cleanwalk et faire gagner des points à ta ville. Et oui, il y a classement des villes les plus propres !",
    img: require('../assets/imagesKlean/onboarding3.png')
  },
  {
    title: "Ton profil",
    desc: "Sur l’onglet profil, retrouve toutes les cleanwalks auxquelles tu participes ainsi que tes statistiques. Fais évoluer ton statut en participant à plus de cleanwalks. Le but ultime ? Devenir un trash exterminator.",
    img: require('../assets/imagesKlean/onboarding4.png')
  },
];