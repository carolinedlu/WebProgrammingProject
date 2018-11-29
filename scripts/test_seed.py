import unittest
import seed
from resource_factory import ResourceFactory

class TestSeed(unittest.TestCase):
    def test_seeder(self):
        # Seeder.Authenticate
        seeder = seed.Seeder()
        seeder.Authenticate()

        # Seeder.DeleteAllInstances
        seeder.DeleteAllInstances()
        response = seeder.GetInstances("/airlines")
        self.assertEqual(len(response), 0)

        # Seeder.CreateInstance
        airline_model = {
            "name": "American Airlines",
            "logo_url": "https://www.aa.com/logo.png",
        }
        airline = ResourceFactory.Airline(airline_model)
        response = seeder.CreateInstance("/airlines", airline)
        airline_id = response["id"]

        # Seeder.GetInstances
        response = seeder.GetInstances("/airlines")
        self.assertEqual(len(response), 1)
        self.assertEqual(response[0]["id"], airline_id)
        self.assertEqual(response[0]["name"], "American Airlines")
        self.assertEqual(response[0]["logo_url"], "https://www.aa.com/logo.png")

        # Seeder.GetInstance
        response = seeder.GetInstance("/airlines", airline_id)
        self.assertEqual(response["id"], airline_id)
        self.assertEqual(response["name"], "American Airlines")
        self.assertEqual(response["logo_url"], "https://www.aa.com/logo.png")

        # Seeder.UpdateInstance
        airline_model["logo_url"] = "https://www.aa.com/new-logo.png"
        airline = ResourceFactory.Airline(airline_model)
        seeder.UpdateInstance("/airlines", airline_id, airline)
        response = seeder.GetInstance("/airlines", airline_id)
        self.assertEqual(response["logo_url"], "https://www.aa.com/new-logo.png")

        # Seeder.DeleteInstance
        seeder.DeleteInstance("/airlines", airline_id)
        response = seeder.GetInstances("/airlines")
        self.assertEqual(len(response), 0)

if __name__ == "__main__":
    unittest.main()
