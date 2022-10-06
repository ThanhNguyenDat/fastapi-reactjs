from typing import Union

from fastapi import FastAPI
import io
import json
from PIL import Image
from fastapi import File,FastAPI
import torch

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
        return jsonable_encoder({"result": results_json})
        
    except Exception as e:
        print(e)
        return jsonable_encoder({
                "code": 201,
                "error_code": 0,
                "msg": str(e)
            })

        