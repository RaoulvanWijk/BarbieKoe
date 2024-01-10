from findPoint import findB, findC
from checkColors import checkColor
from generateList import generatePlaces, generateJSON
from checkFamily import checkFamily
import numpy as np
import cv2
import itertools
import random

# get the image and resize
img = cv2.imread("assets/MapOld.png")
img = cv2.resize(img, (0, 0), fx=1, fy=1)

imgLine = cv2.imread("assets/MapOld.png")

cv2.imwrite("assets/optimised/(1)resizedMap.png", img)


# HSV
def convert_to_hsv(img):
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    lower_white = np.array([0, 0, 240])
    upper_white = np.array([255, 15, 255])

    mask = cv2.inRange(hsv, lower_white, upper_white)
    res = cv2.bitwise_and(img, img, mask=mask)

    return res


# change image to gray to get rid of unneeded colors
def convert_to_gray(img):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    return gray


# get the corners
def get_corners(gray):
    corners = cv2.goodFeaturesToTrack(gray, 0, 0.001, 10)
    corners = np.intp(corners)
    return corners


def checkPointColor(corners, img):
    orange = np.array([77, 145, 255])
    blue = np.array([255, 182, 56])

    validPoints = []

    for corner in corners:
        x, y = corner.ravel()
        placeColor = img[y, x]
        if np.array_equal(placeColor, orange) or np.array_equal(placeColor, blue):
            continue
        else:
            validPoints.append([x, y])
    validPoints.sort()
    return validPoints


def getBCoords(x, y, cornerArray):
    options = [cb for cb in cornerArray if findB(y, cb[0], cb[1]) is not None]

    new_options = []
    for option in options:
        xd, yd = option
        if xd != x and not checkColor(x, xd, yd, imgLine, "horizontal"):
            new_options.append(option)
    return new_options


# process the image
def process_image(img):
    font = cv2.FONT_HERSHEY_SIMPLEX
    res = convert_to_hsv(img)
    gray = convert_to_gray(res)
    corners = get_corners(gray)
    cornerArray = checkPointColor(corners, img)
    areas = []

    for corner in cornerArray:
        # get the x and y coordinates
        x, y = corner

        # draw the points on the image

        options = getBCoords(x, y, cornerArray)

        # check if there are any options left and get the B coordinate
        for option in options:
            # get the x and y coordinates
            xd, yd = option

            # check if the line is matching bad colors
            res = checkColor(x, xd, yd, imgLine, "horizontal")

            # remove the option if it is the same point or if the line is matching bad colors
            if option[0] == x or res == True:
                options.remove(option)

        # check if there are any options left
        if options == []:
            continue
        # get the x and y coordinates
        xb, yb = options[0]
        # check if the line is not on the same point
        if xb == x:
            continue

        # check if the line is matching bad colors
        res2 = findC(xb, yb, cornerArray)
        if (
            res2 == None
            or checkColor(yb, res2[1], res2[0], imgLine, " vertical")
            or checkColor(y, res2[1], x, imgLine, "vertical")
            or checkColor(x, res2[0], res2[1], imgLine, "horizontal")
        ):
            continue
        # create a number for the area and draw it
        areaNumber = len(areas) + 1
        cv2.putText(
            imgLine,
            str(areaNumber),
            (x, y),
            font,
            0.2,
            (0, 0, 0),
            1,
            cv2.LINE_AA,
        )

        area = [areaNumber, [[x, y], [xb, yb], res2, [x, res2[1]]]]

        if checkFamily(area):
            cv2.rectangle(imgLine, (x, y), (res2[0], res2[1]), (255, 0, 0), 1)
        else:
            cv2.rectangle(imgLine, (x, y), (res2[0], res2[1]), (0, 0, 0), 1)
        # draw the rectangle

        # add the area to the list and generate the places
        area.append(checkFamily(area))
        generatePlaces(area)
        areas.append(area)

    generateJSON()

    # show the image
    cv2.imshow("yes", imgLine)
    cv2.imshow("yes2", img)
    cv2.imwrite("assets/optimised/(3)lines.png", imgLine)
    cv2.imshow("corners", img)
    cv2.imwrite("assets/optimised/(2)points.png", img)


# main function
def main():
    process_image(img)

    cv2.waitKey(0)
    cv2.destroyAllWindows()


if __name__ == "__main__":
    main()

cv2.waitKey(0)
cv2.destroyAllWindows()
