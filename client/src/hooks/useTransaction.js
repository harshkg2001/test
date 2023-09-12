import { useContext } from 'react';
import TransactionContext from '../context/TransactionContext';

const useTransaction = () => {
    return useContext(TransactionContext);
}

export default useTransaction;