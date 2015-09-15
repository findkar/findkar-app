var ParkingCollection = Backbone.Collection.extend({
	url: '/api/v1/parkings',
	model: Parking 
});

var parkings = new ParkingCollection();