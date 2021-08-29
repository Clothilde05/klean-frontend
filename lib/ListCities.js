import React from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { colors } from "./colors";
import { typography } from "./typography";
import { windowDimensions } from "./windowDimensions"

function ListCities(props) {

    const renderItem = ({ item, index }) => {
        if (item.isMyCity === true) {
        return (
            <View style={styles.listItemMyCity}>
                <Text style={styles.rankingMyCity}>#{index+1}</Text>
                <Text style={styles.cityMyCity}>{item.city.length > 25 ? item.city.substring(0, 24) + "..." : item.city}</Text>
                <Text style={styles.pointsMyCity}>{item.points}pts</Text>
            </View>
        )
        } else {
            return (
                <View style={styles.listItem}>
                    <Text style={styles.ranking}>#{index+1}</Text>
                    <Text style={styles.city}>{item.city.length > 25 ? item.city.substring(0, 24) + "..." : item.city}</Text>
                    <Text style={styles.points}>{item.points}pts</Text>
                </View>
            )
        }
    }

    const styles = StyleSheet.create({
        listItem: {
            flexDirection: "row",
            justifyContent: "center",
            backgroundColor: colors.grey,
            alignItems: "center",
            width: windowDimensions.width,
            paddingVertical: 9,
            paddingHorizontal: 8,
            marginBottom: 6   
        },
        listItemMyCity: {
            flexDirection: "row",
            justifyContent: "center",
            backgroundColor: colors.secondary,
            alignItems: "center",
            width: windowDimensions.width,
            paddingVertical: 9,
            paddingHorizontal: 8,
            marginBottom: 6, 
        },
        pointsMyCity: {
            marginLeft: "auto",
            textAlign: "right",
            width: windowDimensions.width * 0.25,
            fontSize: typography.bodyLightItalic.fontSize,
            fontFamily: typography.bodyLightItalic.fontFamily,
            color: "white"
        },
        rankingMyCity: {
            marginRight: "auto",
            width: windowDimensions.width * 0.25,
            fontSize: typography.body.fontSize,
            fontFamily: typography.body.fontFamily,
            color: "white"
        },
        cityMyCity: {
            textAlign: "center",
            fontSize: typography.body.fontSize,
            fontFamily: typography.body.fontFamily,
            color: "white"
        },
        points: {
            marginLeft: "auto",
            textAlign: "right",
            width: windowDimensions.width * 0.25,
            fontSize: typography.bodyLightItalic.fontSize,
            fontFamily: typography.bodyLightItalic.fontFamily,
            color: "black"
        },
        ranking: {
            marginRight: "auto",
            width: windowDimensions.width * 0.25,
            fontSize: typography.body.fontSize,
            fontFamily: typography.body.fontFamily,
            color: "black"
        },
        city: {
            textAlign: "center",
            fontSize: typography.body.fontSize,
            fontFamily: typography.body.fontFamily,
            color: "black"
        }
        
    });


    return (
        <FlatList
            style={styles.container}
            data={props.data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
        />
    )

}

export default ListCities;