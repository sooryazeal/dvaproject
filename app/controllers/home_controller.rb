class HomeController < ApplicationController
  protect_from_forgery with: :exception

  def landing
  end

  def search
  	@doctors, @count = PhysicianCompare.search(params)
  end
end
