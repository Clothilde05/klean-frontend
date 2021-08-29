import React from "react";
import { StyleSheet, FlatList, Pressable, Text, View, Image } from "react-native";
import { typography } from "../lib/typography";
import changeDateFormat from "../lib/changeDateFormat";
import { connect } from "react-redux";
import { colors } from "./colors";

function CleanwalkList(props) {

  const goCW = (id) => {
    props.setCwIdProfilStack(id);
    props.onPress();
  }

  let renderItem = ({ item }) => {
    return (

      <Pressable style={styles.card} onPress={() => goCW(item.id)}>
        <Image
          style={styles.image}
          source={require('../assets/imagesKlean/cwprev.png')}
          resizeMode="cover"
        />
        <View style={styles.body}>
          <Text style={styles.title}> {item.title.substr(0, 21)}... </Text>
          <Text style={styles.date}> {changeDateFormat(item.date)} </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <FlatList
      data={props.listCW}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      style={styles.flatList}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  flatList: {
    marginTop: 25,
    marginLeft: 15
  },
  card: {
    width: 171,
    height: 170,
    marginRight: 13,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.grey
  },
  image: {
    width: 169,
    height: 114,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.grey
  },
  body: {
    marginVertical: 7,
    marginHorizontal: 5,
  },
  title: {
    fontFamily: typography.body.fontFamily,
    fontSize: typography.body.fontSize,
    color: "#000000",
  },
  date: {
    fontFamily: typography.bodyLight.fontFamily,
    fontSize: typography.bodyLight.fontSize
  },
});

function mapDispatchToProps(dispatch) {
  return {
    setCwIdProfilStack: function (id) {
      dispatch({ type: "setCwIdProfilStack", id });
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(CleanwalkList);