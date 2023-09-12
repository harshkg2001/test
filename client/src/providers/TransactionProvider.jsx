import { useState } from "react";
import TransactionContext from "../context/TransactionContext";

const TransactionProvider = ({ children }) => {
    const [transHistory, setTransHistory] = useState([]);
 
    const value = {
        transHistory, setTransHistory
    }
 
    return (
        <TransactionContext.Provider value={value}>
            {children}
        </TransactionContext.Provider>
    );
};
 
export default TransactionProvider;