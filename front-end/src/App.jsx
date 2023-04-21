import { useState } from "react";
import "./App.css";
import AppBar from "./components/AppBar";

function App() {
	const [count, setCount] = useState(0);

	return (
		<div className="App">
			<AppBar />
		</div>
	);
}

export default App;
