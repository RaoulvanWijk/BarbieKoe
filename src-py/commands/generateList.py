import math
import json

data = {}

def getPlaces(areaNumber, area):
    a = area[0]
    b = area[1]
    c = area[2]
    d = area[3]

    # get the width and height of the area
    width = math.sqrt((b[0] - a[0]) ** 2)
    height = math.sqrt((c[1] - a[1]) ** 2)
    fullArea = width * height

    # get the number of places that can be placed in the area
    divider = 120
    availablePlaces = math.floor(fullArea / divider)

    # give each available place a number and set it to accupied
    placeNumbers = []
    for i in range(availablePlaces):
        placeNumbers.append({"place nummber": i, "accupied": False,})
    
    # return the list of places
    return placeNumbers

def generatePlaces(area):
    print(area)
    areaNumber = area[0]
    areas = area[1]
    
    places = getPlaces(areaNumber, areas)
    # add places to data
    data[areaNumber] = places

# function to generate a json file with the list of places 
def generateJSON():
    with open('places.json', 'w') as outfile:
        json.dump(data, outfile)
    return data
