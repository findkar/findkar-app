class Api::V1::ParkingsController < ApplicationController
	def index
		parkings = Parking.where(user_id: session[:user_id])
		render json: parkings
	end

	def create
		parking = Parking.create({user_id: session[:user_id], time_up: params[:time_up], longitude: params[:longitude], latitude: params[:latitude]})
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

		def time_params
			params.permit(:time_up)
		end
		
end