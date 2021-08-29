import React from "react";
import { Text, View, StyleSheet, Image, Pressable } from 'react-native';
import { colors } from "../lib/colors";
import { windowDimensions } from "../lib/windowDimensions";
import Badges from '../lib/Badges';
import BadgesList from '../lib/BadgesList'
import { typography } from "../lib/typography";

function PreviewEvent(props) {

    const styles = StyleSheet.create({
        previewEvent: {
            display: props.visible ? 'flex' : 'none',
        },
        previewEventTitle: {
            backgroundColor: colors.secondary,
            width: windowDimensions.width,
            padding: 10,
            fontSize: typography.h2.fontSize,
            fontFamily: typography.h2.fontFamily,
            color: "white",
        },
        ctPreviewEvent: {
            flexDirection: "row",
            display: 'flex',
            backgroundColor: colors.white,
        },
        ctPreviewEventTxt: {
            padding: 15,
            width: '65%'
        },
        ctBadges: {
            flexDirection: "row",
            marginVertical: 20,
            flexWrap: "wrap"
        },
        ctOrga: {
            width: '35%',
            alignItems: "center",
            paddingTop: 70,
            paddingBottom: 20
        },
        imgPreviewEvent: {
            width: 80,
            height: 80,
            borderRadius: 50,
            borderColor: colors.white,
            borderWidth: 2,
            position: 'absolute',
            top: -15
        }
    });

    //Dans la pop-up, le nombre de caractères est limité

    let nameOrga = '';
    if (props.nameOrga.length > 10) {
        nameOrga = `${props.nameOrga.substr(0, 10)}...`;
    } else {
        nameOrga = props.nameOrga;
    }

    let titlePreviewEvent = '';
    if (props.title.length > 30) {
        titlePreviewEvent = `${props.title.substr(0, 30)}...`;
    } else {
        titlePreviewEvent = props.title;
    }

    let descPreviewEvent = '';
    if (props.desc.length > 60) {
        descPreviewEvent = `${props.desc.substr(0, 60)}...`;
    } else {
        descPreviewEvent = props.desc;
    }

    return (
        <View
            style={styles.previewEvent}
        >
            <Pressable
                onPress={props.onPress}>
                <Text style={styles.previewEventTitle}>
                    {titlePreviewEvent}
                </Text>
            </Pressable>
            <View style={styles.ctPreviewEvent}>
                <View style={styles.ctPreviewEventTxt}>
                    <Text style={styles.previewEventDesc}>
                        {descPreviewEvent}
                    </Text>
                    <View style={styles.ctBadges}>
                        <BadgesList data={props.toolBadge} />
                    </View>
                </View>
                <View style={styles.ctOrga}>
                    <Image
                        source={{uri: props.avatar}}
                        style={styles.imgPreviewEvent}
                    />
                    <Text>{props.firstnameOrga.toUpperCase().substr(0, 1)}. {nameOrga}</Text>
                    <Badges type="orange" />
                </View>
            </View>
        </View>
    )
}

export default PreviewEvent;