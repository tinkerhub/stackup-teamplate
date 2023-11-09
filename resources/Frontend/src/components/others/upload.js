import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  Divider,
  Button,
  Center,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import Navbar from "../others/navbar";

function UploadQuestion() {
  const [langId, setLangId] = useState("");
  const [category, setCategory] = useState("");
  const [desc, setDesc] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const toast = useToast();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const dataToSend = {
      uid: userInfo._id,
      lang_id: langId,
      category: category,
      desc: desc,
      option1: option1,
      option2: option2,
      option3: option3,
      option4: option4,
      correct_answer: correctAnswer,
    };
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const isSent = await axios.post(
        "http://localhost:5000/quiz/upload",
        dataToSend,
        config
      );
      if (isSent) {
        toast({
          title: "Question Uploaded",
          description: "Your question has been successfully uploaded.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error(err);
      alert("Question uploading failed, please try again.");
    }
  };
  return (
    <>
      <Navbar />
      <Container
        background="white"
        maxW={{ base: "95%", md: "lg", lg: "2xl" }}
        py={8}
        mt="5rem"
        mb="2rem"
        rounded="lg"
      >
        <Text
          textAlign="center"
          fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
          fontWeight="bold"
          color="black"
          pb={6}
        >
          Let's Add some quizzes..
        </Text>
        <Divider />
        <Box p={4} display="flex" justifyContent="center">
          <form onSubmit={handleSubmit}>
            <FormControl id="lang_id" mb={4} isRequired>
              <FormLabel>Topic</FormLabel>
              <Input
                type="text"
                placeholder="Enter topic"
                value={langId}
                onChange={(e) => {
                  setLangId(e.target.value);
                }}
              />
            </FormControl>

            <FormControl id="description" mb={4} isRequired>
              <FormLabel>Question</FormLabel>
              <Input
                type="text"
                placeholder="Enter the Question Details"
                value={desc}
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
              />
            </FormControl>

            <FormControl id="option1" mb={4} isRequired>
              <FormLabel>Option 1</FormLabel>
              <Input
                type="text"
                placeholder="Enter Option 1"
                value={option1}
                onChange={(e) => {
                  setOption1(e.target.value);
                }}
              />
            </FormControl>

            <FormControl id="option2" mb={4} isRequired>
              <FormLabel>Option 2</FormLabel>
              <Input
                type="text"
                placeholder="Enter Option 2"
                value={option2}
                onChange={(e) => {
                  setOption2(e.target.value);
                }}
              />
            </FormControl>

            <FormControl id="option3" mb={4} isRequired>
              <FormLabel>Option 3</FormLabel>
              <Input
                type="text"
                placeholder="Enter Option 3"
                value={option3}
                onChange={(e) => {
                  setOption3(e.target.value);
                }}
              />
            </FormControl>

            <FormControl id="option4" mb={4} isRequired>
              <FormLabel>Option 4</FormLabel>
              <Input
                type="text"
                placeholder="Enter Option 4"
                value={option4}
                onChange={(e) => {
                  setOption4(e.target.value);
                }}
              />
            </FormControl>

            <FormControl id="category" mb={4} isRequired>
              <FormLabel>Category</FormLabel>
              <Select
                placeholder="Select Difficulty Level of the Question"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </Select>
            </FormControl>

            <FormControl id="correct_answer" mb={4} isRequired>
              <FormLabel>Correct Answer</FormLabel>
              <Select
                placeholder="Select Correct Answer"
                value={correctAnswer}
                onChange={(e) => {
                  setCorrectAnswer(e.target.value);
                }}
              >
                <option value="0">Option 1</option>
                <option value="1">Option 2</option>
                <option value="2">Option 3</option>
                <option value="3">Option 4</option>
              </Select>
            </FormControl>
            <Center>
              <Button
                type="submit"
                colorScheme="blue"
                style={{ marginTop: 17, marginBottom: 4 }}
                padding={5}
              >
                Add
              </Button>
            </Center>
          </form>
        </Box>
      </Container>
    </>
  );
}

export default UploadQuestion;
