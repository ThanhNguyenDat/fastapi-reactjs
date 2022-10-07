from typing import Union

from fastapi import FastAPI
import io
import json
from PIL import Image
from fastapi import File,FastAPI
import torch
from fastapi.middleware.cors import CORSMiddleware

from fastapi import FastAPI, File, UploadFile, Form
from fastapi.encoders import jsonable_encoder
import asyncio
import uvicorn
import base64
import cv2
import numpy as np


model = torch.hub.load('ultralytics/yolov5', 'yolov5s')
# img = 'https://ultralytics.com/images/zidane.jpg'
# results = model(img)
# print(results.pandas().xyxy[0].to_json(orient="records"))

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/objectdetection/")
async def objectdetection(image: UploadFile = File(None)):
    try:
        if image == None:
            return jsonable_encoder({
                "code": 201,
                "error_code": 1,
                "msg": "Missing Input Image"
            })

        contents = await asyncio.wait_for(image.read(), timeout=1) 
        
        if(str(contents) =="b''"):
            return jsonable_encoder({
                "code": 201,
                "error_code": 2,
                "msg": "Not found file"
            })
        
        # # check image
        nparr = np.frombuffer(contents, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        if img is None:
            return jsonable_encoder({
                "code": 201,
                "error_code": 3,
                "msg": "Input is not an image"
            })
            
        results = model(img)
        results_json = json.loads(results.pandas().xyxy[0].to_json(orient="records"))
        n = len(results_json)
        # if n>1:
        for i in range(n):
            results_json[i]['xmin'] = int(results_json[i]['xmin'])
            results_json[i]['ymin'] = int(results_json[i]['ymin'])
            results_json[i]['xmax'] = int(results_json[i]['xmax'])
            results_json[i]['ymax'] = int(results_json[i]['ymax'])

        return jsonable_encoder({"result": results_json})
        
    except Exception as e:
        print(e)
        return jsonable_encoder({
                "code": 201,
                "error_code": 0,
                "msg": str(e)
            })


class ObjectDetection:
    def __init__(self):
        pass
    
    def file_or_url(self):
        
        pass
    
    def read_file(self):
        pass
    
    def predict(self):
        pass