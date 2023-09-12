import React from 'react';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, TelegramShareButton, PinterestShareButton,LinkedinShareButton } from 'react-share';
import "./share.css";
import twitter from "./twitter.gif" ;
import facebook from "./facebook1.gif" ;
import whatsapp from "./whatsapp1.gif" ;
import telegram from "./telegram.gif";
import pinterest from './pinterest.gif';
import linkedin from "./linkedin.gif";
import useToken from '../../hooks/useToken';
import useTransaction from '../../hooks/useTransaction';
import { useDispatch } from 'react-redux';
import { addToTxn } from '../../redux/txnReducer';
const { ethers } = require('ethers');

const SharePopup = () => {
  const {
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
  // const contractABI = require('../../ABI.json');
  const privateKey = '24f17f06fca6eae7f28b581eaf83ec23ee62004f027bed726798ac2b22cae7ae';
 
// Replace with the contract address and ABI
const nike = '0x9e84dc3b653E63806FFA245f52ba49C0c3A959e8';
const puma = '0x3Bbc06863d2cF4E49C7510947BdBcE2d30B757AF';
const ads = '0xC8E81fe181ce5f426e4Dd14134Edf744beB182e8';
const rbk = '0x1570F2dA362840Ca18f01A0F6bC0bBb671E86e0A';
const skt = '0xA242C57922e5e18A532f201945be4e3bC3465897';
const contractABI = require('../../ABI.json');
 
// Create a wallet instance from the private key
const wallet = new ethers.Wallet(privateKey);
 
// Set up the provider (Ethereum node)
const provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/eth_goerli');
 
// Connect the wallet to the provider
const connectedWallet = wallet.connect(provider);
 
// Create a contract instance
const contract = new ethers.Contract(nike, contractABI, connectedWallet);

const {transHistory, setTransHistory} = useTransaction();
const dispatch=useDispatch();

const handleShare = async () => {
  try {
      console.log("Sending SneaKoins....")
    const transactionResponse = await contract.mint(address, 10); // yaha pe uska addresss aa jayega
      
      // Wait for the transaction to be mined and confirmed
      const receipt = await transactionResponse.wait();
      const balance = await contract.balanceOf(address);
      setToken(parseInt(balance));

    console.log('Transaction receipt:', receipt);


    const item2 = {
      hash:transactionResponse.hash,
      time: new Date().toLocaleString(),
      value: 10,
      comment: "Referral"
    }
    setNikeToken(nikeToken+10);
    setToken(token+10);

    // --------------------------------------------------
    let history = [];
    history = [item2, ...history];

    dispatch(addToTxn(history));
    // --------------------------------------------------------

    // setPayments([item2, ...payments])
    // setPayments(prevArray => [item2, ...prevArray]);
  } catch (err) {
    console.log(err);
  }
};

  const defaultShareMessage = "Hey, I'm using this App, it has a very cool collection of sneakers! Try it on -> ";

  const shareUrl = window.location.href; // You can replace this with your app's URL

  return (
    <div className="share-popup">
      <h2>Share on Social Media</h2>
      <div className="share-icons">
        <WhatsappShareButton url={shareUrl} title={defaultShareMessage} onClick={handleShare}>
          <img src={whatsapp} alt="WhatsApp" className="share-icon" />
        </WhatsappShareButton>
        <TwitterShareButton url={shareUrl} title={defaultShareMessage} onClick={handleShare}>
          <img src={twitter} alt="Twitter" className="share-icon" />
        </TwitterShareButton>
        <TelegramShareButton url={shareUrl} title={defaultShareMessage} onClick={handleShare}>
          <img src={telegram} alt="Telegram" className="share-icon" />
        </TelegramShareButton>
        
        <FacebookShareButton url={"http://www.localhost:3000/"} quote={defaultShareMessage} onClick={handleShare}>
          <img src={facebook} alt="Facebook" className="share-icon" />
        </FacebookShareButton>
        <LinkedinShareButton url={"http://www.localhost:3000/"} quote={defaultShareMessage} onClick={handleShare}>
          <img src={linkedin} alt="linkedin" className="share-icon" />
        </LinkedinShareButton>
        <PinterestShareButton url={"http://www.localhost:3000/"} title={defaultShareMessage} onClick={handleShare}>
          <img src={pinterest} alt="Pinterest" className="share-icon" />
        </PinterestShareButton>
      </div>
    </div>
  );
};

export default SharePopup;

