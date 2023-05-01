import React, {useState, useMemo, useEffect} from 'react'
import {ethers } from 'ethers'
import Header from './components/Header'
import farmABI from './ABIs/farmABI.json'
import FTKABI from './ABIs/FTKABI.json'
import ERC20ABI from './ABIs/ERC20ABI.js'
import StakeUnit from './components/StakeUnit'

export default function App() {
    const [provider, setProvider] = useState(new ethers.providers.Web3Provider(window.ethereum));
    const [walletInfo, setWalletInfo] = useState({});
    const [FTKContract, setFTKContract] = useState(new ethers.Contract('0x9e414bd721a1e8Cca621bf996A8Fd3c200a7Aa88', FTKABI, provider));
    const [farmContract, setFarmContract] = useState(new ethers.Contract('0x706Bea3A304A771ed759122C9030D2bF28085032', farmABI, provider));
    const [farmTokensContracts, setFarmTokensContacts] = useState([])


    /*
    useMemo(() => {
        initialize()
    }, [] )

    async function initialize() {
        const FTKAddy = '0x9e414bd721a1e8Cca621bf996A8Fd3c200a7Aa88';
        const farmAddy = '0x706Bea3A304A771ed759122C9030D2bF28085032';

        setFTKContract(new ethers.Contract(FTKAddy, FTKABI, provider))
        setFarmContract(new ethers.Contract(farmAddy, farmABI, provider))

    }
    */

    useEffect(() => {
        getTokenContracts()
    }, [provider, walletInfo, farmContract])

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

    async function handleStake() {

    }

    async function handleWithdraw() {

    }

    async function handleUnstake() {

    }

    async function getTokenContracts() {
        let tokenContracts = [];
        const connectedFarm = farmContract.connect(provider);
        const poolAmount = await connectedFarm.poolLength();

        for (let i = 0; i < poolAmount; i++) {
            const poolInfo = await connectedFarm.poolInfo(i);
            const tokenAddress = poolInfo[0];
            const tokenContract = new ethers.Contract(tokenAddress, ERC20ABI, provider)
            tokenContracts.push({
                tokenContract,
                tokenAddress
            })

        }
        setFarmTokensContacts(tokenContracts)
    }

    const farmUnitElements = farmTokensContracts.map((tokenContract,index) => {
        return (
            <StakeUnit
                pid={index}
                key={tokenContract.tokenAddress}
                token={tokenContract.tokenContract}
                provider={provider}
                handleStake={handleStake}
                walletInfo={walletInfo}
                farmContract={farmContract}
                handleWithdraw={handleWithdraw}
                handleUnstake={handleUnstake}
            />
    )
    })

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

            {farmUnitElements}
        </div>
    )
}