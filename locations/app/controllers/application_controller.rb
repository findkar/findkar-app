class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception


    #checks to see if there is a session 
  def logged_in?
      if session[:user_id]
          true
      else
          false
      end
  end



end
