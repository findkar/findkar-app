# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


david = User.create({email:"david@hotmail.com", password: "password", phone: "646-641-4133"});
matt = User.create({email:"matt@hotmail.com", password: "password", phone: "646-123-1234"});