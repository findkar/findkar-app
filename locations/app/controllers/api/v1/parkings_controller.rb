class Api::V1::ParkingsController < ApplicationController
	require "HTTParty"

	def index
		api_key = ENV["GOOGLE_MAP"]
		
		parkings = Parking.where(user_id: session[:user_id])
		# render json: parkings
		
		# getting car and current location from the DB
		carLongitude = parkings[0].carLongitude
		carLatitude = parkings[0].carLatitude
		currentLatitude = parkings[0].currentLatitude
		currentLongitude = parkings[0].currentLongitude

		# Inserting those values into the API request endpoint
		response = HTTParty.get("https://maps.googleapis.com/maps/api/directions/json?origin="+currentLatitude+","+currentLongitude+"&destination="+carLatitude+","+carLongitude+"&mode=walking&key="+api_key)
		@overview_polyline = response["routes"][0]["overview_polyline"]["points"]

		render json: {overview: @overview_polyline, parking: parkings}

	end

	def create
		parking = Parking.create({user_id: session[:user_id], time_up: params[:time_up], carLongitude: params[:carLongitude], carLatitude: params[:carLatitude]})
		render json: parking
	end

	def update

		parking = Parking.find(params[:id])
		parking.update(time_params)

		render json: parking
	end

	def show
		api_key = ENV["GOOGLE_MAP"]

		parking = Parking.find(params[:id])

		# getting car and current location from the DB
		carLongitude = parking.carLongitude
		carLatitude = parking.carLatitude
		currentLatitude = parking.currentLatitude
		currentLongitude = parking.currentLongitude

		# Inserting those values into the API request endpoint
		response = HTTParty.get("https://maps.googleapis.com/maps/api/directions/json?origin="+currentLatitude+","+currentLongitude+"&destination="+carLatitude+","+carLongitude+"&mode=walking&key="+api_key)
		@overview_polyline = response["routes"][0]["overview_polyline"]["points"]

		render json: {overview: @overview_polyline, parking: parking}
		# render json: parking
	end

	def destroy
		Parking.find(params[:id]).destroy
		render json: 'deleted'
	end



	private

		def time_params
			params.permit(:time_up, :currentLongitude, :currentLatitude)
		end
		
end