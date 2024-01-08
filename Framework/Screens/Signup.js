import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import { Theme } from '../Components/Theme'

export function Signup({ navigation }) {
    // const [email, setEmail] = useState("")

    return (
        <SafeAreaView style={{ flex: 1 }} >
            <View style={styles.container}>
                <View style={styles.form}>
                    <Text style={styles.header}>Sign Up</Text>
                    <Text style={[styles.header, { marginBottom: 20 }]}>Your Account!</Text>

                    <Text style={styles.placeholder}>First Name</Text>
                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                    // onChangeText={ }
                    />
                    <Text style={styles.placeholder}>Last Name</Text>
                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                    // onChangeText={ }
                    />
                    <Text style={styles.placeholder}>Home Address</Text>
                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                    // onChangeText={ }
                    />

                    <Text style={styles.placeholder}>Email Address</Text>
                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                    // onChangeText={ }
                    />
                    <Text style={styles.placeholder}>Password</Text>
                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        secureTextEntry
                    // onChangeText={ }
                    />
                    <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")} style={styles.appBTN}>
                        <Text style={{ fontSize: 16, color: "white", fontFamily: Theme.fonts.text600 }}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Login")} style={{ alignItems: "center", marginTop: 10 }}>
                        <Text style={{ fontSize: 16, color: Theme.colors.primary, fontFamily: Theme.fonts.text600 }}>I have an account. Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "white"
    },
    form: {
        flex: 1,
        justifyContent: "center",
        // alignItems: "center"
    },
    header: {
        fontSize: 35,
        fontFamily: Theme.fonts.text700
    },
    input: {
        borderColor: "gray",
        borderWidth: 1,
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        width: "100%",
        fontSize: 18
    },
    placeholder: {
        fontFamily: Theme.fonts.text400
    },
    appBTN: {
        borderWidth: 1,
        borderColor: Theme.colors.primary,
        padding: 10,
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 40,
        backgroundColor: Theme.colors.primary,
        fontFamily: Theme.fonts.text500
    }
})