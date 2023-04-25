import { useEffect, useState } from "react";
import * as brain from "brain.js";
import { SketchPicker } from "react-color";
import "../Css/ColorsAi.css";

function ColorsAi() {
	const [color, setColor] = useState("#fff");
	const [textColor, setTextColor] = useState(1);

	// Iniciamos la red neuronal
	const [network, setNetwork] = useState(new brain.NeuralNetwork());

	//Entrenar red neuronal
	network.train([
		//Fondo Negro --> Texto Blanco
		{ input: { r: 0, g: 0, b: 0 }, output: { color: 1 } },
		//Fondo Blanco --> Texto Negro
		{ input: { r: 1, g: 1, b: 1 }, output: { color: 0 } },
	]);

	const handleChangeComplete = (color) => {
		//Cambiar el color del fondo
		setColor(color);
		document.querySelector(".background").style.backgroundColor = color.hex;

		//Cambiar el color del texto con el modelo entrenado
		const r = color.rgb.r / 255;
		const g = color.rgb.g / 255;
		const b = color.rgb.b / 255;

		let input = { r, g, b };

		let result = network.run(input);

		if (result.color > 0.5) {
			document.querySelector(".text").style.color = "white";
			setTextColor(1);
		} else {
			document.querySelector(".text").style.color = "black";
			setTextColor(0);
		}
	};

	const handleOnTrainColor = () => {
		const r = color.rgb.r / 255;
		const g = color.rgb.g / 255;
		const b = color.rgb.b / 255;

		let input = { r, g, b };

		let newTextColor = 0;

		if (textColor === 0) {
			document.querySelector(".text").style.color = "white";
			setTextColor(1);
			newTextColor = 1;
		} else {
			document.querySelector(".text").style.color = "black";
			setTextColor(0);
			newTextColor = 0;
		}
		network.train([
			//Nuevo entrenamiento
			{ input, output: { color: newTextColor } },
		]);
	};

	return (
		<div>
			<div className="ColorSelect">
				<SketchPicker
					className="select"
					color={color}
					onChangeComplete={handleChangeComplete}
				/>
				<div className="background">
					<p className="text">Remine</p>
				</div>
			</div>
			<div className="actions">
				<button className="btn" onClick={handleOnTrainColor}>
					Cambiar Color
				</button>
			</div>
		</div>
	);
}

export default ColorsAi;
