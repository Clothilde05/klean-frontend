import React from "react";
import { Text, View, StyleSheet, FlatList, Image } from "react-native";
import { colors } from "./colors";
import { typography } from "./typography";

function NewsCards(props) {

    const renderItem = ({ item, index }) => {

        let date = new Date(item.newsStartingDate);
        
        let clearDay = date.getDate();
        let clearMonth = date.getMonth();
        let clearFullYear = date.getFullYear();

        let clearDate = `${clearDay < 10 ? '0'+clearDay : clearDay} / ${clearMonth < 10 ? '0'+clearMonth : clearMonth} / ${clearFullYear} `

        return (
            <View style={styles.card}>

                <Image style={styles.image} source={item.newsImage}></Image>

                <View style={styles.body}>
                    <Text style={styles.title}>{item.newTitle.length > 40 ? item.newTitle.substring(0, 40) + "..." : item.newTitle}</Text>
                    <Text style={styles.text}>{clearDate.length > 21 ? clearDate.substring(0, 21) + "..." : clearDate}</Text>
                    <Text style={styles.text}>{item.newsDescription.length > 100 ? item.newsDescription.substring(0, 100) + "..." : item.newsDescription}</Text>
                </View>
            </View>
        )
    }

    const styles = StyleSheet.create({
        flatlist: {
            marginLeft: 18,
        },
        card: {
            width: 171,
            height: 275,
            marginRight: 13,
            borderWidth: 1,
            borderColor: colors.grey,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5
        },
        image: {
            width: 170,
            height: 114,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: colors.grey
        },
        body: {
            paddingLeft: 7,
            paddingVertical: 5
        },
        title: {
            fontSize: typography.h3.fontSize,
            fontFamily: typography.h3.fontFamily,
            color: colors.secondary,
            marginBottom: 5
        },
        text: {
            fontSize: typography.body.fontSize,
            fontFamily: typography.body.fontFamily,
            color: "black",
            marginBottom: 5
        }

    });

    return (
        <FlatList
            style={styles.container}
            data={props.data}
            renderItem={renderItem}
            horizontal={true}
            style={styles.flatlist}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
        />
    )
    
}

export default NewsCards;