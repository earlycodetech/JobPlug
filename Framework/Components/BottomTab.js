export function Home() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color }) => {
                    let iconName;
                    let size;
                    if (route.name === 'HomeScreen') {
                        size = focused ? 35 : 23
                        iconName = focused ? 'home' : 'home-outline';
                    }
                    else if (route.name === 'Quiz') {
                        size = focused ? 35 : 23
                        iconName = focused ? 'bulb' : 'bulb-outline';
                    }
                    else if (route.name === 'Profile') {
                        size = focused ? 35 : 23
                        iconName = focused ? 'person-circle' : 'person-circle-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: Theme.colors.teal800,
                tabBarInactiveTintColor: Theme.colors.gray800,
                headerShown: false,
            })}
        >
            <Tab.Screen name='HomeScreen' component={HomeScreen} options={{ title: "Home" }} />
            <Tab.Screen name='Quiz' component={Quiz} />
            <Tab.Screen name='Profile' component={Profile} />
        </Tab.Navigator>
    )
}``