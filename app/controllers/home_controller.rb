class HomeController < ActionController::Base
  protect_from_forgery with: :exception

  def landing
  end

  def search
  	@doctors = PhysicianCompare.search(params[:search])
  end
end
