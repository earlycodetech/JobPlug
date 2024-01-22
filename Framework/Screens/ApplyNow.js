import { View, StatusBar, StyleSheet, SafeAreaView, Text, Platform, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { Formik } from "formik";
import { Theme } from "../Components/Theme";
import { useContext, useState } from "react";
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "../../Firebase/settings";
import { AppContext } from "../Components/globalVariables";
import { Picker } from '@react-native-picker/picker';


export function ApplyNow({ navigation }) {
    const { userUID, setPreloader, userInfo } = useContext(AppContext)
    const [jobTitle, setJobTitle] = useState("");
    const [jobType, setJobType] = useState("");
    const [jobLocation, setJobLocation] = useState("");
    const [company, setCompany] = useState("");
    const [workplace, setWorkplace] = useState("");
    const [contactInfo, setContactInfo] = useState(userInfo.email);
    const [description, setDescription] = useState(userInfo.email);

    function applyJob() {
        setPreloader(true)
        addDoc(collection(db, "appliedJobs"), {
            jobTitle,
            jobType,
            jobLocation,
            company,
            workplace,
            contactInfo,
            description,
            userUID,
            createdAt: new Date().getTime(),
        }).then(() => {
            setPreloader(false)
            Alert.alert(
                "Post Job",
                "Job has been posted successfully",
            )
        }).catch((error) => {
            // console.log(typeof error.code)
            setPreloader(false)
            Alert.alert(
                "Message!",
                errorMessage(error.code),
                [{ text: "Try Again" }]
            )
        })
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={{ fontFamily: Theme.fonts.text800, fontSize: 29, alignSelf: 'center' }}>Let's create your job post</Text>
                    <View style={{ flex: 1, marginBottom: 20 }}>
                        <Text style={{ fontFamily: Theme.fonts.text200, marginTop: 10 }}>* indicates required</Text>
                        <Text style={styles.Text}>
                            Job title*
                        </Text>
                        <View>
                            <TextInput style={styles.TextInput}
                                onChangeText={(inp) => setJobTitle(inp.trim())}
                            />
                        </View>
                        <Text style={styles.Text}>Company*</Text>
                        <View>
                            <TextInput style={styles.TextInput}
                                onChangeText={(inp) => setCompany(inp.trim())}
                            />
                        </View>
                        <Text style={styles.Text}>Job location*</Text>
                        <View>
                            <TextInput style={styles.TextInput}
                                onChangeText={(inp) => setJobLocation(inp.trim())}
                            />
                        </View>

                        <Text style={styles.Text}>Contact Info*</Text>
                        <View>
                            <TextInput style={styles.TextInput}
                                onChangeText={(inp) => setContactInfo(inp.trim())}
                                value={contactInfo}
                                autoCapitalize="none"
                                autoComplete="off"
                            />
                        </View>
                        <Text style={styles.Text}>Job Description*</Text>
                        <View>
                            <TextInput style={styles.TextInput}
                                multiline={true}
                                numberOfLines={5}
                                onChangeText={(inp) => setDescription(inp.trim())}
                            />
                        </View>

                    </View>
                    <TouchableOpacity onPress={applyJob} style={[styles.TextInput, { alignItems: 'center', borderColor: Theme.colors.blueMedium, backgroundColor: Theme.colors.blueMedium }]}>
                        <Text style={{ fontFamily: Theme.fonts.text500, color: "white" }}>Apply Now</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: Platform.OS == "android" ? StatusBar.currentHeight : null,
        padding: 20,
        justifyContent: 'space-between',
    },
    TextInput: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 15,
        fontSize: 20
    },
    Text: {
        fontFamily: Theme.fonts.text300,
        marginTop: 10
    }
});
