import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink, Navigate } from "react-router-dom";
import {
  BlueFarmContext,
  BlueFarmContextModel,
} from "../../provider/BlueFarmProvider";
import { registerUser } from "../../service/BlueFarmService";
import {
  authenticateUser,
  setAppStateError,
} from "../../actions/BlueFarmActions";
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

  const validateForm = (): boolean => {
    setArePasswordsSame(password === passwordConfirmation);
    setAreTermsValid(termsCheckbox);
    return termsCheckbox && password === passwordConfirmation;
  };
  const handleSignInButton = () => {
    if (validateForm()) {
      registerUser({ username, password, email })
        .then((res: LoginResponseModel) => {
          dispatch(authenticateUser({ ...res }));
        })
        .catch(() => {
          dispatch(setAppStateError("Coś poszło nie tak, spróbuj ponownie"));
        });
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/home"} />;
  }

  return (
    <Flex minH="91vh" align={"center"} justify={"center"} bg="gray.200">
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Zarejestruj się w BlueFarm</Heading>
        </Stack>
        <Box rounded={"lg"} bg="white" boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <FormControl id="username">
              <FormLabel>Nazwa użytkownika</FormLabel>
              <Input
                type="text"
                value={username}
                onChange={handleUsernameChange}
              />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Adres email</FormLabel>
              <Input type="email" value={email} onChange={handleEmailChange} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Hasło</FormLabel>
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
              <FormLabel>Potwierdź hasło</FormLabel>
              <Input
                type="password"
                value={passwordConfirmation}
                onChange={handlePasswordConfirmChange}
              />
              {!arePasswordsSame && (
                <FormErrorMessage>Hasła są od siebie różne</FormErrorMessage>
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
                  Potwierdzam, że zapoznałem się z regulaminem
                </Checkbox>
              </Stack>
              <Button color={"white"} onClick={handleSignInButton}>
                Zarejestruj
              </Button>
              <Text>
                Masz już konto?{" "}
                <Link color="teal.600">
                  <RouterLink to={"/login"}>Zaloguj się</RouterLink>
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default RegisterPage;
