import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, KeyboardAvoidingView } from "react-native";
import { connect } from "react-redux";
import { colors } from "./colors";
import { windowDimensions } from "./windowDimensions";
import PROXY from "../proxy";

const changePassword = (props) => {

  const [holdPass, setHoldPass] = useState();
  const [newPass, setNewPass] = useState();
  const [confirmNewPass, setConfirmNewPass] = useState();
  const [errorPassword, setErrorPassword] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  let error = [];

  async function updatePass() {
    //Requête pour modifier le mot de passe
    let data = await fetch(PROXY + "/users/update-password", {
      method: "PUT",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `token=${props.tokenObj.token}&hold=${holdPass}&new=${newPass}&confirmNewPass=${confirmNewPass}`,
    });

    let response = await data.json();

    if (response.result == true) {
      close();
      props.close();
    } else if (response.result == false) {
      setErrorPassword(response.error);
    }

  }

  let errorChangePassword = errorPassword.map((error, i) => {
    return <Text key={`error${i}`}>{error}</Text>;
  });

  function close() {
    props.close();
    setHoldPass("");
    setNewPass("");
    setConfirmNewPass("");
  }

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
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>

          <View style={styles.modalView}>
            <View>
              <TextInput
                name="holdPass"
                placeholder="ancien mot de passe"
                placeholderTextColor="#95a5a6"
                style={styles.textInput}
                onChangeText={(value) => setHoldPass(value)}
                value={holdPass}
                secureTextEntry={true}
              />
              <TextInput
                name="newPass"
                placeholder="nouveau mot de passe"
                placeholderTextColor="#95a5a6"
                style={styles.textInput}
                onChangeText={(value) => setNewPass(value)}
                value={newPass}
                secureTextEntry={true}
              />
              <TextInput
                name="newPass"
                placeholder="confirmer nouveau mot de passe"
                placeholderTextColor="#95a5a6"
                style={styles.textInput}
                onChangeText={(value) => setConfirmNewPass(value)}
                value={confirmNewPass}
                secureTextEntry={true}
              />
            </View>
          
            <View>{errorChangePassword}</View>

            <View>
              <Pressable
                style={[styles.button, styles.save]}
                onPress={() => updatePass()}
              >
              <Text style={styles.textStyle}>Sauvegarder</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => close()}
              >
              <Text style={styles.textStyle}>Annuler</Text>
              </Pressable>
            </View>
          </View>

        </KeyboardAvoidingView>
      </View>
        
      </Modal>
    </View>
  );
};

function mapStateToProps(state) {
  return {
    tokenObj: state.tokenObj,
  };
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  save: {
    backgroundColor: colors.secondary,
    marginBottom: 10,
  },
  buttonClose: {
    backgroundColor: colors.grey,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  textInput: {
    height: 40,
    width: windowDimensions.width * 0.8,
    borderRadius: 3,
    backgroundColor: colors.grey,
    paddingLeft: 10,
    justifyContent: "center",
    marginTop: 13,
    marginBottom: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default connect(mapStateToProps, null)(changePassword);
