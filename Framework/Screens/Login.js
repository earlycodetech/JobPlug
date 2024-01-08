import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { Button } from 'react-native-paper'
import { Theme } from '../Components/Theme'
import { AppContext } from '../Components/globalVariables'
import { Formik } from 'formik'

export function Login({ navigation, route }) {
    // console.log(route.params.metaData)
    const { email, setEmail } = useContext(AppContext)
    // const [email, setEmail] = useState("")

    return (
        <SafeAreaView style={{ flex: 1 }} >
            <View style={styles.container}>
                <Formik
                    style={{ flex: 1 }}
                    initialValues={{ email: "", password: "" }}
                    onSubmit={(value) => {
                        console.log(value);
                    }}
                >
                    {(prop) => {
                        return (
                            <View style={styles.form}>
                                <Text style={styles.header}>Login Your</Text>
                                <Text style={[styles.header, { marginBottom: 20 }]}>Account!</Text>

                                <Text style={styles.placeholder}>{email}</Text>
                                <Text style={styles.placeholder}>Email Address</Text>
                                <TextInput
                                    style={styles.input}
                                    autoCapitalize="none"
                                    onChangeText={prop.handleChange("email")}
                                />
                                <Text style={styles.placeholder}>Password</Text>
                                <TextInput
                                    style={styles.input}
                                    autoCapitalize="none"
                                    secureTextEntry
                                    onChangeText={prop.handleChange("password")}
                                />
                                <TouchableOpacity onPress={() => setEmail("daniel@gmail.com")} style={{ marginBottom: 10 }}>
                                    <Text style={{ fontSize: 16, color: Theme.colors.primary, fontFamily: Theme.fonts.text600 }}>Forgot password?</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={prop.handleSubmit} style={styles.appBTN}>
                                    <Text style={{ fontSize: 16, color: "white", fontFamily: Theme.fonts.text600 }}>Login</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }}
                </Formik>
                <TouchableOpacity onPress={() => navigation.navigate("Signup")} style={{ alignItems: "center", marginTop: 10 }}>
                    <Text style={{ fontSize: 16, color: Theme.colors.primary, fontFamily: Theme.fonts.text600 }}>Don't have an account?</Text>
                </TouchableOpacity>
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