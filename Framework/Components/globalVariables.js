import { createContext, useState } from "react";

const AppContext = createContext();

function AppProvider({ children }) {
    const [userUID, setUserUID] = useState('wYDKqvQUXDhSUtPprlcdb2vKjnI3');
    const [userInfo, setUserInfo] = useState('');
    const [password, setPassword] = useState(undefined);
    const [preloader, setPreloader] = useState(false);


    return (
        <AppContext.Provider value={{
            userInfo, setUserInfo,
            password, setPassword,
            preloader, setPreloader,
            userUID, setUserUID
        }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext, AppProvider }