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
        seeder.CreateInstance("/airports", airport)

        # ResourceFactory.Flight
        # TODO(rogowski): Investigate why POSTing to /flights doesn't work
        # flight = ResourceFactory.Flight("10:00", "13:00", "AA 2267", 1, 2)
        # seeder.CreateInstance("/flights", flight)

        # ResourceFactory.Instance
        # TODO(rogowski): Investigate why POSTing to /instances doesn't work
        # instance = ResourceFactory.Instance(1, "2018-12-21")
        # seeder.CreateInstance("/instances", instance)

        # ResourceFactory.Itinerary
        itinerary = ResourceFactory.Itinerary({
            "email": "kmp@cs.unc.edu",
        })
        seeder.CreateInstance("/itineraries", itinerary)

        # ResourceFactory.Plane
        plane = ResourceFactory.Plane({
            "name": "AA Airbus A320",
        })
        seeder.CreateInstance("/planes", plane)

        # ResourceFactory.Seat
        # TODO(rogowski): Investigate why POSTing to /seats doesn't work
        # seat = ResourceFactory.Seat({
        #     "plane_id": 2,
        #     "row": 21,
        #     "number": "A",
        # })
        # seeder.CreateInstance("/seats", seat)

        # ResourceFactory.Ticket
        # TODO(rogowski): Investigate why POSTing to /tickets doesn't work
        # ticket = ResourceFactory.Ticket({
        #     "first_name": "Aaron",
        #     "last_name": "Smith",
        #     "age": 27,
        #     "gender": "male",
        #     "instance_id": 1,
        #     "seat_id": 21,
        # })
        # seeder.CreateInstance("/tickets", ticket)

if __name__ == "__main__":
    unittest.main()
