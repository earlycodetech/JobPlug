const [appIsReady, setAppIsReady] = useState(false);

// npm install @expo-google-fonts/quicksand
async function prepare() {
    try {
        await Font.loadAsync({ Montserrat_400Regular });
        await Font.loadAsync({ Montserrat_500Medium });
        await Font.loadAsync({ Quicksand_600SemiBold });
        await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (e) {
        console.warn(e);
    } finally {
        setAppIsReady(true);
    }
}

useCallback(async () => {
    if (appIsReady) {
        await SplashScreen.hideAsync();
    }
}, [appIsReady]);

if (!appIsReady) {
    return null;
}