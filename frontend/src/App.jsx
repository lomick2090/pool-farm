import React, {useState, useEffect} from 'react'
import {ethers } from 'ethers'
import Header from './components/Header'

export default function App() {
    const [provider, setProvider] = useState(new ethers.providers.Web3Provider(window.ethereum));
    const [walletInfo, setWalletInfo] = useState({});


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