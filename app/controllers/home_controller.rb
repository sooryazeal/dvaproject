class HomeController < ApplicationController
  protect_from_forgery with: :exception

  def landing
  end

  def search
  	@doctors, @count = PhysicianCompare.search(params)
  	@payments = @doctors.map(&:payment_pie)
  	@drugs = @doctors.map(&:prescription_pie)
  end
end
