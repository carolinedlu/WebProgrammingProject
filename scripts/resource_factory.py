class ResourceFactory:
	# Public API

	def User(user):
		assert("username" in user)
		assert("password" in user)
		return ResourceFactory.ConstructNamedPostData("user", user)

	def Airline(airline):
		assert("name" in airline)
		return ResourceFactory.ConstructNamedPostData("airline", airline)

	def Airport(airport):
		assert("name" in airport)
		assert("code" in airport)
		return ResourceFactory.ConstructNamedPostData("airport", airport)

	def Flight(flight):
		assert("departs_at" in flight)
		assert("arrives_at" in flight)
		assert("number" in flight)
		assert("departure_id" in flight)
		assert("arrival_id" in flight)
		return ResourceFactory.ConstructNamedPostData("flight", flight)

	def Instance(instance):
		assert("flight_id" in instance)
		assert("date" in instance)
		return ResourceFactory.ConstructNamedPostData("instance", instance)

	def Itinerary(itinerary):
		# A model cannot be empty, even if no parameters are required
		assert(len(itinerary) > 0)
		return ResourceFactory.ConstructNamedPostData("itinerary", itinerary)

	def Plane(plane):
		# A model cannot be empty, even if no parameters are required
		assert(len(plane) > 0)
		return ResourceFactory.ConstructNamedPostData("plane", plane)

	def Seat(seat):
		assert("plane_id" in seat)
		assert("row" in seat)
		assert("number" in seat)
		return ResourceFactory.ConstructNamedPostData("seat", seat)

	def Ticket(ticket):
		assert("first_name" in ticket)
		assert("last_name" in ticket)
		assert("age" in ticket)
		assert("gender" in ticket)
		assert("instance_id" in ticket)
		assert("seat_id" in ticket)
		return ResourceFactory.ConstructNamedPostData("ticket", ticket)

	# (Static) Helper Functions

	def ConstructNamedPostData(name, value):
		data = {}
		data[name] = value
		return data
