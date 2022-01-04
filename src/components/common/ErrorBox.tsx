import {
  Alert,
  AlertDescription,
  AlertIcon,
  CloseButton,
} from "@chakra-ui/react";
import "../../styles/styles.css";
import { useCallback, useContext } from "react";
import {
  BlueFarmContext,
  BlueFarmContextModel,
} from "../../provider/BlueFarmProvider";
import { setAppStateError } from "../../actions/BlueFarmActions";

export const ErrorBox = () => {
  const {
    state: {
      appState: { errorMessage },
    },
    dispatch,
  } = useContext(BlueFarmContext) as BlueFarmContextModel;

  const handleClose = useCallback(() => {
    dispatch(setAppStateError(""));
  }, [dispatch]);

  return (
    <>
      {!!errorMessage && (
        <Alert
          border={"red"}
          pos="absolute"
          status={"error"}
          rounded={"lg"}
          h={"3em"}
          w={"30vw"}
          className={"errorBox"}
        >
          <AlertIcon />
          <AlertDescription>{errorMessage}</AlertDescription>
          <CloseButton
            position="absolute"
            right="8px"
            top="8px"
            onClick={handleClose}
          />
        </Alert>
      )}
    </>
  );
};
