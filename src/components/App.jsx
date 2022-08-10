import { styled } from "solid-styled-components";
import { createContext } from "solid-js";
import { tw } from "twind";
import { useContext } from "solid-js";
export const RouterContext = createContext();

export function RouterWrapper(Comp) {
	return (props = {}) => {
		return (
			<RouterContext.Provider value={props.request}>
				<Comp />
			</RouterContext.Provider>
		);
	};
}

export const Button = styled("button")``;

function RequestPreview() {
	const request = useContext(RouterContext);
	return <pre>{JSON.stringify(request.query, null, 2)}</pre>;
}

export const App = RouterWrapper(() => {
	return (
		<html>
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<style id="_goober">/* extractCss */</style>
			</head>
			<body className={tw`p-4`}>
				<RequestPreview />
			</body>
		</html>
	);
});
