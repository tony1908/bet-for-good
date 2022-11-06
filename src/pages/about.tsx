import type { NextPage } from 'next'

import { Heading, Flex, Text } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'
import {WorldIDWidget} from "@worldcoin/id";
import {VerificationResponse} from "@worldcoin/id/dist/types";
import {useAccount, useContract, usePrepareContractWrite, useContractWrite, useProvider, useSigner} from "wagmi";

import { useState } from "react";

import { defaultAbiCoder as abi } from "@ethersproject/abi";

const About: NextPage = () => {

    const [isVerified, setIsVerified] = useState(false);
    const [proof, setProof] = useState("");
    const [txHash, setTxHash] = useState("");

    const { address, isConnecting, isDisconnected, isConnected } = useAccount()

    const { data: signer, isError, isLoading } = useSigner()

     const contract = useContract({
            address: '0xD8d866fC72b74B50897327e3800A48EF51a15FAf',
            abi: '[{"inputs":[{"internalType":"contract IWorldID","name":"_worldId","type":"address"},{"internalType":"string","name":"_actionId","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"InvalidNullifier","type":"error"},{"inputs":[],"name":"balance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"input","type":"address"},{"internalType":"uint256","name":"root","type":"uint256"},{"internalType":"uint256","name":"nullifierHash","type":"uint256"},{"internalType":"uint256[8]","name":"proof","type":"uint256[8]"}],"name":"verifyAndExecute","outputs":[],"stateMutability":"nonpayable","type":"function"}]',
            signerOrProvider: signer,
        })

    const setWorldIDProof = async (proof: VerificationResponse) => {
        setIsVerified(true)

        const claimResult = await contract.verifyAndExecute(
            address,
            proof.merkle_root,
            proof.nullifier_hash,
            abi.decode(["uint256[8]"], proof.proof)[0],
            { gasLimit: 10000000 },
    );
        setTxHash((claimResult as Record<string, string>).hash);
        console.log("Airdrop claimed successfully!", claimResult);
    }

  return (
    <Flex
      direction="row"
      width="100%"
      height="90%"
      alignItems="center"
      justifyContent="space-between"
      padding="2rem"
    >
      <Flex
        width="66%"
        height="100%"
        direction="column"
        justifyContent="space-between"
        gap="3rem"
      >
          <Heading>
              Create Goal
          </Heading>

          <div id="world-id-container"></div>

          {(isConnected && !isVerified) &&
              <div>
                  <Text>
                      Verify yourself first
                  </Text>

                  <WorldIDWidget
                      signal={address}
                      actionId={"wid_staging_71a98c5a470f53875783af0504c302c9"}
                      onSuccess={(proof) => setWorldIDProof(proof)}
                      debug
                  />
              </div>
          }

      </Flex>
    </Flex>
  )
}

export default About
