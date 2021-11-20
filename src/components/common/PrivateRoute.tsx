import { Navigate } from "react-router-dom";
import { Auth } from "../../reducer/BlueFarmReducer.const";
import { Box, Center, Spinner } from "@chakra-ui/react";
import { useContext } from "react";
import {
  BlueFarmContext,
  BlueFarmContextModel,
} from "../../provider/BlueFarmProvider";

interface PrivateRouteProps {
  element: JSX.Element;
}

const PrivateRoute = ({ element }: PrivateRouteProps) => {
  const {
    state: {
      auth: { isAuthenticated },
      appState: { isLoading },
    },
  } = useContext(BlueFarmContext) as BlueFarmContextModel;

  if (isLoading) {
    return (
      <Center h="80vh">
        <Spinner
          thickness="4px"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    );
  } else if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  } else {
    return element;
  }
};

export default PrivateRoute;
