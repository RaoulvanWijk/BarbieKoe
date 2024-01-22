import math

# x and y coordinates of recreation area
x = 60
y = 100


def checkFamily(area):
    # max distance between an area and the recreation area
    maxDistance = 200

    # get the area number
    areaNumber = area[0]

    # get the area coordinates
    areaCoordinates = area[1]

    # check the correct coordinates
    coordinates = checkLeftCoordinates(areaCoordinates)

    # check if the distance between the recreation are and the coordinates is not too big
    for c in coordinates:
        # get the x and y coordinates
        xc, yc = c

        # get the distance between the recreation area and the coordinates
        distance = math.sqrt((xc - x) ** 2 + (yc - y) ** 2)

        # check if the distance is too big
        if distance < maxDistance:
            # remove the coordinates from the list
            return True
    return False


def checkLeftCoordinates(coords):
    # empty array for the left coordinates
    leftCoords = []

    # check which coordinates have the lowest x value

    for c in coords:
        # get the x and y coordinates
        x, y = c

        # check if the x coordinate is lower than the other x coordinates
        for c2 in coords:
            x2, y2 = c2
            if x < x2:
                leftCoords.append(c)

    # delete the duplicate coordinates
    for c in coords:
        if c in leftCoords:
            leftCoords.remove(c)

    return leftCoords
