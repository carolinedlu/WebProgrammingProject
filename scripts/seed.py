import requests
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
		user = ResourceFactory.User(API_USERNAME, API_PASSWORD)
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

def main():
	# TODO(rogowski): implement main seeding
	pass

if __name__ == "__main__":
	main()
