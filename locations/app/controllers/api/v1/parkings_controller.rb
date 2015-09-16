class Api::V1::ParkingsController < ApplicationController
	def index

		parkings = Parking.where(user_id: session[:user_id])
		render json: parkings
	end

	def create
		parking = Parking.create(parking_params)
		render json: parking
	end

	def update
		parking = Parking.find(params[:id])
		parking.update(time_params)
		render json: parking
	end

	def show
		parking = Parking.find(params[:id])
		render json: parking
	end

	def destroy
		Parking.find(params[:id]).destroy
		render json: 'deleted'
	end



	private

		def parking_params

			# API CALL HERE

			params.permit(:user_id, :longitude, :latitude, :time_up)
		end

		def time_params
			params.permit(:time_up)
		end
		
end