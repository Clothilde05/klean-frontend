import React from "react";
import { Text, StyleSheet } from "react-native";
import { colors } from "./colors";
import { typography } from "./typography";
import { windowDimensions } from "./windowDimensions"

function ScreenTitles(props) {

    const styles = StyleSheet.create({
        main: {
            backgroundColor: colors.grey,
            width: windowDimensions.width,
            paddingVertical: 24,
            textAlign: "center",
            fontSize: typography.h1.fontSize,
            fontFamily: typography.h1.fontFamily
        },
        secondary: {
            backgroundColor: colors.primary,
            width: windowDimensions.width,
            paddingVertical: 6,
            textAlign: "center",
            fontSize: typography.h2.fontSize,
            fontFamily: typography.h2.fontFamily,
            color: "white",
            marginBottom: 9
        }
    });



    if (props.titleType === "main") {
        return (
            <Text style={styles.main}>
                {props.title}
            </Text>
        )
    } else if (props.titleType === "secondary") {
        return (
            <Text style={styles.secondary}>
                {props.title}
            </Text>
        )
    }

}

export default ScreenTitles;