import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ReactNoSSR } from "../src/react-no-ssr";

vi.mock("server-only", () => ({}));

describe("<ReactNoSsr />", () => {
  describe("server-side rendering", () => {
    it("should not render the children on server side", () => {
      const result = ReactDOMServer.renderToString(
        <ReactNoSSR>
          <span>Hello</span>
        </ReactNoSSR>,
      );

      expect(result).to.equal("");
    });
  });

  describe("client-side rendering", () => {
    it("should render the children on client side", async () => {
      render(
        <ReactNoSSR>
          <span id="client-only">Hello</span>
        </ReactNoSSR>,
      );

      await screen.findByText("Hello");
      expect(screen.getByText("Hello")).toBeInTheDocument();
    });
  });

  describe("fallback prop", () => {
    it("should render fallback", async () => {
      const result = ReactDOMServer.renderToString(
        <ReactNoSSR fallback={<span>fallback</span>}>
          <span>Hello</span>
        </ReactNoSSR>,
      );

      expect(result).to.equal("<span>fallback</span>");
    });
  });
});
