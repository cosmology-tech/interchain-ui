import { Stack, Text } from "@interchain-ui/react";
import { Logo } from "./components/logo";

const config = {
  logo: (
    <Stack
      direction="horizontal"
      space="$4"
      attributes={{
        alignItems: "center",
      }}
    >
      <Logo />
      <Text as="p">Interchain UI React Documentation</Text>
    </Stack>
  ),
  project: {
    link: "https://github.com/cosmology-tech/interchain-ui",
  },
  useNextSeoProps() {
    return {
      titleTemplate: "%s – Interchain UI",
    };
  },
};

export default config;
