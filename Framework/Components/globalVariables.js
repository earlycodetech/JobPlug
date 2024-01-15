import { createContext, useState } from "react";

const AppContext = createContext();

function AppProvider({ children }) {
    const [email, setEmail] = useState('');
    const [userUID, setUserUID] = useState('');
    const [userInfo, setUserInfo] = useState('');
    const [password, setPassword] = useState(undefined);
    const [preloader, setPreloader] = useState(false);


    return (
        <AppContext.Provider value={{
            email, setEmail,
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