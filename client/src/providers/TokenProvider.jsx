import { useState } from "react";
import TokenContext from "../context/TokenContext";
 
/*
{
    time:
    hash:
    value
}
*/
const TokenProvider = ({ children }) => {
    const [token, setToken] = useState(0);
    const [pumaToken, setPumaToken] = useState(0);
    const [nikeToken, setNikeToken] = useState(0);
    const [adsToken, setAdsToken] = useState(0);
    const [rbkToken, setRbkToken] = useState(0);
    const [sktToken, setSktToken] = useState(0);
    const [address, setAddress] = useState(null);
    const [payments, setPayments] = useState([])
 
    const value = {
        token,
        setToken,
        pumaToken,
        setPumaToken,
        nikeToken,
        setNikeToken,
        adsToken,
        setAdsToken,
        rbkToken,
        setRbkToken,
        sktToken,
        setSktToken,
        address,
        setAddress,
        payments,
        setPayments
    }
 
    return (
        <TokenContext.Provider value={value}>
            {children}
        </TokenContext.Provider>
    );
 
};
 
export default TokenProvider;