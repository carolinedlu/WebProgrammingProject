import unittest
import seed
from resource_factory import ResourceFactory

import time

class TestResourceFactory(unittest.TestCase):
    def test_resource_factory(self):
        # Setup
        seeder = seed.Seeder()
        seeder.Authenticate()
        seeder.DeleteAllInstances()

        # ResourceFactory.Airline
        airline = ResourceFactory.Airline({
            "name": "American Airlines",
        })
        seeder.CreateInstance("/airlines", airline)

        # ResourceFactory.Airport
        airport = ResourceFactory.Airport({
            "name": "Raleigh-Durham International Airport",
            "code": "RDU",
        })
        response = seeder.CreateInstance("/airports", airport)
        airport_id = response["id"]

        # ResourceFactory.Flight
        flight = ResourceFactory.Flight({
            "departs_at": "10:00",
            "arrives_at": "13:00",
            "number": "AA 2267",
            "departure_id": airport_id,
            # This plane ain't goin' nowhere
            "arrival_id": airport_id
        })
        response = seeder.CreateInstance("/flights", flight)
        flight_id = response["id"]

        # ResourceFactory.Instance
        instance = ResourceFactory.Instance({
            "flight_id": flight_id,
            "date": "2018-12-21"
        })
        response = seeder.CreateInstance("/instances", instance)
        instance_id = response["id"]

        # ResourceFactory.Itinerary
        itinerary = ResourceFactory.Itinerary({
            "email": "kmp@cs.unc.edu",
        })
        seeder.CreateInstance("/itineraries", itinerary)

        # ResourceFactory.Plane
        plane = ResourceFactory.Plane({
            "name": "AA Airbus A320",
        })
        response = seeder.CreateInstance("/planes", plane)
        plane_id = response["id"]

        # ResourceFactory.Seat
        seat = ResourceFactory.Seat({
            "plane_id": plane_id,
            "row": 21,
            "number": "A",
        })
        response = seeder.CreateInstance("/seats", seat)
        seat_id = response["id"]

        # ResourceFactory.Ticket
        ticket = ResourceFactory.Ticket({
            "first_name": "Aaron",
            "last_name": "Smith",
            "age": 27,
            "gender": "male",
            "instance_id": instance_id,
            "seat_id": seat_id,
        })
        seeder.CreateInstance("/tickets", ticket)

if __name__ == "__main__":
    unittest.main()
