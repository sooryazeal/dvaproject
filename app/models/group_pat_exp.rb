class GroupPatExp < ApplicationRecord
	self.table_name = "GroupPrac_PatientExp"
	has_many :physician_compares, :primary_key => :G_PAC_ID, :foreign_key => :G_PAC_ID
	has_many :master_tables, :through => :physician_compares
end