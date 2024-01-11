import { ActivityIndicator, Modal, Text, View } from "react-native";
import { Theme } from "./Theme";
import { AppContext } from "./globalVariables";
import { useContext } from "react";

export function Preloader() {
    const { preloader } = useContext(AppContext)
    return (
        <>
            <Modal
                visible={preloader}
                transparent={true}
            >
                <View style={{
                    justifyContent: "center", alignItems: "center", flex: 1,
                    backgroundColor: "#ffffffcd"
                }}>
                    <ActivityIndicator size="large" color={Theme.colors.primary} />
                </View>
            </Modal>
        </>
    )
}