import { useEffect, useState, useCallback, useContext } from "react";
import { Text, View, SafeAreaView, StyleSheet, Image, TouchableOpacity, TextInput, Dimensions, Alert, ScrollView, FlatList } from "react-native";
import { Theme } from "../Components/Theme";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { AppContext } from "../Components/globalVariables";
import { collection, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase/settings";
import { faAngleRight, faBriefcase, faLocationDot, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export function Jobs() {
    const { userUID, setUserInfo, userInfo, allJobs } = useContext(AppContext)
    const [search, setSearch] = useState("")
    const [filteredJobs, setfilteredJobs] = useState([])

    // const exData = [...marketCoins];
    // const newData = exData.filter(ecion => {
    //   return ecion.id.includes(input.toLowerCase()) || ecion.symbol.includes(input.toLowerCase())
    // })
    // setFilteredCoins(newData);

    useEffect(() => {
        setfilteredJobs(allJobs)
    }, [])

    function handleSearch(inp) {
        const nn = "App"
        nn.toUpperCase().includes()
        const filtered = allJobs.filter(all => {
            return all.jobTitle.toLowerCase().includes(inp.toLowerCase()) ||
                all.company.toLowerCase().includes(inp.toLowerCase())
        })
        setfilteredJobs(filtered)
    }
    // Web developer
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <View style={styles.constainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={inp => handleSearch(inp)}
                />
                <View style={{ marginTop: 10 }}>
                    <FlatList
                        data={filteredJobs}
                        renderItem={({ item }) => {
                            return (
                                <View style={{ padding: 5, paddingBottom: 10, marginBottom: 10, borderRadius: 3, borderColor: Theme.colors.primary + 20, borderBottomWidth: 1 }}>
                                    <View style={{ flexDirection: "row", gap: 10 }}>
                                        <Image style={{ width: 90, height: 90 }}
                                            source={{ uri: "https://media.licdn.com/dms/image/C4E0BAQG8bdX5sQ24KQ/company-logo_100_100/0/1630619679689/crossover__logo?e=1713398400&v=beta&t=sWqKXP-u1sDu1EY8JCTLC-cCW7yTv9vF3l4t2zIoytM" }} />
                                        <View style={{ padding: 5, flex: 1 }}>
                                            <Text style={{ fontSize: 20, fontFamily: Theme.fonts.text600, color: Theme.colors.primary }}>{item.jobTitle}</Text>
                                            <Text style={{ fontSize: 16, fontFamily: Theme.fonts.text500 }}>{item.company}</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate("Jobs")} style={[styles.allJobs, { paddingStart: 0 }]}>
                                        <FontAwesomeIcon icon={faLocationDot} color={Theme.colors.primary} size={15} />
                                        <Text style={{ fontSize: 14, fontFamily: Theme.fonts.text500, color: Theme.colors.text }}>{item.jobLocation} ({item.workplace})</Text>
                                    </TouchableOpacity>
                                    <View style={{ backgroundColor: "#00000008", padding: 5, borderRadius: 5 }}>
                                        <Text numberOfLines={2} style={{ fontSize: 15, fontFamily: Theme.fonts.text500, color: Theme.colors.text }}>{item.description}</Text>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 6 }}>
                                            <TouchableOpacity onPress={() => { navigation.navigate("JobDetails"); setDocID(item.docID) }}
                                                style={{ borderColor: Theme.colors.primary, borderWidth: 1, padding: 5, borderRadius: 100, width: 150, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                <FontAwesomeIcon icon={faBriefcase} color={Theme.colors.primary} />
                                                <Text style={{ fontSize: 13, alignItems: 'center', fontWeight: 'bold', marginLeft: 5, color: Theme.colors.primary }}>See detials</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => { navigation.navigate("ApplyNow", { jobTitle: item.jobTitle }); setDocID(item.docID) }}
                                                style={{ backgroundColor: Theme.colors.primary, padding: 5, borderRadius: 100, width: 150, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                <MaterialCommunityIcons name='briefcase-check' size={20} style={{ color: "white" }} />
                                                <Text style={{ fontSize: 13, alignItems: 'center', fontWeight: 'bold', marginLeft: 5, color: "white" }}>Apply now</Text>
                                            </TouchableOpacity>
                                        </View>
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
    input: {
        borderColor: "gray",
        borderWidth: 1,
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        width: "100%",
        fontSize: 18
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