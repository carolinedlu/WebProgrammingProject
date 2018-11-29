class ResourceFactory:
	# Public API

	def User(user):
		assert("username" in user)
		assert("password" in user)
		return ResourceFactory.ConstructNamedPostData("user", user)

	def Airline(airline):
		# TODO(rogowski): add assertions for required fields
		return ResourceFactory.ConstructNamedPostData("airline", airline)

	def Airport(airport):
		# TODO(rogowski): add assertions for required fields
		return ResourceFactory.ConstructNamedPostData("airport", airport)

	def Flight(flight):
		# TODO(rogowski): add assertions for required fields
		return ResourceFactory.ConstructNamedPostData("flight", flight)

	def Instance(instance):
		# TODO(rogowski): add assertions for required fields
		return ResourceFactory.ConstructNamedPostData("instance", instance)

	def Itinerary(itinerary):
		# TODO(rogowski): add assertions for required fields
		return ResourceFactory.ConstructNamedPostData("itinerary", itinerary)

	def Plane(plane):
		# TODO(rogowski): add assertions for required fields
		return ResourceFactory.ConstructNamedPostData("plane", plane)

	def Seat(seat):
		# TODO(rogowski): add assertions for required fields
		return ResourceFactory.ConstructNamedPostData("seat", seat)

	def Ticket(ticket):
		# TODO(rogowski): add assertions for required fields
		return ResourceFactory.ConstructNamedPostData("ticket", ticket)

	# (Static) Helper Functions

	def ConstructNamedPostData(name, value):
		data = {}
		data[name] = value
		return data
