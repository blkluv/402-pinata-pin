import { Hono } from "hono";
import { cors } from "hono/cors";
import pin from "./routes/pin";
import retrieve from "./routes/retrieve";
import { html } from "./main";
import type { Bindings } from "./utils/types";
import { createDynamicPaymentMiddleware } from "./utils/middleware";

const app = new Hono<{ Bindings: Bindings }>();

app.use(cors());

app.use(async (c, next) => {
  const network = (c.env.NETWORK || "base") as "base" | "base-sepolia";

  return createDynamicPaymentMiddleware(
    "0xA7bF9b7aE0B17F3eD93B302f2fE55aF829DDb8F3" as `0x`,
    {},
    null,
    network
  )(c, next);
});

app.get("/", (c) => c.html(html));

app.route("/v1/pin", pin);
app.route("/v1/retrieve", retrieve);

export default app;
