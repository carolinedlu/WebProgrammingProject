import requests
import random
from http import HTTPStatus
from resource_factory import ResourceFactory

API_ROOT = "http://comp426.cs.unc.edu:3001"
API_USERNAME = "ilovekmp"
API_PASSWORD = "ilovekmp"

class Seeder:
	def __init__(self):
		self.api = API_ROOT
		self.session = requests.Session()

	# Public API

	def Authenticate(self):
		user = ResourceFactory.User({
			"username": API_USERNAME,
			"password": API_PASSWORD,
		})
		response = self.POST("/sessions", user)
		assert(response.status_code == HTTPStatus.NO_CONTENT)

	def CreateInstance(self, endpoint, data):
		response = self.POST(endpoint, data)
		assert(response.status_code == HTTPStatus.CREATED)
		return response.json()

	def GetInstance(self, endpoint, id):
		response = self.GET("{endpoint}/{id}".format(endpoint=endpoint, id=id))
		assert(response.status_code == HTTPStatus.OK)
		return response.json()

	def GetInstances(self, endpoint):
		response = self.GET(endpoint)
		assert(response.status_code == HTTPStatus.OK)
		return response.json()

	def UpdateInstance(self, endpoint, id, data):
		response = self.PUT("{endpoint}/{id}".format(endpoint=endpoint, id=id), data)
		assert(response.status_code == HTTPStatus.OK)
		return response.json()

	def DeleteInstance(self, endpoint, id):
		response = self.DELETE("{endpoint}/{id}".format(endpoint=endpoint, id=id))
		assert(response.status_code == HTTPStatus.OK)
		return response.json()

	def DeleteAllInstances(self):
		response = self.DELETE("/data")
		return

	# (Private) Helper Methods

	def POST(self, endpoint, data):
		url = self.ConstructUrl(endpoint=endpoint)
		return self.session.post(url=url, json=data)

	def PUT(self, endpoint, data):
		url = self.ConstructUrl(endpoint=endpoint)
		return self.session.put(url=url, json=data)

	def GET(self, endpoint):
		url = self.ConstructUrl(endpoint=endpoint)
		return self.session.get(url=url)

	def DELETE(self, endpoint):
		url = self.ConstructUrl(endpoint=endpoint)
		return self.session.delete(url=url)

	def ConstructUrl(self, endpoint):
		return self.api + endpoint

NUM_INSTANCES_PER_PLANE = 5
NUM_TICKETS_PER_INSTANCE = 5

FIRST_NAMES = ["Aaron", "Paul", "Susan", "Mike", "Dave", "Bob", "Kirk-Matthew"]
LAST_NAMES = ["Frost", "Green", "White", "Michaels", "Jackson", "Giles", "Patricks"]

def main():
	# First, seed via all buttons (except Instances) on http://comp426.cs.unc.edu:3001/seed.html.
	# At time of writing, that is Airlines, Airports, Planes, and Flights.

	# Login
	seeder = Seeder()
	seeder.Authenticate()

	planes = seeder.GetInstances("/planes")
	flights = seeder.GetInstances("/flights")

	# Create seat from first plane (necessary for creating an ticket)
	plane_id = planes[0]["id"]
	seat = ResourceFactory.Seat({
		"plane_id": plane_id,
		"row": 1,
		"number": "A",
	})
	response = seeder.CreateInstance("/seats", seat)
	seat_id = response["id"]

	# Create N instances for each plane
	for count, plane in enumerate(planes):
		print("%d / %d" % (count + 1, len(planes)))
		for i in range(NUM_INSTANCES_PER_PLANE):
			instance = ResourceFactory.Instance({
				"flight_id": random.choice(flights)["id"],
				"date": "2018-12-21",
			})
			response = seeder.CreateInstance("/instances", instance)
			instance_id = response["id"]

			# Create tickets for each instance
			for j in range(NUM_TICKETS_PER_INSTANCE):
				ticket = ResourceFactory.Ticket({
					"first_name": random.choice(FIRST_NAMES),
					"last_name": random.choice(LAST_NAMES),
					"age": 27,
					"seat_id": seat_id,
					"gender": "n/a",
					"instance_id": instance_id,
				})
				seeder.CreateInstance("/tickets", ticket)

if __name__ == "__main__":
	main()
