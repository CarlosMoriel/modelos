from flask import Flask
from flask import request
from classifyPlants import classify_image

app = Flask(__name__)

@app.route('/plants/upload', methods=['POST'])
def upload_file():
    if request.method == 'POST':
        if 'plant_image' not in request.files:
            return {
                "success": "false",
                "error": "No file part"
            }
    
        f = request.files['plant_image']
        pred = classify_image(f)
        return {
            "success": "true",
            "prediction": pred,
            "error": "None"
        }