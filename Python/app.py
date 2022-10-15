import cv2
import pytesseract
import numpy as np
import re

window_name = "Dev"
vid = cv2.VideoCapture(0)


def process(img):
    img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    _, thresh = cv2.threshold(img_gray, 200, 255, cv2.THRESH_BINARY)
    img_canny = cv2.Canny(thresh, 100, 100)
    kernel = np.ones((3, 3))
    img_dilate = cv2.dilate(img_canny, kernel, iterations=2)
    return cv2.erode(img_dilate, kernel, iterations=2)


ret, frame = vid.read()
cv2.imshow(window_name, frame)
f = open("recognized.txt", "a")
while cv2.waitKey(1) & 0xFF != ord('q') and cv2.getWindowProperty(window_name, cv2.WND_PROP_VISIBLE):
    ret, frame = vid.read()
    process(frame)
    word = pytesseract.image_to_string(frame)
    if re.match("^[ A-Za-z0-9_-]*$", word[0: len(word)-2]):
        print(word)
        f.write(word)
    cv2.imshow(window_name, frame)

f.close()
vid.release()
cv2.destroyAllWindows()
