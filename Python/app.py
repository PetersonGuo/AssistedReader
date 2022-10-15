import cv2
from tensorflow.keras.datasets import mnist
import numpy as np

window_name = "Dev"
vid = cv2.VideoCapture(0)

ret, frame = vid.read()
cv2.imshow(window_name, frame)
while cv2.waitKey(1) & 0xFF != ord('q') and cv2.getWindowProperty(window_name, cv2.WND_PROP_VISIBLE):
    ret, frame = vid.read()
    cv2.imshow(window_name, frame)

vid.release()
cv2.destroyAllWindows()
