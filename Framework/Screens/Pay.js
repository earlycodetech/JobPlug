import { View, Text, Alert, ToastAndroid } from "react-native";
import { Paystack } from 'react-native-paystack-webview';
import { addDoc, collection } from 'firebase/firestore';
import { useContext } from "react";
import { AppContext } from "../Components/globalVariables";
import { Theme } from "../Components/Theme";

export function Pay({ navigation, route }) {
    const { userUID, setPreloader, userInfo } = useContext(AppContext);
    const { amount } = route.params
    return (
        <View style={{ flex: 1 }}>
            <Paystack
                paystackKey={"PAYSTACK_PUBLIC_KEY"}
                amount={amount}
                billingEmail={userInfo.email}
                activityIndicatorColor={Theme.colors.green}
                onCancel={() => {
                    navigation.goBack()
                }}
                onSuccess={() => {

                }}
                autoStart={true}
            />
        </View>
    )
}