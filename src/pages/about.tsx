import type { NextPage } from 'next'

import { Heading, Flex, Text } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'
import {WorldIDWidget} from "@worldcoin/id";
import {VerificationResponse} from "@worldcoin/id/dist/types";
import {useAccount} from "wagmi";

import { useState } from "react";

const About: NextPage = () => {

    const [isVerified, setIsVerified] = useState(false);
    const [proof, setProof] = useState("");

    const setWorldIDProof = (proof: VerificationResponse) => {
        console.log("el proof")
        console.log(proof.proof)
        setIsVerified(true)
        setProof(proof.proof)
    }

    const { address, isConnecting, isDisconnected, isConnected } = useAccount()

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
