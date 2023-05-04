from flask import Flask
from flask import request
from flask_cors import CORS
from plants.classifyPlants import classify_image
from brands_components.classify_brands_components import classify_brands
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

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

@app.route('/brands/upload', methods=['POST'])
def upload_brands_file():
    if request.method == 'POST':
        if 'brands_image' not in request.files:
            return {
                "success": "false",
                "error": "No file part"
            }

        f = request.files['brands_image']
        pred, _ = classify_brands(f)
        return {
            "success": "true",
            "prediction": pred,
            "error": "None"
        }

if __name__ == '__main__':
    app.run()