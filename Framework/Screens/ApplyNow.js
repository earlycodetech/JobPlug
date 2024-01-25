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


export function ApplyNow({ navigation, route }) {
    const { userInfo, setPreloader, userUID, docID } = useContext(AppContext);
    const { jobTitle } = route.params

    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("")
    const [Image, setImage] = useState("")
    const [firstName, setFirstName] = useState(userInfo.firstName)
    const [lastName, setLastName] = useState(userInfo.lastName)
    const [email, setEmail] = useState(userInfo.email)

    function applyJob() {
        setPreloader(true)
        addDoc(collection(db, "appliedJobs"), {
            address,
            lastName,
            email,
            firstName,
            appliedAt: new Date().getTime(),
            userUID,
            jobTitle,
            jobID: docID,
        }).then(() => {
            setPreloader(false)
            Alert.alert(
                "Application",
                "Application sent successfully"
            )
        }).catch((error) => {
            // console.log(typeof error.code)
            setPreloader(false)
            Alert.alert(
                "Application Failed",
                "Failed to Apply, Please try again!"
                [{ text: "Try Again" }]
            )
        })
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Text style={{ fontSize: 40, fontFamily: Theme.fonts.text900, marginBottom: 20 }}>Apply now</Text>
                    <Text style={{ fontSize: 20, fontFamily: Theme.fonts.text600, marginBottom: 20 }}>{jobTitle}</Text>
                    <Text style={styles.Text}>FirstName*</Text>
                    <View>
                        <TextInput placeholder="FirstName"
                            style={styles.TextInput}
                            value={userInfo.firstName}
                        // onChangeText={(inp)=> userInfo.fullName(inp.trim())}
                        />
                    </View>
                    <Text style={styles.Text}>LastName*</Text>
                    <View>
                        <TextInput placeholder="LastName"
                            style={styles.TextInput}
                            value={userInfo.lastName}
                        // onChangeText={(inp)=> (inp.trim())}
                        />
                    </View>
                    <Text style={styles.Text}>Contact Info*</Text>
                    <View>
                        <TextInput placeholder="Email"
                            style={styles.TextInput}
                            value={userInfo.email}
                        />
                    </View>
                    <Text style={styles.Text}>Address*</Text>
                    <View>
                        <TextInput placeholder="Address"
                            style={styles.TextInput}
                            onChangeText={(inp) => setAddress(inp.trim())}
                        />
                    </View>
                </View>
                <TouchableOpacity onPress={applyJob} style={[styles.TextInput, { alignItems: 'center', borderColor: Theme.colors.blueMedium, backgroundColor: Theme.colors.blueMedium, margin: 20 }]}>
                    <Text style={{ fontFamily: Theme.fonts.text500, color: "white" }}>Apply Now</Text>
                </TouchableOpacity>
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
