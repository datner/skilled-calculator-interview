import React, { useState, useCallback, MouseEventHandler } from "react";
import "./App.css";

const keys = [7, 8, 9, "+", 4, 5, 6, "-", 1, 2, 3, "/", 0, ".", "=", "x"];

function App() {
	const [display, setDisplay] = useState("0");
	const [newNum, setNewNum] = useState(true);
	const [eq, setEq] = useState("");

	const handleDel = useCallback<MouseEventHandler<HTMLButtonElement>>((e) => {
		setDisplay("0");
		setEq("");
		setNewNum(true);
	}, []);

	/**
	 * Developer note:
	 * Don't use `eval` or global `isNaN` in actual production apps.
	 * one is hazardous and the other doesn't actually work
	 * (true, null, and whitespace are numbers according to `isNaN` )
	 */
	const handleClick = useCallback<MouseEventHandler<HTMLButtonElement>>(
		(e) => {
			const symbol = e.currentTarget.textContent;
			if (!symbol || symbol === ".") return;

			if (symbol === "=") {
				// eslint-disable-next-line no-eval
				const value = eval(eq);
				console.log({ eq, value });
				setDisplay(value);
				setEq("" + value);
				return;
			}
			// Typescript typing is wrong, the global `isNaN` casts to number and then checks
			// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN
			if (isNaN((symbol as unknown) as number)) {
				setEq((prev) => (newNum ? prev.slice(0, -1) : prev + " ") + symbol);
				setNewNum(true);
				return;
			}

			if (newNum) {
				setDisplay(symbol);
				setEq((prev) => prev + ` ${symbol}`);
				setNewNum(false);
				return;
			}
			setDisplay((num) => num + symbol);
			setEq((prev) => prev + symbol);
		},
		[newNum, eq]
	);
	return (
		<div className="calculator">
			<button onClick={handleDel}>del</button>
			<div>{display}</div>
			{keys.map((key) => (
				<button key={key} onClick={handleClick}>
					{key}
				</button>
			))}
		</div>
	);
}

export default App;
