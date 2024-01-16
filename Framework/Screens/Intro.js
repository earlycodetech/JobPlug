import { useEffect, useState, useCallback } from "react";
import { Text, View, SafeAreaView, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Theme } from "../Components/Theme";
import { useNavigation } from "@react-navigation/native";

export function Intro({ navigation }) {
    const [count, setCount] = useState(0);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <View style={styles.constainer}>

                <Image source={require("../../assets/logo.png")} style={{ width: 70, height: 70 }} />
                <View>
                    <Image source={require("../../assets/Interview.png")} style={{ width: "100%", height: 250 }} />
                    <Text style={{ fontFamily: Theme.fonts.text200, color: "black", fontSize: 25, textAlign: "center" }}>Welcome to JobPlug, where opportunities await! Your gateway to a world of career possibilities.</Text>
                </View>

                <View>
                    <TouchableOpacity onPress={() => navigation.navigate("Signup")} style={styles.appBTN}>
                        <Text style={{ fontSize: 16, color: "white", fontFamily: Theme.fonts.text600 }}>Get Started</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Login", { metaData: "Emmanuel John" })} style={[styles.appBTN, { backgroundColor: "white" }]}>
                        <Text style={{ fontSize: 16, color: Theme.colors.primary, fontFamily: Theme.fonts.text600 }}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        padding: 20,
        justifyContent: "space-between",
    },
    appBTN: {
        borderWidth: 1,
        borderColor: Theme.colors.primary,
        padding: 10,
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 40,
        backgroundColor: Theme.colors.primary
    }
})