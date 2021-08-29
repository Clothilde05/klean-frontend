import React from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import { typography } from "./typography";
import changeDateFormat from "../lib/changeDateFormat";

function ChatList(props) {

  let renderItem = ({ item }) => {
    return (
        <View style={styles.container}>
          <Text style={styles.message}> {item.message} </Text>
            <View styles={styles.senderInfo}>
              <Text style={styles.sender}> {item.user} <Text style={styles.date}> {changeDateFormat(item.date)} </Text> </Text>
            </View>
        </View>
    );
  };

  return (
    <FlatList
      data={props.data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      style={styles.flatList}
    />
  );
}

const styles = StyleSheet.create({
  flatList: {
    marginVertical: 30,
  },
  container: {
    backgroundColor: "#EEEEEE",
    borderRadius: 100,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  message: {
    fontSize: typography.bodyLight.fontSize,
    fontFamily: typography.bodyLight.fontFamily,
  },
  senderInfo: {
    flexDirection: "row",
    justifyContent: "center"
  },
  sender: {
    fontSize: typography.body.fontSize,
    fontFamily: typography.body.fontFamily,
    marginTop: 5,
  },
  date: {
    fontSize: typography.bodyLight.fontSize,
    fontFamily: typography.bodyLight.fontFamily,
  }
});

export default ChatList;
