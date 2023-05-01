import React, {useState, useEffect} from 'react'
import {ethers } from 'ethers'
import Header from './components/Header'
import farmABI from './ABIs/farmABI.json'
import FTKABI from './ABIs/FTKABI.json'
import ERC20ABI from './ABIs/ERC20ABI.js'

export default function App() {
    const [provider, setProvider] = useState(new ethers.providers.Web3Provider(window.ethereum));
    const [walletInfo, setWalletInfo] = useState({});
    const [FTKContract, setFTKContract] = useState();
    const [FarmContract, setFarmContract] = useState();

    async function initialize() {
        const FTKAddy = '0x9e414bd721a1e8Cca621bf996A8Fd3c200a7Aa88';
        const FarmAddy = '0x706Bea3A304A771ed759122C9030D2bF28085032';

        setFTKContract(new ethers.Contract(FTKAddy, FTKABI, provider))
        setFarmContract(new ethers.Contract(FarmAddy, farmABI, provider))

    }


    async function connectWallet() {
        setProvider(new ethers.providers.Web3Provider(window.ethereum))
        const accounts = await provider.send('eth_requestAccounts', [])
        const signer = provider.getSigner()


        setWalletInfo(prevInfo => {
            return {
                ...prevInfo,
                address: accounts[0],
                signer,
            }
        })
    }

    provider.provider.on('chainChanged', () => {
        window.location.reload()
    })

    provider.provider.on("accountsChanged", () => {
        connectWallet();
    })

    return (
        <div>
            <Header 
                getAccount={connectWallet} 
                walletInfo={walletInfo} 
            />
        </div>
    )
}