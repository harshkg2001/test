import React, { useState } from 'react';
import './Transfer.scss'; // Import your CSS file for styling
import useToken from '../../hooks/useToken';
import { CircularProgress } from '@mui/material';
import useTransaction from '../../hooks/useTransaction';
import { useDispatch } from 'react-redux';
import { addToTxn } from '../../redux/txnReducer';

const { ethers } = require('ethers');
const object = {
    nike: '0x9e84dc3b653E63806FFA245f52ba49C0c3A959e8',
    puma: '0x3Bbc06863d2cF4E49C7510947BdBcE2d30B757AF',
    ads: '0xC8E81fe181ce5f426e4Dd14134Edf744beB182e8',
    rbk: '0x1570F2dA362840Ca18f01A0F6bC0bBb671E86e0A',
    skt: '0xA242C57922e5e18A532f201945be4e3bC3465897',
}

const Transfer = () => {
    const sender = '24f17f06fca6eae7f28b581eaf83ec23ee62004f027bed726798ac2b22cae7ae';
    // const [sender, setSender] = useState('');
    // const [tranferToken, setTransferToken] = useState('');
    const [contractAddress, setContractAddress] = useState(0);
    const [receiver, setReceiver] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);

    const  {
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
    } = useToken();
    // --------------------------------------------------------------------
    const {transHistory, setTransHistory} = useTransaction();
    // --------------------------------------------------------------------
    const dispatch = useDispatch();

    const contractABI = require('../../ABI.json');
    const privateKey = sender;
    // const contractAddress = '0x9e84dc3b653E63806FFA245f52ba49C0c3A959e8'; // Replace with your contract address
    // const providerUrl = 'https://rpc.ankr.com/eth_goerli';
    
    const providerUrl = 'https://goerli.blockpi.network/v1/rpc/public';


    async function transferTokens(fromPrivateKey, toAddress, amount) {
        const provider = new ethers.providers.JsonRpcProvider(providerUrl);
        const wallet = new ethers.Wallet(fromPrivateKey, provider);
        const contract = new ethers.Contract(contractAddress, contractABI, wallet);

        try {

            // Call the transfer function to send tokens to the specified address
            const transactionResponse = await contract.transfer(toAddress, amount);

            // Wait for the transaction to be mined and confirmed
            const receipt = await transactionResponse.wait();

            const item1 = {
                hash: transactionResponse.hash,
                time: new Date().toLocaleString(),
                value: -parseInt(Math.min(parseInt(token), amount)),
                comment: "Transferred"
            }

            // --------------------------------------------------
            let history = [];
            history = [item1, ...history];

            dispatch(addToTxn(history));
            // --------------------------------------------------------
            
            // setPayments([item1, ...payments])
            
            if(contractAddress==object.nike)
                setNikeToken(nikeToken-amount);
            if(contractAddress==object.puma)
                setPumaToken(pumaToken-amount);
            if(contractAddress==object.ads)
                setAdsToken(adsToken-amount);
            if(contractAddress==object.rbk)
                setRbkToken(rbkToken-amount);
            if(contractAddress==object.skt)
                setSktToken(sktToken-amount);

            setPayments(prevArray => [item1, ...prevArray]);

            console.log('Transfer transaction receipt:', receipt);

            // Get updated balance of the 'to' address
            const balance = await contract.balanceOf(address);
            setToken(parseInt(balance));
            console.log(`Balance of tokens at address ${toAddress}: ${balance.toString()}`);
        } catch (error) {
            console.error('Error transferring tokens:', error);
        }
    }

    const handleTransfer = async (event) => {
        console.log(contractAddress);
        event.preventDefault();
        setLoading(true)
        await transferTokens(sender, receiver, amount);
        console.log("sender", sender);
        console.log("receiver", receiver);
        console.log("amount", amount);
        setLoading(false)

    };

    // const isButtonDisabled = !sender || !receiver || !amount;

    // return (
    //     <div className="transfer-container">
    //         <h1>Transfer Page</h1>
    //         <div className="transfer-form">
    //             <label htmlFor="sender">Enter Your Private Key:</label>
    //             <input
    //                 type="text"
    //                 id="sender"
    //                 value={sender}
    //                 onChange={(e) => setSender(e.target.value)}
    //             />
    //             <label htmlFor="receiver">Enter Receiver's Address:</label>
    //             <input
    //                 type="text"
    //                 id="receiver"
    //                 value={receiver}
    //                 onChange={(e) => setReceiver(e.target.value)}
    //             />
    //             <label htmlFor="amount">Amount:</label>
    //             <input
    //                 type="text"
    //                 id="amount"
    //                 value={amount}
    //                 onChange={(e) => setAmount(e.target.value)}
    //             />
    //             <button
    //                 className="transfer-button"
    //                 onClick={handleTransfer}
    //                 disabled={isButtonDisabled} // Disable the button if any field is empty
    //             >
    //                 Transfer
    //             </button>
    //         </div>
    //     </div>
    // );
    const handleSelect = (event) => {
        setContractAddress(object[event.target.value])
    }

    return (
        <div className="transfer-container">
            {
                loading ? <CircularProgress /> :
                    <form className="transfer-form">
                        <h1>Transfer Page</h1>
                        <div className='total-form'>
                            {/* <div className='input_style'>
                                <input className='sty'
                                    type="password"
                                    id="sender"
                                    required
                                    placeholder='Enter your Private key'
                                    value={sender}
                                    onChange={(e) => setSender(e.target.value)}
                                />
                            </div> */}
                            <div className='input_style'>
                                <input className='sty'
                                    type="text"
                                    id="receiver"
                                    required
                                    placeholder="Enter Receiver's Address"
                                    value={receiver}
                                    onChange={(e) => setReceiver(e.target.value)}
                                />
                            </div>
                            <div className='middle-form'>
                                <div className='input_style'>
                                    <select className='middle-style' id="select_token" required onChange={handleSelect}>
                                        {/* <option value="" disabled>Select Token</option> */}
                                        <option value="puma">puma</option>
                                        <option value="nike">nike</option>
                                        <option value="ads">ads</option>
                                        <option value="rbk">rbk</option>
                                        <option value="skt">skt</option>
                                    </select>
                                </div>
                                <div className='input_style'>
                                    <input className='middle-style'
                                        type="text"
                                        id="amount"
                                        value={amount}
                                        placeholder='Amount'
                                        required
                                        onChange={(e) => setAmount(e.target.value)}
                                    />
                                </div>
                            </div>
                            {/* <div className='input_style'>
                                <input className='sty'
                                    type="text"
                                    id="Remark"
                                    placeholder='Remark'
                                />
                            </div> */}
                        </div>
                        <button type='submit' className="transfer-button" onClick={handleTransfer}>
                            Transfer
                        </button>
                    </form>
            }

        </div>
    );
}

export default Transfer;