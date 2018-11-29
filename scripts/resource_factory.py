class ResourceFactory:
	# Public API

	def User(username, password):
		user = {}
		user["username"] = username
		user["password"] = password
		return ResourceFactory.ConstructNamedPostData("user", user)

	def Airline(name, logo_url=None):
		airline = {}
		airline["name"] = name
		airline["logo_url"] = logo_url
		return ResourceFactory.ConstructNamedPostData("airline", airline)

	def Airport(name, code, latitude=None, longitude=None, city=None, state=None, city_url=None):
		airport = {}
		airport["name"] = name
		airport["code"] = code
		airport["latitude"] = latitude
		airport["longitude"] = longitude
		airport["city"] = city
		airport["state"] = state
		airport["city_url"] = city_url
		return ResourceFactory.ConstructNamedPostData("airport", airport)

	def Flight(departs_at, arrives_at, number, departure_id, arrival_id, plane_id=None, next_flight_id=None, airline_id=None):
		flight = {}
		flight["departs_at"] = departs_at
		flight["arrives_at"] = arrives_at
		flight["number"] = number
		flight["departure_id"] = departure_id
		flight["arrival_id"] = arrival_id
		flight["plane_id"] = plane_id
		flight["next_flight_id"] = next_flight_id
		flight["airline_id"] = airline_id
		return ResourceFactory.ConstructNamedPostData("flight", flight)

	def Instance(flight_id, date, is_cancelled=None):
		instance = {}
		instance["flight_id"] = flight_id
		instance["date"] = date
		instance["is_cancelled"] = is_cancelled
		return ResourceFactory.ConstructNamedPostData("instance", instance)

	def Itinerary():
		assert(False)

	def Plane():
		assert(False)

	def Seat():
		assert(False)

	def Ticket():
		assert(False)

	# (Static) Helper Functions

	def ConstructNamedPostData(name, value):
		data = {}
		data[name] = value
		return data
