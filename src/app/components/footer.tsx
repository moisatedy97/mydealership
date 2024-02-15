import { Link, Text } from "@radix-ui/themes";
import React from "react";

const Footer = () => {
  return (
    <footer className="mt-10 flex h-16 items-center justify-center bg-white text-center">
      <Text color="gray" size={"2"}>
        You can see the repository of this project on <Link>GitHub.</Link>
      </Text>
    </footer>
  );
};

export default Footer;
