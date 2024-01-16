import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Intro } from "../Screens/Intro";
import { HomeScreen } from "../Screens/HomeScreen";
import { Login } from "../Screens/Login";
import { Signup } from "../Screens/Signup";
import { ForgotPassword } from "../Screens/ForgotPassword";
import { PostJob } from "../Screens/PostJob";

const Stack = createNativeStackNavigator();

export function StackNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Intro" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Intro" component={Intro} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: true, title: "Log In" }} />
                <Stack.Screen name="Signup" component={Signup} options={{ headerShown: true, title: "Sign Up" }} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: true, title: "Forgot Password" }} />
                <Stack.Screen name="PostJob" component={PostJob} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}