import { createContext, useState } from "react";

const AppContext = createContext();

function AppProvider({ children }) {
    const [email, setEmail] = useState('john@gmail.com');
    const [password, setPassword] = useState(undefined);


    return (
        <AppContext.Provider value={{ email, setEmail, password, setPassword }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext, AppProvider }