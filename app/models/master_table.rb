class MasterTable < ApplicationRecord
	self.table_name = "master_table"
	belongs_to :physician_compare
end