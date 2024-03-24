import React, { ErrorInfo } from "react";
import { Box, Button, Text } from "@interchain-ui/react";
import { Layout } from "@/components/layout";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Layout>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            my="$26"
          >
            <Text fontSize="$5xl" textAlign="center" attributes={{ mb: "$8" }}>
              Oops, there is an error!
            </Text>
            <Button onClick={() => this.setState({ hasError: false })}>
              Try again
            </Button>
          </Box>
        </Layout>
      );
    }

    return this.props.children;
  }
}
