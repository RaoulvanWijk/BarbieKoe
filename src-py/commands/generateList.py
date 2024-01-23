import math
import json

data = {}


def getPlaces(areaNumber, area, family):
    a, b, c, d = area

    # get the width and height of the area
    width = math.sqrt((b[0] - a[0]) ** 2)
    height = math.sqrt((c[1] - a[1]) ** 2)
    fullArea = width * height

    # get the number of places that can be placed in the area
    divider = 300
    availablePlaces = math.floor(fullArea / divider)

    # give each available place a number and set it to accupied
    placeNumbers = []
    for i in range(availablePlaces):
        placeNumbers.append(
            {
                "place number": i,
                "occupied": False,
                "family": family,
            }
        )

    # return the list of places
    return placeNumbers


def generatePlaces(area):
    areaNumber = area[0]
    areas = area[1]
    family = area[2]

    places = getPlaces(areaNumber, areas, family)
    # add places to data
    data[areaNumber] = places


# function to generate a json file with the list of places
def generateJSON():
    with open("places.json", "w") as outfile:
        json.dump(data, outfile)
    return data
