import { createContext, useState } from "react";

const AppContext = createContext();

function AppProvider({ children }) {
    const [email, setEmail] = useState('john@gmail.com');
    const [password, setPassword] = useState(undefined);
    const [preloader, setPreloader] = useState(false);


    return (
        <AppContext.Provider value={{
            email, setEmail,
            password, setPassword,
            preloader, setPreloader
        }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext, AppProvider }