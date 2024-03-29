import { useEffect, useState, useCallback, useContext } from "react";
import { Text, View, SafeAreaView, StyleSheet, Image, TouchableOpacity, TextInput, Dimensions, Alert, ScrollView, FlatList } from "react-native";
import { Theme } from "../Components/Theme";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { AppContext } from "../Components/globalVariables";
import { collection, deleteDoc, doc, getDoc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../Firebase/settings";
import { faAngleRight, faBriefcase, faLocationDot, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export function AppliedJobs({ navigation }) {
    const { userUID, setUserInfo, userInfo, setPreloader } = useContext(AppContext)
    const [jobs, setJobs] = useState([]);


    useEffect(() => {
        // console.log(userUID);
        const q = collection(db, 'appliedJobs');
        const filter = query(q, where('userUID', '==', userUID));
        onSnapshot(filter, (snapshot) => {
            const allData = []
            snapshot.forEach(item => {
                allData.push({ ...item.data(), docID: item.id })
            })
            console.log(allData);
            setJobs(allData);
        })
    }, [])


    function deleteRequest(id) {
        setPreloader(true)
        deleteDoc(doc(db, "appliedJobs", id))
            .then(() => {
                setPreloader(false)
                Alert.alert(
                    "Delete application",
                    "Application deleted successfully"
                )
            })
            .catch(() => {
                setPreloader(false)
                Alert.alert(
                    "Delete application",
                    "Delete Application failed",
                    [{ text: "Try Again" }]
                )
            })
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <View style={styles.constainer}>
                <View style={{ marginTop: 10 }}>
                    <View style={[styles.topBar, { marginBottom: 10 }]}>
                        <Text style={{ fontSize: 16, fontFamily: Theme.fonts.text600 }}>Recent Jobs</Text>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate("Jobs")} style={styles.allJobs}>
                            <Text style={{ fontSize: 14, fontFamily: Theme.fonts.text500, color: Theme.colors.primary }}>View More</Text>
                            <FontAwesomeIcon icon={faAngleRight} color={Theme.colors.primary} size={14} />
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={jobs}
                        renderItem={({ item }) => {
                            return (
                                <View style={{ padding: 5, paddingBottom: 10, marginBottom: 10, borderRadius: 3, borderColor: Theme.colors.primary + 20, borderBottomWidth: 1 }}>
                                    <View style={{ flexDirection: "row", gap: 10 }}>
                                        <Image style={{ width: 70, height: 70, borderRadius: 50 }}
                                            source={{ uri: "https://media.licdn.com/dms/image/C4E0BAQG8bdX5sQ24KQ/company-logo_100_100/0/1630619679689/crossover__logo?e=1713398400&v=beta&t=sWqKXP-u1sDu1EY8JCTLC-cCW7yTv9vF3l4t2zIoytM" }} />
                                        <View style={{ padding: 5, flex: 1 }}>
                                            <Text style={{ fontSize: 20, fontFamily: Theme.fonts.text600, color: Theme.colors.primary }}>{item.jobTitle || "-no title-"}</Text>
                                            <Text style={{ fontSize: 16, fontFamily: Theme.fonts.text500 }}>{item.company || "-no company-"}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 6 }}>
                                        <TouchableOpacity onPress={() => navigation.navigate("JobDetails")}
                                            style={{ borderColor: Theme.colors.primary, borderWidth: 1, padding: 5, borderRadius: 100, width: 150, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                            <FontAwesomeIcon icon={faBriefcase} color={Theme.colors.primary} />
                                            <Text style={{ fontSize: 13, alignItems: 'center', fontWeight: 'bold', marginLeft: 5, color: Theme.colors.primary }}>See detials</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => deleteRequest(item.docID)}
                                            style={{ backgroundColor: Theme.colors.red, padding: 5, borderRadius: 100, width: 150, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                            <MaterialCommunityIcons name='delete' size={20} style={{ color: "white" }} />
                                            <Text style={{ fontSize: 13, alignItems: 'center', fontWeight: 'bold', marginLeft: 5, color: "white" }}>Delete</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        }}
                        key={({ item }) => { item.id }}
                    />
                </View>
            </View>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        padding: 10,
        paddingTop: 0,
    },
    topBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    allJobs: {
        borderRadius: 10,
        paddingHorizontal: 10,
        padding: 3,
        flexDirection: "row",
        gap: 3,
        alignItems: 'center'
    },

})