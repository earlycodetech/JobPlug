import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Intro } from "../Screens/Intro";
import { HomeScreen } from "../Screens/HomeScreen";
import { Login } from "../Screens/Login";
import { Signup } from "../Screens/Signup";
import { ForgotPassword } from "../Screens/ForgotPassword";
import { PostJob } from "../Screens/PostJob";
import { EditProfile } from "../Screens/EditProfile";
import { Fund } from "../Screens/Fund";
import { Jobs } from "../Screens/Jobs";
import { MyJobs } from "../Screens/MyJobs";
import { AppliedJobs } from "../Screens/AppliedJobs";
import { ChangePassword } from "../Screens/ChangePassword";

const Stack = createNativeStackNavigator();

export function StackNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Intro" component={Intro} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: true, title: "Log In" }} />
                <Stack.Screen name="Signup" component={Signup} options={{ headerShown: true, title: "Sign Up" }} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: true, title: "Forgot Password" }} />
                <Stack.Screen name="PostJob" component={PostJob} />
                <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: true, title: "Update Profile" }} />
                <Stack.Screen name="Fund" component={Fund} options={{ headerShown: true, title: "Fund Account" }} />
                <Stack.Screen name="Jobs" component={Jobs} options={{ headerShown: true, title: "Jobs" }} />
                <Stack.Screen name="MyJobs" component={MyJobs} options={{ headerShown: true, title: "My Jobs" }} />
                <Stack.Screen name="AppliedJobs" component={AppliedJobs} options={{ headerShown: true, title: "Applied Jobs" }} />
                <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: true, title: "Change Password" }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}