import React from "react";
import {
  Box,
  Flex,
  Spacer,
  Link,
  Text,
  Avatar,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const navbarStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 1000,
  };
  const linkStyle = {
    textDecoration: "none",
  };
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex align="center" bg="darkblue.900" p={4} color="white" style={navbarStyle}>
      <IconButton
        icon={<HamburgerIcon />}
        aria-label="Open Menu"
        display={{ base: "block", md: "none" }}
        onClick={onOpen}
      />
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">
              {" "}
              <IconButton
                icon={<CloseIcon />} 
                size="sm"
                aria-label="Close"
                onClick={onClose}
                position="absolute"
                top={2}
                right={2}
              />{" "}
              Menu
            </DrawerHeader>
            <DrawerBody>
              <Link href="/testpage" style={linkStyle}>
                <Box display="flex" alignItems="center" mr={4} mb={4}>
                  <Text>Give Test</Text>
                </Box>
              </Link>
           
              <Link href="/uploadQuestion" style={linkStyle}>
                <Box display="flex" alignItems="center" mr={4} mb={4}>
                  <Text>Upload Question</Text>
                </Box>
              </Link>
              <Link href="/leaderboard" style={linkStyle}>
                <Box display="flex" alignItems="center" mr={4} mb={4}>
                  <Text>Leaderboard</Text>
                </Box>
              </Link>
              <Link href="/profile" style={linkStyle}>
                <Box display="flex" alignItems="center" mr={4} mb={4}>
                  <Avatar size="sm" name={user.name} />
                  <Text ml={2}>Profile</Text>
                </Box>
              </Link>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
      <Link href="/testpage" style={linkStyle}>
        <Box display={{ base: "none", md: "flex" }} alignItems="center" mr={4}>
          <Text>Give Test</Text>
        </Box>
      </Link>
      <Link href="/leaderboard" style={linkStyle}>
        <Box display={{ base: "none", md: "flex" }} alignItems="center" mr={4}>
          <Text>Leaderboard</Text>
        </Box>
      </Link>
      <Link href="/uploadQuestion" style={linkStyle}>
        <Box display={{ base: "none", md: "flex" }} alignItems="center" mr={4}>
          <Text>Upload Question</Text>
        </Box>
      </Link>
      <Spacer />
      <Link href="/profile" style={linkStyle}>
        <Box display={{ base: "none", md: "flex" }} alignItems="center" mr={4}>
          <Avatar size="sm" name={user.name} />
          <Text ml={2}>Profile</Text>
        </Box>
      </Link>
    </Flex>
  );
};

export default Navbar;
