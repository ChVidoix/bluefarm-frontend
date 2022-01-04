import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import {
  BlueFarmContext,
  BlueFarmContextModel,
} from "../../provider/BlueFarmProvider";
import { Navigate } from "react-router-dom";
import { loginUser } from "../../service/BlueFarmService";
import { LoginResponseModel } from "../../service/BlueFarm.service.const";
import {
  authenticateUser,
  authenticateUserFail,
  authenticateUserLoading,
  setAppStateError,
} from "../../actions/BlueFarmActions";
import { ErrorBox } from "../common/ErrorBox";

const LoginPage = () => {
  const {
    state: {
      auth: { isAuthenticated, isLoading },
      appState: { isLoading: isAppLoading },
    },
    dispatch,
  } = useContext<Partial<BlueFarmContextModel>>(
    BlueFarmContext
  ) as BlueFarmContextModel;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleLoginButton = () => {
    dispatch(authenticateUserLoading());
    loginUser({ username, password })
      .then((res: LoginResponseModel) => {
        dispatch(authenticateUser({ ...res }));
      })
      .catch(() => {
        dispatch(setAppStateError("Logowanie nie powiodo się"));
      });
  };

  if (isAuthenticated) {
    return <Navigate to={"/home"} />;
  }

  if (isAppLoading) {
    return (
      <Center h="80vh">
        <Spinner
          thickness="4px"
          emptyColor="teal.50"
          color="teal.500"
          size="xl"
        />
      </Center>
    );
  }
  return (
    <>
      <ErrorBox />
      <Flex h="91vh" align={"center"} justify={"center"} bg="gray.200">
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Zaloguj się do Bluefarm</Heading>
          </Stack>
          <Box rounded={"lg"} boxShadow={"lg"} p={8} bg="white">
            <Stack spacing={4}>
              <FormControl id="username">
                <FormLabel>Nazwa użytkownika</FormLabel>
                <Input
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Hasło</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  color={"white"}
                  disabled={!username || !password}
                  onClick={handleLoginButton}
                >
                  {isLoading ? <Spinner /> : <>Zaloguj</>}
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default LoginPage;
