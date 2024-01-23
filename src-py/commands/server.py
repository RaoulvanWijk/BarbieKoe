import json
import requests
import time

# Open the JSON file
with open('places.json', 'r') as file:
    # Load the data
    data = json.load(file)

# Now data is a Python dictionary that you can access like this:
for area in data:
    for place in data[area]:
        initial_place_number = place['place number']
        initial_occupied = place['occupied']
        initial_family = place['family']

        place_number = f"{area}.{initial_place_number}"
        if initial_occupied:
            occupied = 1
        else:
            occupied = 0

        if initial_family:
            family = "family"
        else:
            family = "not family"

        print(
            f'id: {id} Place number: {place_number}, Occupied: {occupied}, Family: {family}')

        # post to the server
        url = "http://localhost:3000/booking/create-camping-spot"
        print(type(id))
        payload = {
            "accommodations_id": 1,
            "spot_name": place_number,
            "spot_status": occupied,
            "notes": family
        }
        headers = {
            'Content-Type': 'application/json'
        }

        response = requests.request(
            "POST", url, headers=headers, data=json.dumps(payload))
        print(response.text)
        time.sleep(0.5)
