import numpy as np


def checkColorHorizontal(xa, xb, yb, img):
    direction = 1
    if xb < xa:
        direction = -1
    for i in range(xa, xb, direction):
        if (
            np.array_equal(img[yb, i], np.array([11, 52, 118])) == True
            or np.array_equal(img[yb, i], np.array([77, 145, 255])) == True
            or np.array_equal(img[yb, i], np.array([140, 241, 141])) == True
            or np.array_equal(img[yb, i], np.array([0, 0, 0])) == True
        ):
            return True
        else:
            continue

    return False


def checkColorVertical(yb, yc, xc, img):
    direction = 1
    if yc < yb:
        direction = -1
    for i in range(yb, yc, direction):
        if (
            np.array_equal(img[i, xc], np.array([11, 52, 118])) == True
            or np.array_equal(img[i, xc], np.array([77, 145, 255])) == True
            or np.array_equal(img[i, xc], np.array([140, 241, 141])) == True
            or np.array_equal(img[i, xc], np.array([0, 0, 0])) == True
        ):
            return True
        else:
            continue

    return False
