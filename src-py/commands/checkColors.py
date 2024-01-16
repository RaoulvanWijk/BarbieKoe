import numpy as np


def checkColor(pointA, pointB, possition, img, direction):
    # the colors to check
    brown = np.array([11, 52, 118])
    orange = np.array([77, 145, 255])
    green = np.array([140, 241, 141])
    black = np.array([0, 0, 0])
    blue = np.array([255, 0, 0])
    # set the steps
    step = 1
    if pointB < pointA:
        step = -1
    if direction == "horizontal":
        for i in range(pointA, pointB, step):
            colorInImage = img[possition, i]
            if (
                np.array_equal(colorInImage, brown)
                or np.array_equal(colorInImage, orange)
                or np.array_equal(colorInImage, green)
                or np.array_equal(colorInImage, black)
                or np.array_equal(colorInImage, blue)
            ):
                return True
            else:
                continue
        return False
    elif direction == "vertical":
        for i in range(pointA, pointB, step):
            colorInImage = img[i, possition]
            if (
                np.array_equal(colorInImage, brown)
                or np.array_equal(colorInImage, orange)
                or np.array_equal(colorInImage, green)
                or np.array_equal(colorInImage, black)
                or np.array_equal(colorInImage, blue)
            ):
                return True
            else:
                continue
        return False
    return False
