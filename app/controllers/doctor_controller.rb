# require 'byebug'
class DoctorController < ActionController::Base
  protect_from_forgery with: :exception


  def show
  	# @doctor = PhysicianCompare.search_id(params[:id])
  	# @payments = Payment.get_payments(@doctor.FirstName, @doctor.LastName, @doctor.MiddleName)
  	# byebug
    @doc_prop = ["Dr John Doe", "Atlanta, GA", "15+ years experience", "Education : John Hopkins University"]
  	@scorex = 800
  	@payments_recieved = 10000
  	@drugs_prescribed = 5000
  	@rating = 4
  	@payments = [800,600, 500, 400, 350]
  	@prescriptions = [10000,7000,5000,3000,2000]
    @tags = ["cardio","emory"]
  end

end
