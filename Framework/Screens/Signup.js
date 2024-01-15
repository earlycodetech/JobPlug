import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { Button } from 'react-native-paper'
import { Theme } from '../Components/Theme'
import { Formik } from 'formik'
import * as yup from "yup"
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { authentication, db } from '../../Firebase/settings'
import { errorMessage } from '../Components/formatErrorMessage'
import { collection, doc, setDoc } from 'firebase/firestore'
import { AppContext } from '../Components/globalVariables'

const validation = yup.object({
    email: yup.string()
        .required()
        .email("Enter a valid email")
        .min(5)
        .max(30),
    password: yup.string().required().min(8).max(20)
})

export function Signup({ navigation }) {
    const { setPreloader } = useContext(AppContext)

    // const [email, setEmail] = useState("")

    return (
        <SafeAreaView style={{ flex: 1 }} >
            <View style={styles.container}>
                <Formik
                    initialValues={{ email: "", password: "", firstName: "", lastName: "", address: "", gender: "" }}
                    onSubmit={(value) => {
                        setPreloader(true)
                        createUserWithEmailAndPassword(authentication, value.email, value.password)
                            .then(() => {
                                onAuthStateChanged(authentication, (user) => {
                                    const userUID = user.uid

                                    setDoc(doc(db, "users", userUID), {
                                        balance: 0,
                                        firstName: value.firstName,
                                        lastName: value.lastName,
                                        gender: value.gender,
                                        address: value.address,
                                        accountStatus: "active",
                                        email: value.email,
                                    }).then(() => {
                                        setPreloader(false)
                                        navigation.navigate("HomeScreen")
                                    }).catch((error) => {
                                        // console.log(typeof error.code)
                                        setPreloader(false)
                                        Alert.alert(
                                            "Message!",
                                            errorMessage(error.code),
                                            [{ text: "Try Again" }]
                                        )
                                    })
                                })
                            })
                            .catch((error) => {
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
                                <Text style={styles.header}>Sign Up</Text>
                                <Text style={[styles.header, { marginBottom: 20 }]}>Your Account!</Text>

                                <Text style={styles.placeholder}>First Name</Text>
                                <TextInput
                                    style={styles.input}
                                    autoCapitalize="none"
                                    onChangeText={prop.handleChange("firstName")}
                                    onBlur={prop.handleBlur("firstName")}
                                    value={prop.values.firstName}
                                />
                                <Text style={styles.placeholder}>Last Name</Text>
                                <TextInput
                                    style={styles.input}
                                    autoCapitalize="none"
                                    onChangeText={prop.handleChange("lastName")}
                                    onBlur={prop.handleBlur("lastName")}
                                    value={prop.values.lastName}
                                />
                                <Text style={styles.placeholder}>Home Address</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={prop.handleChange("address")}
                                    onBlur={prop.handleBlur("address")}
                                    value={prop.values.address}
                                />

                                <Text style={styles.placeholder}>Gender</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={prop.handleChange("gender")}
                                    onBlur={prop.handleBlur("gender")}
                                    value={prop.values.gender}
                                />

                                <Text style={styles.placeholder}>Email Address</Text>
                                <TextInput
                                    style={[styles.input, { marginBottom: 0 }]}
                                    autoCapitalize="none"
                                    onChangeText={prop.handleChange("email")}
                                    onBlur={prop.handleBlur("email")}
                                    value={prop.values.email}
                                />
                                <Text style={[styles.error, { display: prop.errors.email ? "flex" : "none" }]}>{prop.errors.email}</Text>

                                <Text style={styles.placeholder}>Password</Text>
                                <TextInput
                                    style={styles.input}
                                    autoCapitalize="none"
                                    secureTextEntry
                                    onChangeText={prop.handleChange("password")}
                                    onBlur={prop.handleBlur("password")}
                                    value={prop.values.password}

                                />
                                <Text style={[styles.error, { display: prop.errors.password ? "flex" : "none" }]}>{prop.errors.password}</Text>

                                <TouchableOpacity onPress={prop.handleSubmit} style={styles.appBTN}>
                                    <Text style={{ fontSize: 16, color: "white", fontFamily: Theme.fonts.text600 }}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }}
                </Formik>
                <TouchableOpacity onPress={() => navigation.navigate("Login")} style={{ alignItems: "center", marginTop: 10 }}>
                    <Text style={{ fontSize: 16, color: Theme.colors.primary, fontFamily: Theme.fonts.text600 }}>I have an account. Login</Text>
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