from ultralytics import YOLO

model = YOLO("models/yolo_moedel/best.pt")

result = model(source =0,conf=0.5,show =True,)

result.show()