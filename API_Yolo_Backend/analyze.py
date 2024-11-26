import sys
import torch
import json
from PIL import Image

# Cargar el modelo YOLO
model = torch.hub.load('ultralytics/yolov5', 'custom', path='ruta/al/modelo.pt')

def analyze_image(image_path):
    img = Image.open(image_path)
    results = model(img)
    results_json = results.pandas().xyxy[0].to_dict(orient="records")  # Convertir resultados a JSON
    return results_json

if __name__ == "__main__":
    image_path = sys.argv[1]  # Recibir el argumento de la ruta de la imagen
    results = analyze_image(image_path)
    print(json.dumps(results))  # Devolver el resultado en formato JSON
