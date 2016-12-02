class PhysicianCompare < ApplicationRecord
	self.table_name = "PhysicianCompare"
	belongs_to :group_pat_exp, :foreign_key => :G_PAC_ID, :primary_key => :G_PAC_ID
	has_one :master_table

	def self.search_string
		'FirstName LIKE ? or MiddleName LIKE ? or LastName LIKE ? or PrimarySpec LIKE ? or SecSpec1 LIKE ? or SecSpec2 LIKE ? or SecSpec3 LIKE ? or AllSecSpecs LIKE ? '
	end

	def self.search(term)
		byebug
	  if term
	    where(search_string, "%#{term}%", "%#{term}%", "%#{term}%", "%#{term}%", "%#{term}%", "%#{term}%", "%#{term}%", "%#{term}%").limit(10)
	  else
	    where(nil).limit(10)
	  end
	end
end