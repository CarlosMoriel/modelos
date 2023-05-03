import React from "react";
const PlantsAI = () => {
    const [guessedPlant, setGuessedPlant] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [showSupportedPlants, setShowSupportedPlants] = React.useState(false);

    const uploadImage = async (e) => {
        try {
            setLoading(true);
            await guessPlant(e);
        } finally {
            setLoading(false);
        }
    }

    const guessPlant = async (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const formData = new FormData();
        formData.append('plant_image', file);

        const uploadFileResponse = await fetch('http://127.0.0.1:5000/plants/upload', {
            method: 'POST',
            body: formData
        }).then(res => res.json());
        const prediction = uploadFileResponse?.prediction[0];
        if (!prediction) return;

        setGuessedPlant(prediction);
    }

    return (
        <div>
            <h1>Plants AI</h1>
            <h2>Let's guess your plant</h2>
            <p>
                <a onClick={ () => setShowSupportedPlants(!showSupportedPlants) }>See supported plants</a>
            </p>
            { showSupportedPlants && <p>Aptenia cordifolia, aloe vera, epipremnum aureum, sansevieria trifasciata, spathiphyllum</p> }
            <input type="file" accept="image/*" onChange={ (e) => uploadImage(e) } />
            { guessedPlant && !loading && <h1>Your plant seems to be: { guessedPlant }</h1> }
        </div>
    )
};

export default PlantsAI;