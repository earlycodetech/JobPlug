import { useEffect, useState, useCallback } from "react";
import { Text, View, SafeAreaView, StyleSheet, Image, TouchableOpacity, TextInput } from "react-native";
import { Theme } from "../Components/Theme";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { Searchbar } from "react-native-paper";

export function HomeScreen() {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.constainer}>
                <View style={styles.topBar}>
                    <Image source={require("../../assets/logo.png")} style={styles.dp} />
                    <Searchbar style={{ flex: 1, paddingEnd: 20, }} placeholder="Search for..." />
                    <FontAwesomeIcon icon={faBell} style={{}} size={29} color="#0000007a" />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        padding: 20,
        paddingTop: 0,
    },
    topBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 10
    },
    dp: {
        borderRadius: 50,
        borderColor: Theme.colors.primary,
        borderWidth: 1,
        padding: 5,
        width: 50,
        height: 50
    },
    searchBar: {
        padding: 5,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 10,
    }

})