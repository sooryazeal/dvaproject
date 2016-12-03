class PhysicianCompare < ApplicationRecord
	self.table_name = "PhysicianCompare"
	belongs_to :group_pat_exp, :foreign_key => :G_PAC_ID, :primary_key => :G_PAC_ID
	has_one :master_table

	def self.search_string
		'FirstName LIKE ? or MiddleName LIKE ? or LastName LIKE ? or PrimarySpec LIKE ? or SecSpec1 LIKE ? or SecSpec2 LIKE ? or SecSpec3 LIKE ? or AllSecSpecs LIKE ? '
	end

	def self.search(params)
	  term = params[:search]
	  loc = params[:location]
	  result = where(nil)
	  if term.present?
	    result = result.where(search_string, "%#{term}%", "%#{term}%", "%#{term}%", "%#{term}%", "%#{term}%", "%#{term}%", "%#{term}%", "%#{term}%")
	  else
	    result = result.where(nil)
	  end
	  if loc.present?
	  	result = result.where('City LIKE ? or State LIKE ?', loc, loc)
	  end
	  result = result.paginate(:page => params[:page] || 1, :per_page => 30) 
	  [result, result.total_entries]
	end

	def payment_pie
		total_payment = payments.map{|x| [x.Total_Amount_of_Payment_USDollars, x.Submitting_Applicable_Manufacturer_or_Applicable_GPO_Name]}
		sum = total_payment.map(&:first).sum
		if total_payment.present?
			max_payment = total_payment.map(&:first).max
			max_payer = total_payment.find{|x| x.first == max_payment}.last
			return [max_payer, max_payment*100/sum]
		end
	end

	def payments
		Payment.where(:Physician_First_Name => self.FirstName, :Physician_Last_Name => self.LastName)
	end

	def prescription_pie
		total_pres = {}
		prescriptions.map do |x| 
			total_pres[x.Drug_Name] ||= 0
			total_pres[x.Drug_Name] += 1
		end
		sum = total_pres.sum{|k,v| v}
		if total_pres.present?
			max_pres = total_pres.values.max
			max_drug = total_pres.find{|k,v| v == max_pres}.first
			return [max_pres*100/sum, max_drug]
		end
	end

	def prescriptions
		Prescription.where(:NPI => self.NPI)
	end

	def specializations
		[self.PrimarySpec, self.SecSpec1, self.SecSpec2, self.SecSpec3, self.SecSpec4, self.AllSecSpecs].compact
	end

	def hospitals
		[self.HosAffCCN1, self.HospAffLBN1, self.HosAffCCN2, self.HosAffLBN2, self.HosAffCCN3, self.HosAffLBN3, self.HosAffCCN4, self.HosAffLBN4, self.HosAffCCN5, self.HosAffLBN5].reject(&:blank?)
	end
end