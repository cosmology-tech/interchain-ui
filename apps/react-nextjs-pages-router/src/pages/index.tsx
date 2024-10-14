import Image from "next/image";
import localFont from "next/font/local";
import { Text, Button, Box, Stack, TextField } from "@interchain-ui/react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col gap-8 row-start-2 items-center justify-center">
        <div className="flex flex-col gap-10 items-center justify-center">
          <Image
            src="/cosmology.svg"
            alt="Cosmology logo"
            width={180}
            height={38}
            priority
          />

          <Text as="h1" color="$text" fontSize="$2xl" fontWeight="$bold">
            Interchain UI React + Next.js Pages Router
          </Text>
        </div>

        <Box
          padding="$6"
          borderRadius="$lg"
          backgroundColor="$cardBg"
          minWidth="500px"
        >
          <Text
            as="h2"
            color="$text"
            fontSize="$lg"
            fontWeight="$bold"
            attributes={{
              marginBottom: "$10",
            }}
          >
            Component playground
          </Text>

          <Stack direction="vertical" space="$10">
            <Button intent="primary">Hello</Button>

            <TextField id="validator" label="Validator" value="Cosmology" />

            <Box bg="$primary100" width="200px" height="200px">
              <Text color="$text">Custom theme</Text>
            </Box>
          </Stack>
        </Box>
      </main>
    </div>
  );
}
