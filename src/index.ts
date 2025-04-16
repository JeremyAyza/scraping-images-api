import { Hono } from "hono";
import { cors } from 'hono/cors'
import { openAPISpecs } from "hono-openapi";
import { apiReference } from "@scalar/hono-api-reference";
import { scrapImageController } from "./controllers/images.controller";
import { proxyImageController } from "./controllers/proxy.controller";

process.env.TZ = "UTC";
const app = new Hono();

app.use('/*', cors())

app.get(
	"/openapi",
	openAPISpecs(app, {
		documentation: {
			info: {
				title: "Scrap Images API",
				version: "1.0.0",
				description: "Api for get images by query",
			},
			servers: [{ url: `http://localhost:${process.env.PORT || 3000}`, description: "Local Server" }],
		},
	})
);

app.get(
	"/docs",
	apiReference({
		theme: "saturn",
		url: "/openapi",
	})
);

app.get("/", (c) => {
	return c.text("Hello!");
});


app.route("scrap", scrapImageController);
app.route("proxy", proxyImageController);

export default {
	port: process.env.PORT || 3000,
	fetch: app.fetch,
};
