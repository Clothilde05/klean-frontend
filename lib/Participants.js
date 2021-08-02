import React from "react";
import { StyleSheet, View, FlatList, Text, Image  } from "react-native";
import { typography } from "./typography";
import { colors } from "./colors";
import Badges from './Badges';

function Participants(props) {
   

    let renderItem = ({ item, index }) => {

    if(index === 0) {
        return (
            <View style={styles.container}>
                <View>
                    <Image style={styles.avatar} source={require('../assets/imagesKlean/Organisator.jpg')}></Image>
                </View>
                <View>
                    <Text style={typography.body}> {item.firstName} {item.lastName}</Text>
                    {/* <Text style={typography.bodyLight}> {item.badgeName} </Text> */}
                    <Badges type="orange"/>
                </View>
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <View>
                    <Image style={styles.avatar} source={require('../assets/imagesKlean/Participant1.jpg')}></Image>
                </View>
                <View>
                    <Text style={typography.body}> {item.firstName} {item.lastName}</Text>
                    {/* <Text style={typography.bodyLight}> {item.badgeName} </Text> */}
                </View>
            </View>
        );
    };

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 18,
        alignItems: 'center',

    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
        borderColor: colors.secondary,
        borderWidth: 2,
        marginRight: 10,
    },
});


return (
    <FlatList
    showsVerticalScrollIndicator ={false}
    data={props.data}
    renderItem={renderItem}
    keyExtractor={(item, index) => index.toString()}
    horizontal
    showsHorizontalScrollIndicator={false}
    />
);

}

export default Participants;
