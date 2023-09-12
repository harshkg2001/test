import React, { useState } from "react";
import "./Cart.scss";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useSelector } from "react-redux";
import { removeItem, resetCart } from "../../redux/cartReducer";
import { useDispatch } from "react-redux";
import { makeRequest } from "../../makeRequest";
import { loadStripe } from "@stripe/stripe-js";
import useToken from '../../hooks/useToken';
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import useTransaction from "../../hooks/useTransaction";
import { addToTxn } from "../../redux/txnReducer";
 
const { ethers } = require('ethers');
 
// import { ethers } from 'ethers';
// Replace with your actual private key
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
// const provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/eth_goerli');

const provider = new ethers.providers.JsonRpcProvider('https://goerli.blockpi.network/v1/rpc/public');
 
// Connect the wallet to the provider
const connectedWallet = wallet.connect(provider);
 
// Create a contract instance
const contract_nike = new ethers.Contract(nike, contractABI, connectedWallet);
const contract_puma = new ethers.Contract(puma, contractABI, connectedWallet);
const contract_ads = new ethers.Contract(ads, contractABI, connectedWallet);
const contract_rbk = new ethers.Contract(rbk, contractABI, connectedWallet);
const contract_skt = new ethers.Contract(skt, contractABI, connectedWallet);
 
 
const Cart = ({setOpen}) => {
  const products = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();
 
  const totalPrice = () => {
    let total = 0;
    products.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total.toFixed(2);
  };
 
  const nikePrice = () => {
    let nikeTotal = 0;
    products.forEach((item) => {
      if(item.title.substring(0, 4) === "Nike"){
        console.log("Nike");
        nikeTotal += item.quantity * item.price;
      }
    });
    
    return nikeTotal.toFixed(2);
  };
 
  const rbkPrice = () => {
    let rbkTotal = 0;
    products.forEach((item) => {
      if(item.title.substring(0, 6) === "Reebok"){
        rbkTotal += item.quantity * item.price;
      }
    });
    return rbkTotal.toFixed(2);
  };
 
  const pumaPrice = () => {
    let pumaTotal = 0;
    products.forEach((item) => {
      if(item.title.substring(0, 4) === "Puma"){
        pumaTotal += item.quantity * item.price;
      }
    });
    return pumaTotal.toFixed(2);
  };
 
  const sktPrice = () => {
    let sktTotal = 0;
    products.forEach((item) => {
      if(item.title.substring(0, 7) === "Skechers"){
        sktTotal += item.quantity * item.price;
      }
    });
    return sktTotal.toFixed(2);
  };

  const adsPrice = () => {
    let adsTotal = 0;
    products.forEach((item) => {
      if(item.title.substring(0, 6) === "ADIDAS"){
        adsTotal += item.quantity * item.price;
      }
    });
    return adsTotal.toFixed(2);
  };

  const { token, setToken, pumaToken, setPumaToken, nikeToken, setNikeToken, adsToken, setAdsToken, rbkToken, setRbkToken, sktToken, setSktToken, address, setAddress, payments, setPayments } = useToken();
  const [applied, setApplied] = useState(false)
  const navigate=useNavigate();
  const [discount, setDiscount] = useState(0);

  const {transHistory, setTransHistory} = useTransaction();

  const nikeTotal = nikePrice();
  const pumaTotal = pumaPrice();
  const rbkTotal = rbkPrice();
  const adsTotal = adsPrice();
  const sktTotal = sktPrice();


  const apply = async () =>{
    const pumaBalance = await contract_puma.balanceOf(address);
    const adsBalance = await contract_ads.balanceOf(address);
    const sktBalance = await contract_skt.balanceOf(address);
    const rbkBalance = await contract_rbk.balanceOf(address);
    const nikeBalance = await contract_nike.balanceOf(address);
    console.log('Applied')

    setPumaToken(parseInt(pumaBalance));
    setNikeToken(parseInt(nikeBalance));
    setAdsToken(parseInt(adsBalance));
    setRbkToken(parseInt(rbkBalance));
    setSktToken(parseInt(sktBalance));
    
      if(parseInt(nikeTotal)>0){
        if(parseInt(nikeBalance)){
          console.log("nike", nikeTotal);
          setDiscount(discount=>discount + Math.min(100, parseInt(nikeBalance)));
        }
      }
  
      if(parseInt(pumaTotal)>0){
        if(parseInt(pumaBalance)){
          console.log("puma" ,pumaTotal);
          setDiscount(discount=>discount + Math.min(100, parseInt(pumaBalance)));
        }
      }
  
      if(parseInt(rbkTotal)>0){
        if(parseInt(rbkBalance)){
          console.log("rbk" ,rbkTotal);
          setDiscount(discount=>discount + Math.min(100, parseInt(rbkBalance)));
        }
      }
  
      if(parseInt(adsTotal)>0){
        if(parseInt(adsBalance)){
          console.log("ads", adsTotal);
          setDiscount(discount=>discount + Math.min(100, parseInt(adsBalance)));
        }
      }
      
      // if(sktTotal){
      //   if(sktBalance){
      //     setDiscount(discount=>discount + Math.min(100, parseInt(sktBalance)));
      //   }
      // }
  }

  const handleApply = async(e) => {
    console.log("applying");
    if(!applied) await apply() 
    else{
  setDiscount(0);} 
    setApplied(applied => !applied)
  }

 
  const handlePayment = async () => { 
    setOpen(false)
    try {
        
      // always being called.
      // ---------------------------------------------------
      let history = [];
      // ---------------------------------------------------

      const pumaBalance = await contract_puma.balanceOf(address);
      const adsBalance = await contract_ads.balanceOf(address);
      const sktBalance = await contract_skt.balanceOf(address);
      const rbkBalance = await contract_rbk.balanceOf(address);
      const nikeBalance = await contract_nike.balanceOf(address);
      
      
      if (applied) {
        if(parseInt(nikeTotal)){
          if(parseInt(nikeBalance)){
            const burnTransaction = await contract_nike.burn(address, Math.min(100, parseInt(nikeBalance)));
            console.log(burnTransaction);
            const item1 = {
              hash: burnTransaction.hash,
              time: new Date().toLocaleString(),
              value: -parseInt(Math.min(100, parseInt(nikeBalance))),
              comment: "Burned Nike Tokens"
            };
            // ------------------------------------------
            history = [item1, ...history];
            // ------------------------------------------
            await new Promise(resolve => setTimeout(resolve, 8000));
          }
        }

        if(parseInt(pumaTotal)){
          if(parseInt(pumaBalance)){
            const burnTransaction = await contract_puma.burn(address, Math.min(100, parseInt(pumaBalance)));
            console.log(burnTransaction);
            const item1 = {
              hash: burnTransaction.hash,
              time: new Date().toLocaleString(),
              value: -parseInt(Math.min(100, parseInt(pumaBalance))),
              comment: "Burned Puma Tokens"
            };
            // ------------------------------------------
            history = [item1, ...history];
            // ------------------------------------------
            await new Promise(resolve => setTimeout(resolve, 8000));
          }
        }

        if(parseInt(rbkTotal)){
          if(parseInt(rbkBalance)){
            const burnTransaction = await contract_rbk.burn(address, Math.min(100, parseInt(rbkBalance)));
            console.log(burnTransaction);
            const item1 = {
              hash: burnTransaction.hash,
              time: new Date().toLocaleString(),
              value: -parseInt(Math.min(100, parseInt(rbkBalance))),
              comment: "Burned Reebok Tokens"
            };
            // ------------------------------------------
            history = [item1, ...history];
            // ------------------------------------------
            await new Promise(resolve => setTimeout(resolve, 8000));
          }
        }

        if(parseInt(adsTotal)){
          if(parseInt(adsBalance)){
            const burnTransaction = await contract_ads.burn(address, Math.min(100, parseInt(adsBalance)));
            console.log(burnTransaction);
            const item1 = {
              hash: burnTransaction.hash,
              time: new Date().toLocaleString(),
              value: -parseInt(Math.min(100, parseInt(adsBalance))),
              comment: "Burned ADIDAS Tokens"
            };
            // ------------------------------------------
            history = [item1, ...history];
            // ------------------------------------------
            await new Promise(resolve => setTimeout(resolve, 8000));
          }
        }
        
        // if(sktTotal){
        //   if(sktBalance){
        //     const burnTransaction = await contract_skt.burn(address, Math.min(100, parseInt(sktBalance)));
        //     console.log(burnTransaction);
        //     const item1 = {
        //       hash: burnTransaction.hash,
        //       time: new Date().toLocaleString(),
        //       value: -parseInt(Math.min(100, parseInt(sktBalance))),
        //       comment: "Burned Skechers Tokens"
        //     };
        
        //     await new Promise(resolve => setTimeout(resolve, 5000));
        //   }
        // }
      }
 
      // Minting
      if(parseInt(nikeTotal)){
        const transactionResponse = await contract_nike.mint(address, Math.min(50, parseInt((nikeTotal - Math.min(100, parseInt(nikeBalance))*10)/100)));
        console.log("Minting start...");
        console.log(transactionResponse);
    
        // Wait for the transaction to be mined and confirmed
        const receipt = await transactionResponse.wait();
        const balance = await contract_nike.balanceOf(address);
        setNikeToken(parseInt(balance));

        console.log('Transaction receipt:', receipt);
    
        const item2 = {
          hash:transactionResponse.hash,
          time: new Date().toLocaleString(),
          value: Math.min(50, parseInt((nikeTotal - Math.min(100, parseInt(nikeBalance))*10)/100)),
          comment: "Minted Nike Token"
        };

        // ------------------------------------------
        history = [item2, ...history];
        // ------------------------------------------
        await new Promise(resolve => setTimeout(resolve, 8000));
      }
      if(parseInt(pumaTotal)){
        const transactionResponse = await contract_puma.mint(address, Math.min(50, parseInt((pumaTotal - Math.min(100, parseInt(pumaBalance))*10)/100)));
        console.log("Minting start...");
        console.log(transactionResponse);
    
        // Wait for the transaction to be mined and confirmed
        const receipt = await transactionResponse.wait();
        const balance = await contract_puma.balanceOf(address);
        setPumaToken(parseInt(balance));

        console.log('Transaction receipt:', receipt);
    
        const item2 = {
          hash:transactionResponse.hash,
          time: new Date().toLocaleString(),
          value: Math.min(50, parseInt((pumaTotal - Math.min(100, parseInt(pumaBalance))*10)/100)),
          comment: "Minted Puma Token"
        };

        // ------------------------------------------
        history = [item2, ...history];
        // ------------------------------------------
        await new Promise(resolve => setTimeout(resolve, 8000));
      }

      if(parseInt(adsTotal)){
        const transactionResponse = await contract_ads.mint(address, Math.min(50, parseInt((adsTotal - Math.min(100, parseInt(adsBalance))*10)/100)));
        console.log("Minting start...");
        console.log(transactionResponse);
    
        // Wait for the transaction to be mined and confirmed
        const receipt = await transactionResponse.wait();
        const balance = await contract_ads.balanceOf(address);
        setAdsToken(parseInt(balance));

        console.log('Transaction receipt:', receipt);
    
        const item2 = {
          hash:transactionResponse.hash,
          time: new Date().toLocaleString(),
          value: Math.min(50, parseInt((adsTotal - Math.min(100, parseInt(adsBalance))*10)/100)),
          comment: "Minted ADIDAS Token"
        };

        // ------------------------------------------
        history = [item2, ...history];
        // ------------------------------------------
        await new Promise(resolve => setTimeout(resolve, 8000));
      }

      if(parseInt(rbkTotal)){
        const transactionResponse = await contract_rbk.mint(address, Math.min(50, parseInt((rbkTotal - Math.min(100, parseInt(rbkBalance))*10)/100)));
        console.log("Minting start...");
        console.log(transactionResponse);
    
        // Wait for the transaction to be mined and confirmed
        const receipt = await transactionResponse.wait();
        const balance = await contract_rbk.balanceOf(address);
        setRbkToken(parseInt(balance));

        console.log('Transaction receipt:', receipt);
    
        const item2 = {
          hash:transactionResponse.hash,
          time: new Date().toLocaleString(),
          value: Math.min(50, parseInt((rbkTotal - Math.min(100, parseInt(rbkBalance))*10)/100)),
          comment: "Minted Reebok Token"
        };

        // ------------------------------------------
        history = [item2, ...history];
        // ------------------------------------------
        await new Promise(resolve => setTimeout(resolve, 8000));
      }
      console.log("history", history);
      dispatch(addToTxn(history));

      // setTransHistory((prev) => [history, ...prev]);
      // localStorage.setItem('info', JSON.stringify(transHistory));
  
      const res = await makeRequest.post("/orders", {
        products,
      });
      
      console.log("appended");
      

    }
    catch (err)
    {
      console.log(err);
    }
  };
  return (
    <div className="cart">
      <h1>Products in your cart</h1>
      {products?.map((item) => (
        <div className="item" key={item.id}>
          <img src={process.env.REACT_APP_UPLOAD_URL + item.img} alt="" />
          <div className="details">
            <h1>{item.title}</h1>
            <p>{item.desc?.substring(0, 100)}</p>
            <div className="price">
              {item.quantity} x ₹{item.price}
            </div>
          </div>
          <DeleteOutlinedIcon
            className="delete"
            onClick={() => dispatch(removeItem(item.id))}
          />
        </div>
      ))}
      <div className="total">
        <span>SUBTOTAL</span>
        <div className="total-side">
        <div>₹{totalPrice()}</div>
        {
          applied && <>
            <div> - ₹{discount*10}.00</div>
            <div>₹{totalPrice() - discount*10}.00</div>
          </>
        }
        </div>
      </div>
      <FormGroup>
      <FormControlLabel control={<Checkbox value={applied} onClick={handleApply} />} label="Apply SneaKoins" />
    </FormGroup>
      {totalPrice() != 0 ?  <button onClick={handlePayment} >PROCEED TO CHECKOUT</button> : <></>}
      <span className="reset" onClick={() => dispatch(resetCart())}>
        Reset Cart
      </span>
    </div>
  );
};
 
