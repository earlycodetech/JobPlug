import { useEffect, useState, useCallback, useContext } from "react";
import { Text, View, SafeAreaView, StyleSheet, Image, TouchableOpacity, TextInput, Dimensions, Alert } from "react-native";
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
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { PostJob } from "./PostJob";


const carouselLinks = [
    "https://images.pexels.com/photos/5439381/pexels-photo-5439381.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/3760072/pexels-photo-3760072.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/3778966/pexels-photo-3778966.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
]

function Home() {
    const screenWidth = Dimensions.get("screen").width
    const { userUID, setUserInfo, userInfo, setPreloader } = useContext(AppContext)

    async function getUserInfo() {
        const userInfo = await getDoc(doc(db, "users", userUID))
        // console.log(userInfo.data());
        setUserInfo(userInfo.data())
    }

    function editProfile() {
        setPreloader(true)
        updateDoc(doc(db, "users", userUID), {
            nickname: userInfo.firstName + " " + userInfo.lastName,
            phone: "08066852433",
            lastName: "Joel"
        }).then(() => {
            setPreloader(false)
            Alert.alert(
                "Edit Profile",
                "Profile has been edited successfully",
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

    useEffect(() => {
        // console.log(userUID);

        onSnapshot(collection(db, "jobs"), (snapshot) => {
            snapshot.forEach(item => {
                // console.log(item.data());
            })
        })

        getUserInfo()
    }, [])


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.constainer}>

                <View style={styles.topBar}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                        <Image source={require("../../assets/logo.png")} style={styles.dp} />
                        <Text style={{ fontSize: 18 }}>{userInfo.firstName} {userInfo.lastName}</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} style={{}} size={29} color="#0000007a" />
                        <FontAwesomeIcon icon={faBell} style={{}} size={29} color="#0000007a" />
                    </View>
                </View>

                <View style={{ flex: 1, marginVertical: 10, }}>
                    <Carousel
                        loop
                        width={screenWidth}
                        height={170}
                        autoPlay={true}
                        data={carouselLinks}
                        scrollAnimationDuration={2000}
                        // onSnapToItem={(index) => console.log(index)}
                        renderItem={({ index }) => (
                            <View View
                                style={{ margin: 1 }}
                            >
                                <Image
                                    style={{
                                        width: '100%',
                                        height: 170,
                                        borderRadius: 10,
                                    }}
                                    source={{ uri: carouselLinks[index] }} />
                            </View>
                        )}
                    />
                </View>

                <TouchableOpacity onPress={editProfile} style={[styles.TextInput, { alignItems: 'center', borderColor: Theme.colors.blueMedium, backgroundColor: Theme.colors.blueMedium }]}>
                    <Text style={{ fontFamily: Theme.fonts.text500, color: "white" }}>Share now</Text>
                </TouchableOpacity>
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
        padding: 20,
        paddingTop: 0,
    },
    topBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 10
    },
    dp: {
        borderRadius: 50,
        borderColor: Theme.colors.primary,
        borderWidth: 1,
        padding: 5,
        width: 50,
        height: 50
    },
    searchBar: {
        padding: 5,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 10,
    }

})