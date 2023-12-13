import { useEffect, useState, useCallback } from "react";
import { Text, View, SafeAreaView, StyleSheet } from "react-native";
import { Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

export function Intro() {
    const [count, setCount] = useState(0);
    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                await Font.loadAsync({ Pacifico_400Regular });
                await new Promise(resolve => setTimeout(resolve, 2000));
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
            }
        }

        prepare();
    }, []);

    useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.constainer}>
                <Text style={{ fontSize: 30, textAlign: "center", fontFamily: "Pacifico_400Regular" }}>JobPlug</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        padding: 20
    }
})