export default Cart;
 
// const { ethers } = require('ethers');
 
// // import { ethers } from 'ethers';
// // Replace with your actual private key
// const privateKey = '24f17f06fca6eae7f28b581eaf83ec23ee62004f027bed726798ac2b22cae7ae';
 
// // Replace with the contract address and ABI
// const nike = '0x9e84dc3b653E63806FFA245f52ba49C0c3A959e8';
// const puma = '0x3Bbc06863d2cF4E49C7510947BdBcE2d30B757AF';
// const ads = '0xC8E81fe181ce5f426e4Dd14134Edf744beB182e8';
// const rbk = '0x1570F2dA362840Ca18f01A0F6bC0bBb671E86e0A';
// const skt = '0xA242C57922e5e18A532f201945be4e3bC3465897';
// const contractABI = require('../../ABI.json');
 
// // Create a wallet instance from the private key
// const wallet = new ethers.Wallet(privateKey);
 
// // Set up the provider (Ethereum node)
// // const provider = new ethers.providers.JsonRpcProvider('https://rinkeby.infura.io/v3/YOUR_INFURA_PROJECT_ID');
 
// const provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/eth_goerli');
 
// // Connect the wallet to the provider
// const connectedWallet = wallet.connect(provider);
 
// // Create a contract instance
// const contract = new ethers.Contract(nike, contractABI, connectedWallet);
 
// (async () => {
//     try {
//         // Call a specific function of the contract
//         const transactionResponse = await contract.mint('0x57012F9656E7d918964bbF8acA22de688867dADa', 20); // yaha pe uska addresss aa jayega
 
//         // Wait for the transaction to be mined and confirmed
//         const receipt = await transactionResponse.wait();
 
//         console.log('Transaction receipt:', receipt);
//     } catch (error) {
//         console.error('Error calling function:', error);
//     }
// })();
 
 
// (async () => {
//     try {
//       // Replace with the actual Ethereum address for which you want to check the balance
//       const targetAddress = 'TARGET_ADDRESS';
  
//       // Call the balanceOf function of the ERC-20 contract
//       const balance = await contract.balanceOf(targetAddress);
  
//       console.log('Balance:', balance.toString());
//     } catch (error) {
//       console.error('Error calling balanceOf function:', error);
//     }
//   })();