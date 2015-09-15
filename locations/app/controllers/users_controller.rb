class UsersController < ApplicationController

	def new

	end

	def create 
		user = User.create({email: params[:email], password: params[:password], phone: params[:phone]})
		session[:user_id] = user.id
		redirect_to '/'
	end

end