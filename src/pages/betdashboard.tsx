import { Button, Link } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useSendTransaction } from 'wagmi'
import { BigNumber } from '@ethersproject/bignumber'
import AnimatedText from 'react-animated-text-content';
import { AwesomeButtonProgress } from "react-awesome-button";
import Image from 'next/image'
import profilePic from '../assets/logos/BFG1.5@2x.png'
import {ButtonBase} from "@mui/material";
import { AwesomeButton } from "react-awesome-button";

import { ConnectButton } from '@rainbow-me/rainbowkit';
// TODO: How to debug for the strings
import { GetGreeter, SetGreeter } from '../components/contract';
import SellOutCheckOut  from "../components/SellOut-Events/SellOutCheckOut";
import { useSelloutModal } from "../context/EventOutProvider";
// import Checko
import { useState } from 'react';
import { Box} from "../components/SellOut-Events/Box";
import { touchableStyles } from "../styles/css/touchableStyles";
import { generateMockData, MockData } from "../utils/generateMockData";


const betdashboard: NextPage = () => {

    // TODO: Adapt to the Backend is Next Project the send tx is = ? the string
    const { data, isIdle, isError, isLoading, isSuccess, sendTransaction } =
        useSendTransaction({
            request: {
                to: 'yanniksood.eth',
                value: BigNumber.from('10000000000000000'), // .1 ETH
            },
        })
    const { sellOutModalOpen, openSellOutModal, closeModal } = useSelloutModal();
    const [checkOutData, setCheckOutData] = useState<any>(null);

    return (
        <div className={''}>
            <div className="grid-element">
                <Image
                    src={profilePic}
                    alt="Picture of the author"
                    width={315} automatically provided
                    height={81} automatically provided
                    blurDataURL="data:..." automatically provided
                    placeholder="blur" // Optional blur-up while loading
                />
            </div>
            <main
                className=""
                style={{
                    minHeight: '60vh',
                    flex: '1',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {/* <button onClick={openSellOutModal}>Open Sellout modal</button> */}
                {sellOutModalOpen && checkOutData && (
                    <CheckoutModal
                        address={false}
                        promoCode={false}
                        data={checkOutData}
                        open={sellOutModalOpen}
                        onClose={closeModal}
                    />
                )}
                <div className="grid md:grid-cols-3 grid-cols-1 mt-10 w-[80%]  ">
                    {generateMockData().map((data, i) => (
                        <div>
                            <MarketCard data={data} setCheckOutData={setCheckOutData} />
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export function MarketCard({ data, setCheckOutData }: { data: MockData; setCheckOutData: (data: any) => void }) {
    const { sellOutModalOpen, openSellOutModal, closeModal } = useSelloutModal();
    return (
        <div className="w-60 rounded overflow-hidden  pt-5  shadow-lg px-5 ">
            <img className="w-full" src={data.image} />
            <div className="px-2   flex flex-col">
                <div>
                    <div className="font-bold flex flex-1 items-center mt-2  text-sm ">{data.name}</div>
                    <div>{data.price} ETH</div>
                </div>

                <div className=" py-2  pb-2 flex justify-center  ">
                    {/* <div
						className="border cursor-pointer px-4 py-2 w-full justify-center flex rounded-lg"
						onClick={(e) => {
							e.stopPropagation();
							setCheckOutData(data);
							openSellOutModal();
						}}
					>
						Buy
					</div> */}
                    <Box
                        as="button"
                        background="accentColor"
                        borderRadius="connectButton"
                        boxShadow="connectButton"
                        className={touchableStyles({ active: 'shrink', hover: 'grow' })}
                        color="accentColorForeground"
                        fontFamily="body"
                        fontWeight="bold"
                        height="40"
                        paddingLeft="36"
                        paddingRight="36"
                        marginBottom="10"
                        key="connect"
                        onClick={(e) => {
                            e.stopPropagation();
                            setCheckOutData(data);
                            openSellOutModal();
                        }}
                        paddingX="14"
                        transition="default"
                        type="button"
                    >
                        Buy
                    </Box>
                </div>
            </div>
        </div>
    );
}

export default betdashboard
