import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import DrawerMenu from "./DrawerMenu";
import {
  BlueFarmContext,
  BlueFarmContextModel,
} from "../../provider/BlueFarmProvider";
import {
  logoutUserAction,
  logoutUserLoading,
} from "../../actions/BlueFarmActions";
import { memo, useContext } from "react";
import { logoutUser } from "../../service/BlueFarmService";
import NotAuthenticatedLinks from "./NotAuthenticatedLinks";

const NavBar = () => {
  const {
    state: {
      auth: { isAuthenticated, user, token },
    },
    dispatch,
  } = useContext(BlueFarmContext) as BlueFarmContextModel;

  const handleLogout = () => {
    dispatch(logoutUserLoading());
    if (token) {
      logoutUser(token).then(() => {
        dispatch(logoutUserAction());
      });
    }
  };

  return (
    <Box bg="teal.400" px={4} h="9vh">
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        {isAuthenticated && <DrawerMenu />}
        {isAuthenticated ? (
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar size="sm" />
              </MenuButton>
              <MenuList>
                <MenuGroup title={`Logged as ${user?.username}` || "Profile"}>
                  <MenuDivider />
                  <MenuItem>Link 1</MenuItem>
                  <MenuItem>Link 2</MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          </Flex>
        ) : (
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            <NotAuthenticatedLinks />
          </HStack>
        )}
      </Flex>
    </Box>
  );
};
export default memo(NavBar);
