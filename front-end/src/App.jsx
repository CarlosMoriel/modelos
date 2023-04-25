
import { useEffect, useState } from "react";
import "./App.css";
import AppBar from "./components/AppBar";
import ColorsAi from "./components/ColorsAI";
import ImagesAI from "./components/ImagesAI";

function App() {
	const [page, setPage] = useState("");
	const [renderPage, setRenderPage] = useState("");

	useEffect(() => {
		switch (page) {
			case "Images AI":
				setRenderPage(<ImagesAI />);
				break;
			case "Colors AI":
				setRenderPage(<ColorsAi />);
				break;
			default:
				setRenderPage(<ImagesAI />);
				break;
		}
	}, [page]);

	return (
		<div className="App">
			<AppBar setPage={setPage} />
			{renderPage}
		</div>
	);
}


export default App;
