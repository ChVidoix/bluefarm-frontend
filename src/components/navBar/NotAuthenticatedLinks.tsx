import { notAuthenticatedLinks } from "./navBar.const";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NotAuthenticatedLinks = () => (
  <>
    {Object.keys(notAuthenticatedLinks).map((link: string) => (
      <Link key={link} to={`/${link}`}>
        <Button w="7vw">{notAuthenticatedLinks[link]}</Button>
      </Link>
    ))}
  </>
);

export default NotAuthenticatedLinks;
