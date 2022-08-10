import express from "express";
import { renderToString } from "solid-js/web";
import { extractCss } from "solid-styled-components";
import { App } from "./components/App.jsx";
import { init, cleanup, renderHtmlAsJpegBuffer } from "./puppeteer.js";
import gracefulShutdown from "http-graceful-shutdown";
import { setup } from "twind";
import { asyncVirtualSheet, getStyleTagProperties } from "twind/server";

const sheet = asyncVirtualSheet();

setup({ sheet });

const app = express();

app.get("/image/*", async (req, res) => {
	sheet.reset();
	const html = renderToString(() => <App request={req} />);
	const css = extractCss();
	const styleTag = getStyleTagProperties(sheet);
	const rendered = html.replace(
		/\/\* extractCss \*\//gm,
		css + `\n` + styleTag.textContent
	);
	res.type("image/jpeg");
	res.send(await renderHtmlAsJpegBuffer(rendered));
});

const server = app.listen(8080, async () => {
	await init();
	console.log(`[http] http://0.0.0.0:8080`);
});

gracefulShutdown(server, {
	preShutdown: async () => {
		await cleanup();
	},
});
