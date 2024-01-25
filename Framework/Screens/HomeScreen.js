import { useEffect, useState, useCallback, useContext } from "react";
import { Text, View, SafeAreaView, StyleSheet, Image, TouchableOpacity, TextInput, Dimensions, Alert, ScrollView, FlatList } from "react-native";
import { Theme } from "../Components/Theme";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { Searchbar } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Intro } from "./Intro";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { Profile } from "./Profile";
import Carousel from 'react-native-reanimated-carousel';
import { AppContext } from "../Components/globalVariables";
import { collection, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase/settings";
import { faAngleRight, faBriefcase, faLocationDot, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { PostJob } from "./PostJob";


const carouselLinks = [
    "https://images.pexels.com/photos/5439381/pexels-photo-5439381.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/3760072/pexels-photo-3760072.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/3778966/pexels-photo-3778966.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
]

function Home({ navigation }) {
    const screenWidth = Dimensions.get("screen").width
    const { userUID, setUserInfo, userInfo, setPreloader, setDocID } = useContext(AppContext)
    const [jobs, setJobs] = useState([]);

    async function getUserInfo() {
        onSnapshot(doc(db, "users", userUID), (snapshot) => {
            // console.log(snapshot.data());
            if (snapshot.exists()) {
                setUserInfo(snapshot.data())
            }
        })
    }


    useEffect(() => {
        // console.log(userUID);
        onSnapshot(collection(db, "jobs"), (snapshot) => {
            const allData = []
            snapshot.forEach(item => {
                allData.push({ ...item.data(), docID: item.id })
            })
            setJobs(allData);
        })
        getUserInfo()
    }, [])


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <View style={styles.constainer}>
                <View style={[styles.topBar, { marginBottom: 10 }]}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                        <View style={{ borderRadius: 50, borderColor: Theme.colors.primary, borderWidth: 1, padding: 3 }}>
                            <Image source={{ uri: userInfo.image }} defaultSource={require("../../assets/user.png")} style={styles.dp} />
                        </View>
                        <Text style={{ fontSize: 18 }}>{userInfo.firstName} {userInfo.lastName}</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                        <TouchableOpacity onPress={() => navigation.navigate("Jobs")}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} style={{ marginEnd: 10 }} size={25} color={Theme.colors.primary} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("")}>
                            <FontAwesomeIcon icon={faBell} size={25} color={Theme.colors.primary} />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView >
                    <View style={{ marginVertical: 10, }}>
                        <Carousel
                            loop
                            width={screenWidth - 20}
                            height={200}
                            autoPlay={true}
                            data={carouselLinks}
                            style={{ borderRadius: 10 }}
                            scrollAnimationDuration={2000}
                            renderItem={({ index }) => (
                                <Image style={{ width: '100%', height: 200, borderRadius: 10, }} source={{ uri: carouselLinks[index] }} />
                            )}
                        />
                    </View>

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
                </ScrollView>
            </View>
        </SafeAreaView >
    )
}

const Tab = createBottomTabNavigator();

export function HomeScreen() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color }) => {
                    let iconName;
                    let size;
                    if (route.name === 'Home') {
                        size = focused ? 35 : 23
                        iconName = focused ? 'home' : 'home-outline';
                    }
                    else if (route.name === 'Profile') {
                        size = focused ? 35 : 23
                        iconName = focused ? 'account' : 'account-outline';
                    }
                    else if (route.name === 'PostJob') {
                        size = focused ? 35 : 23
                        iconName = focused ? 'plus' : 'plus-box-outline';
                    }

                    return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: Theme.colors.primary,
                tabBarInactiveTintColor: Theme.colors.blueMedium,
                headerShown: false,
            })}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="PostJob" component={PostJob} options={{ title: "Post Jobs" }} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
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
    dp: {
        borderRadius: 50,
        width: 40,
        height: 40
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