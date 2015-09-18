class WelcomeController < ApplicationController
    
    def index
        if logged_in?
            @user = User.find(session[:user_id])
            @parkings = @user.parkings
        else
            redirect_to '/login'
        end
    end



end