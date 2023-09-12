import TokenContext from '../context/TokenContext';
import { useContext } from 'react';

const useToken = () => {
    return useContext(TokenContext);
}

export default useToken;