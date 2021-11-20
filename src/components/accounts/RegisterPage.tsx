import React, { useContext, useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Link, Navigate } from "react-router-dom";
import styles from "../../styles/App.css";
import {
  BlueFarmContext,
  BlueFarmContextModel,
} from "../../provider/BlueFarmProvider";
import { registerUser } from "../../service/BlueFarmService";
import { authenticateUser } from "../../actions/BlueFarmActions";
import { LoginResponseModel } from "../../service/BlueFarm.service.const";

const RegisterPage = () => {
  const {
    state: {
      auth: { isAuthenticated },
    },
    dispatch,
  } = useContext(BlueFarmContext) as BlueFarmContextModel;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [arePasswordsSame, setArePasswordsSame] = useState(true);
  const [termsCheckbox, setTermsCheckbox] = useState(false);
  const [areTermsValid, setAreTermsValid] = useState(true);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handlePasswordConfirmChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordConfirmation(event.target.value);
  };

  const handleTermsCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTermsCheckbox(event.target.checked);
  };

  const validateForm = () => {
    setArePasswordsSame(password === passwordConfirmation);
    setAreTermsValid(termsCheckbox);
  };

  const handleSignInButton = () => {
    validateForm();
    if (arePasswordsSame && areTermsValid) {
      registerUser({ username, password, email })
        .then((res: LoginResponseModel) => {
          dispatch(authenticateUser({ ...res }));
        })
        .catch((res) => {
          console.log("error", res);
        });
    }
  };

  const boxColor = useColorModeValue("white", "gray.700");
  const flexColor = useColorModeValue("gray.50", "gray.800");

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={flexColor}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Register to BlueFarm</Heading>
        </Stack>
        <Box rounded={"lg"} bg={boxColor} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <FormControl id="username">
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                value={username}
                onChange={handleUsernameChange}
              />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" value={email} onChange={handleEmailChange} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </FormControl>
            <FormControl
              id="passwordConfirmation"
              isInvalid={!arePasswordsSame}
            >
              <FormLabel>Confirm your password</FormLabel>
              <Input
                type="password"
                value={passwordConfirmation}
                onChange={handlePasswordConfirmChange}
              />
              {!arePasswordsSame && (
                <FormErrorMessage>
                  The password confirmation does not match
                </FormErrorMessage>
              )}
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox
                  isInvalid={!areTermsValid}
                  checked={termsCheckbox}
                  onChange={handleTermsCheckbox}
                >
                  I agree with the terms and conditions
                </Checkbox>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleSignInButton}
              >
                Register
              </Button>
              <Text>
                Already have an account? <Link to={"/login"}>Sign in</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default RegisterPage;
