class Api::V1::ParkingsController < ApplicationController
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
		parking = Parking.create({user_id: session[:user_id], time_up: params[:time_up], carLongitude: params[:carLongitude], carLatitude: params[:carLatitude], currentLongitude: "-73.98961020000002", currentLatitude: "40.7400668"})
		# send_user_text_message(run_at: params[:time_up])
		render json: parking
	end
	def update
		parking = Parking.find(params[:id])
		parking.update(time_up: params[:time_up], currentLatitude: params[:currentLatitude], currentLongitude: params[:currentLongitude])
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
		expire_time = parking.time_up
		if expire_time - Time.now < 0 
			time_left = 0
		else
			time_left = expire_time - Time.now
		end	
		render json: {overview: @overview_polyline, parking: parking, seconds: time_left}
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