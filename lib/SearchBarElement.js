import React, { useState } from "react";
import { TextInput, View, StyleSheet, Text, Pressable, Platform } from "react-native";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { colors } from "./colors";
import { typography } from "./typography";
import DateTimePicker from "@react-native-community/datetimepicker";
import changeDateFormat from "../lib/changeDateFormat";
import changeHourFormat from "../lib/changeHourFormat";
import { windowDimensions } from "./windowDimensions";

function SearchBarElement(props) {

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [datePickUse, setDatePickUse] = useState(false);
  const placeHolderDate = 'Quand ? (date)';
  const placeHolderTime = 'Quand ? (Heure)';

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || props.dateSearch;
    setShow(Platform.OS === 'ios');
    props.setDateSearch(currentDate);
    setDatePickUse(true);
  };

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || props.dateSearch;
    setShow(Platform.OS === 'ios');
    props.setDateSearch(currentTime);
    setDatePickUse(true);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const resetDate = () => {
    setShow(false);
    setDatePickUse(false); 
    props.setDateSearch(new Date());
  }

  

  if (props.type === 'date') {

    const dateFormate = changeDateFormat(props.dateSearch);
    const datePicker = <DateTimePicker
      testID="dateTimePicker"
      value={props.dateSearch}
      mode={mode}
      is24Hour={true}
      display="default"
      onChange={onChangeDate}
      locale="fr-FR"
      style={styles.datePicker}
    />;

    let ctDate;
    if (Platform.OS !== 'ios') {
      ctDate = <Text
        style={styles.text}
      >
        {!datePickUse ? placeHolderDate : dateFormate}
      </Text>
    } else if (Platform.OS === 'ios' && !show) {
      ctDate = <Text
        style={styles.text}
      >
        Quand ? (date)
      </Text>
    } else if (show && Platform.OS === 'ios') {
      ctDate = datePicker;
    }

    let dateAndro;
    if (show && Platform.OS !== 'ios') {
      dateAndro = datePicker;
    }
    
    return (
      <View style={styles.inputContainer}>
        <Pressable
          onPress={showDatepicker}
        >
          {ctDate}
        </Pressable>
        <Pressable 
          onPress={ () => resetDate() }
          style={styles.cross}
        >
          <Entypo name="cross" size={17} color="#989898" />
        </Pressable>
        <FontAwesome name="search" size={17} color="#989898" />
        {dateAndro}
      </View>
    );

  } 
  
  if (props.type === 'time') {

    const heureFormate = changeHourFormat(props.dateSearch);
    const timePicker = <DateTimePicker
      testID="dateTimePicker"
      value={props.dateSearch}
      mode={mode}
      is24Hour={true}
      display="default"
      onChange={onChangeTime}
      locale="fr-FR"
      style={styles.datePicker}
    />;

    let ctHeure;
    if (Platform.OS !== 'ios') {
      ctHeure = <Text
        style={styles.text}
      >
        {!datePickUse ? placeHolderTime : heureFormate}
      </Text>
    } else if (Platform.OS === 'ios' && !show) {
      ctHeure = <Text
        style={styles.text}
      >
        Quand ? (Heure)
      </Text>
    } else if (show && Platform.OS === 'ios') {
      ctHeure = timePicker;
    }

    let heureAndro;
    if (show && Platform.OS !== 'ios') {
      heureAndro = timePicker;
    }

    return (
      <View style={styles.inputContainer}>
        <Pressable
          onPress={showTimepicker}
        >
          {ctHeure}
        </Pressable>
        <Pressable 
          onPress={ () => resetDate() }
          style={styles.cross}
        >
          <Entypo name="cross" size={17} color="#989898" />
        </Pressable>
        <FontAwesome name="search" size={17} color="#989898" />
        {heureAndro}
      </View>
    );
    
  } else {
    return (
      <View
        style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={props.placeholder}
            value={props.adress}
            onChangeText={(value) => {props.setAdress(value); props.onChangeShowAutoComplete(true)}}
          />
          <Pressable
            onPress={() => props.setAdress("")}
            style={styles.cross}>
            <Entypo name="cross" size={17} color="#989898" />
          </Pressable>
          <FontAwesome name="search" size={17} color="#989898" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: windowDimensions.width * 0.8,
    backgroundColor: colors.grey,
    borderRadius: 3,
    paddingHorizontal: 9,
    paddingVertical: 4,
    marginTop: 10
  },
  input: {
    width: windowDimensions.width * 0.6,
    fontSize: typography.body.fontSize,
    fontFamily: typography.body.fontFamily,
  },
  text: {
    width: windowDimensions.width * 0.6,
    fontSize: typography.body.fontSize,
    fontFamily: typography.body.fontFamily,
    paddingVertical: 5,
    color: '#4d4d4d'
  },
  cross: {
    marginHorizontal: 3
  },
  datePicker: {
    width: windowDimensions.width * 0.6
  }
});

export default SearchBarElement;