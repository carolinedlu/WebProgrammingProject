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
        airline = ResourceFactory.Airline("American Airlines", "https://www.aa.com/logo.png")
        seeder.CreateInstance("/airlines", airline)

        # ResourceFactory.Airport
        airport = ResourceFactory.Airport("Raleigh-Durham International Airport", "RDU")
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
        # TODO(rogowski): Implement and get test to pass
        # itinerary = ResourceFactory.Itinerary()
        # seeder.CreateInstance("/itineraries", itinerary)

        # ResourceFactory.Plane
        # TODO(rogowski): Implement and get test to pass
        # plane = ResourceFactory.Plane()
        # seeder.CreateInstance("/planes", plane)

        # ResourceFactory.Seat
        # TODO(rogowski): Implement and get test to pass
        # seat = ResourceFactory.Seat()
        # seeder.CreateInstance("/seats", seat)

        # ResourceFactory.Ticket
        # TODO(rogowski): Implement and get test to pass
        # ticket = ResourceFactory.Ticket()
        # seeder.CreateInstance("/tickets", ticket)

if __name__ == "__main__":
    unittest.main()
