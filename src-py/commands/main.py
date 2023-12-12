import cv2
import numpy as np
import itertools
import random
from findPoint import findB, findC
from checkColors import checkColorHorizontal, checkColorVertical

# get the image and resize
img = cv2.imread("assets/MapOld.png")
img = cv2.resize(img, (0, 0), fx=1, fy=1)

imgLine = cv2.imread("assets/MapOld.png")

cv2.imwrite("assets/optimised/(1)resizedMap.png", img)

# HSV
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
lower_white = np.array([0, 0, 240])
upper_white = np.array([255, 15, 255])

mask = cv2.inRange(hsv, lower_white, upper_white)
res = cv2.bitwise_and(img, img, mask=mask)

# get the corners
gray = cv2.cvtColor(res, cv2.COLOR_BGR2GRAY)
gray = np.float32(gray)

corners = cv2.goodFeaturesToTrack(gray, 0, 0.001, 10)
corners = np.intp(corners)

coordinatesRange = 5

cornerArray = []
areas = []

for cornera in corners:
    x, y = cornera.ravel()
    if (
        np.array_equal(img[y, x], np.array([77, 145, 255])) == True
        or np.array_equal(img[y, x], np.array([255, 182, 56])) == True
    ):
        continue
    else:
        cornerArray.append([x, y])
cornerArray.sort()

# make sure there aren't any duplicates
list(k for k, _ in itertools.groupby(cornerArray))

for c in cornerArray:
    xa, ya = c
    cv2.circle(img, (xa, ya), 1, 255, -1)
    options = []
    for cb in cornerArray:
        xb, yb = cb
        coords = findB(ya, xb, yb)
        if coords == None:
            continue
        else:
            xc, yc = coords
            options.append([xc, yc])

    for option in options:
        xd, yd = option
        res = checkColorHorizontal(xa, xd, yd, imgLine)
        if option[0] == xa:
            options.remove(option)
            continue
        if res == True:
            options.remove(option)
            continue

    if options == []:
        continue
    else:
        xb, yb = options[0]
        if xb == xa:
            continue
        res2 = findC(xb, yb, cornerArray)
        if res2 == False:
            continue
        if res2 == None:
            continue
        else:
            xc, yc = res2
            if checkColorVertical(yb, yc, xc, imgLine) == True:
                continue
            elif checkColorHorizontal(xa, xc, yc, imgLine) == True:
                continue
            else:
                middleX = xa + ((xc - xa) / 2)
                middleY = ya + ((yc - ya) / 2)
                font = cv2.FONT_HERSHEY_SIMPLEX
                red = random.randint(0, 255)
                cv2.putText(
                    imgLine,
                    str([xa, ya]),
                    (xa, ya),
                    font,
                    0.2,
                    (0, 0, 0),
                    1,
                    cv2.LINE_AA,
                )
                cv2.rectangle(imgLine, (xa, ya), (xc, yc), (0, 0, 0), 1)
                areaNumber = len(areas) + 1
                areas.append([[xa, ya], [xb, yb], [xc, yc], [xd, yd]])


# show fields
cv2.imshow("yes", imgLine)
cv2.imshow("yes2", img)
cv2.imwrite("assets/optimised/(3)lines.png", imgLine)
cv2.imshow("corners", img)
cv2.imwrite("assets/optimised/(2)points.png", img)

cv2.waitKey(0)
cv2.destroyAllWindows()
