# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


david = User.create({email:"david@hotmail.com", password: "password", phone: "646-641-4133"});
matt = User.create({email:"matt@hotmail.com", password: "password", phone: "646-123-1234"});

Parking.create({user_id: david.id, longitude: "-74.0059410", latitude: "40.7127840", time_up: "3"});
Parking.create({user_id: david.id, longitude: "-79.0059410", latitude: "29.7127840", time_up: "2"});
Parking.create({user_id: matt.id, longitude: "-79.0059410", latitude: "29.7127840", time_up: "6"});