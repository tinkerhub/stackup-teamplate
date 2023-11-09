import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import Navbar from "../components/others/navbar";

const Mainpage = () => {
  return (
    <>
      <Navbar />
      <Box
        minH="100vh"
        display="flex"
        justifyContent="center"
        textAlign="center"
        flexDirection="column"
        bgGradient="transparent"
        mx={{ base: "0", md: "auto" }}
        p={4}
      >
        <Heading
          as="h1"
          fontSize={{ base: "4xl", md: "7xl" }}
          color="white"
          mb={4}
        >
          Welcome Quizzy !
        </Heading>
        <Text fontSize={{ base: "xl", md: "2xl" }} color="white" mb={8}>
          lets do some fun quizz...
        </Text>
      </Box>
    </>
  );
};

export default Mainpage;
