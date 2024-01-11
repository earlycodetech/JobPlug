import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { Button } from 'react-native-paper'
import { Theme } from '../Components/Theme'
import { AppContext } from '../Components/globalVariables'
import { Formik } from 'formik'
import * as yup from "yup"
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { authentication } from '../../Firebase/settings'
import { errorMessage } from '../Components/formatErrorMessage'

const validation = yup.object({
    email: yup.string()
        .required()
        .email("Enter a valid email")
        .min(5)
        .max(30),
    password: yup.string().required().min(8).max(20)
})


export function Login({ navigation, route }) {
    // console.log(route.params.metaData)
    const { setPreloader } = useContext(AppContext)
    // const [email, setEmail] = useState("")

    const users = [
        {
            oisudbw4o80: {
                fname: "John",
                lname: 'Dan',
                age: 28
            }
        },
        {
            nisd7c92b2i3: {
                fname: "Emmy",
                lname: 'Jay',
                age: 36
            }
        },
    ]

    return (
        <SafeAreaView style={{ flex: 1 }} >
            <View style={styles.container}>
                <Formik
                    initialValues={{ email: "", password: "" }}
                    onSubmit={(value) => {
                        setPreloader(true);
                        signInWithEmailAndPassword(authentication, value.email, value.password)
                            .then(() => {
                                onAuthStateChanged(authentication, (user) => {
                                    console.log(user.uid);
                                    setPreloader(false)
                                    navigation.navigate("HomeScreen")
                                })
                            })
                            .catch((error) => {
                                setPreloader(false)
                                // console.log(typeof error.code)
                                Alert.alert(
                                    "Message!",
                                    errorMessage(error.code),
                                    [{ text: "Try Again" }]
                                )
                            })
                    }}
                    validationSchema={validation}
                >
                    {(prop) => {
                        return (
                            <View style={styles.form}>
                                <Text style={styles.header}>Login Your</Text>
                                <Text style={[styles.header, { marginBottom: 20 }]}>Account!</Text>

                                <Text style={styles.placeholder}>Email Address</Text>
                                <TextInput
                                    style={[styles.input, { marginBottom: 0 }]}
                                    autoCapitalize="none"
                                    onChangeText={prop.handleChange("email")}
                                    onBlur={prop.handleBlur("email")}
                                    value={prop.values.email}
                                />
                                <Text style={[styles.error, { display: prop.touched.email && prop.errors.email ? "flex" : "none" }]}>{prop.errors.email}</Text>

                                <Text style={styles.placeholder}>Password</Text>
                                <TextInput
                                    style={styles.input}
                                    autoCapitalize="none"
                                    secureTextEntry
                                    onChangeText={prop.handleChange("password")}
                                    onBlur={prop.handleBlur("password")}
                                    value={prop.values.password}
                                />
                                <Text style={[styles.error, { display: prop.touched.password && prop.errors.password ? "flex" : "none" }]}>{prop.errors.password}</Text>

                                <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")} style={{ marginBottom: 10 }}>
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
    placeholder: {
        fontFamily: Theme.fonts.text400,
        marginTop: 10
    },
    error: {
        fontFamily: Theme.fonts.text400,
        color: "#d70000",
        marginStart: 7
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