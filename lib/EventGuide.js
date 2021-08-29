import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { colors } from "./colors";
import { typography } from "./typography";

function EventGuide(props) {

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.visible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>
              Bon à savoir !
              {"\n"}
            </Text>
            
            <Text style={styles.modalText}>
              Pour organiser une cleanwalk, les champs suivants du formulaire sont obligatoires : 
              {"\n"}
              Titre, Description, Matériel
              {"\n"}
              Voici quelques idées pour le champs matériel : gants, sacs poubelle, pince, chapeau, crème solaire, bottes …
              {"\n"}
              La participation des enfants est autorisée et encouragée
              {"\n"}
              La présence de vos animaux de compagnie est également autorisée
              {"\n"}
              {"\n"}
              Nous vous recommandons de veiller à la bonne tenue du groupe de discussion et d’agir en tant que modérateur.
            </Text>
            <Pressable
              style={styles.buttonClose}
              onPress={() => props.close()}
            >
              <Text style={styles.textStyle}>Fermer</Text>
            </Pressable>
          </View>
        </View>

      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 18,
    backgroundColor: "white",
    borderRadius: 3,
    padding: 18,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: colors.secondary,
    borderRadius: 10,
    paddingHorizontal: 10, 
    paddingVertical: 5, 
  },
  textStyle: {
    color: "white",
    textAlign: "center",
    fontSize: typography.body.fontSize,
    fontFamily: typography.body.fontFamily,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: typography.body.fontSize,
    fontFamily: typography.body.fontFamily,
  }
});

export default EventGuide;
