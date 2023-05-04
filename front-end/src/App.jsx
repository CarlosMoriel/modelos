
import { useEffect, useState } from "react";
import "./App.css";
import AppBar from "./components/AppBar";
import ColorsAi from "./components/ColorsAI";
import PlantsAI from "./components/PlantsAI";
import BrandsDetectorAI from "./components/BrandsDetectorAI";

function App() {
	const [page, setPage] = useState("");
	const [renderPage, setRenderPage] = useState("");

	useEffect(() => {
		switch (page) {
			case "Colors AI":
				setRenderPage(<ColorsAi />);
				break;
			case "Plants AI":
				setRenderPage(<PlantsAI />);
				break;
			case "Brands Detector AI":
				setRenderPage(<BrandsDetectorAI />);
				break;
			default:
				setRenderPage(<ColorsAi />);
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
