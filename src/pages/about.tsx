import type { NextPage } from 'next'

import { Heading, Flex, Text, Stack } from '@chakra-ui/layout'
import { Input, Button, ButtonGroup } from '@chakra-ui/react'
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

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [goal, setGoal] = useState(0);

    const handleChangeName = (event) => setName(event.target.value)
    const handleChangeDescription = (event) => setDescription(event.target.value)
    const handleChangeGoal = (event) => setGoal(event.target.value)

    const [np, setNp] = useState({
        name:"",
        description:"",
        goal:0,
    });

    const { address, isConnecting, isDisconnected, isConnected } = useAccount()

    const { data: signer, isError, isLoading } = useSigner()



     // @ts-ignore
    const contract = useContract({
            address: '0x1B28DC379e6D6BF2a0Cb4Dfa342e31d6f0178b98',
            abi: [
                {
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "_name",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "_description",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "_goal",
                            "type": "uint256"
                        }
                    ],
                    "name": "addNP",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "contract IWorldID",
                            "name": "_worldId",
                            "type": "address"
                        },
                        {
                            "internalType": "string",
                            "name": "_actionId",
                            "type": "string"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "constructor"
                },
                {
                    "inputs": [],
                    "name": "InvalidNullifier",
                    "type": "error"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "input",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "root",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "nullifierHash",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256[8]",
                            "name": "proof",
                            "type": "uint256[8]"
                        }
                    ],
                    "name": "verifyAndExecute",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "balance",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "count",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "name": "nps",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "name",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "description",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "goal",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                }
            ],
            signerOrProvider: signer,
        })

    const setWorldIDProof = async (proof: VerificationResponse) => {
        setIsVerified(true)

       /* console.log("proof")
        console.log(proof)
        console.log(address)
        console.log(proof.merkle_root)
        console.log(proof.nullifier_hash)
        console.log(abi.decode(["uint256[8]"], proof.proof)[0])
        console.log(proof.proof)

        const claimResult = await contract.verifyAndExecute(
            address,
            proof.merkle_root,
            proof.nullifier_hash,
            abi.decode(["uint256[8]"], proof.proof)[0],
            { gasLimit: 10000000 },
        );
        setTxHash((claimResult as Record<string, string>).hash);
        console.log("Airdrop claimed successfully!", claimResult);*/

        const res = await contract.nps(
            address,
            { gasLimit: 10000000 },
        );
        console.log("Airdrop claimed successfully!", res);
        setNp(res)
    }

    const handleCreate = async () => {
        const res = await contract.addNP(
            name,
            description,
            goal,
            { gasLimit: 10000000 },
        );
        console.log("Airdrop claimed successfully!", res);
        setNp({
            "name":name,
            "description": description,
            "goal":goal
        })
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
        width="50%"
        height="100%"
        direction="column"
      >


          <Heading>
              Profile
          </Heading>

          <div id="world-id-container"></div>

          {(isConnected && !isVerified) &&
              <div>
                  <Text>
                      Verify yourself to create a profile
                  </Text>

                  <WorldIDWidget
                      signal={address}
                      actionId={"wid_staging_71a98c5a470f53875783af0504c302c9"}
                      onSuccess={(proof) => setWorldIDProof(proof)}
                      debug
                  />
              </div>
          }

          {(isVerified && np.goal == 0) &&
              <Stack spacing={3}>
                  <Text>Create Profile</Text>
                  <Input
                      placeholder='Nombre'
                      onChange={handleChangeName}
                  />
                  <Input
                      placeholder='Descripcion'
                      onChange={handleChangeDescription}
                  />
                  <Input
                      placeholder='Meta'
                      onChange={handleChangeGoal}
                  />
                  <Button onClick={handleCreate} colorScheme='blue'>Button</Button>
              </Stack>
          }

          {(np.goal > 0) &&
              <Stack spacing={3}>
                  <Text>{np.name}</Text>
                  <Text>{np.description}</Text>
              </Stack>
          }

      </Flex>
    </Flex>
  )
}

export default About
