class ChangeIntegerLimitInYourTable < ActiveRecord::Migration[5.0]
  def up
  	# add_column :PhysicianCompare, :id, :primary_key
  	# add_column :GroupPrac_COC, :id, :primary_key
  	# add_column :IndEPPublicReporting_COC, :id, :primary_key
  	# add_column :GroupPrac_PatientExp, :id, :primary_key
   #  add_column :Prescription, :id, :primary_key
    # add_column :Payments, :id, :primary_key
    change_column :PhysicianCompare, :G_PAC_ID, :integer, limit: 8
    change_column :PhysicianCompare, :NPI, :integer, limit: 8
    change_column :PhysicianCompare, :PAC_ID, :integer, limit: 8
    change_column :PhysicianCompare, :PE_ID, :integer, limit: 8
    change_column :GroupPrac_COC, :G_PAC_ID, :integer, limit: 8
    change_column :GroupPrac_PatientExp, :G_PAC_ID, :integer, limit: 8
    change_column :IndEPPublicReporting_COC, :PAC_ID, :integer, limit: 8    
  end 

  def down
  	remove_column :PhysicianCompare, :id, :primary_key
  	remove_column :GroupPrac_COC, :id, :primary_key
  	remove_column :IndEPPublicReporting_COC, :id, :primary_key
  	remove_column :GroupPrac_PatientExp, :id, :primary_key
  	change_column :PhysicianCompare, :G_PAC_ID, :integer, limit: 4
    change_column :PhysicianCompare, :NPI, :integer, limit: 4
    change_column :PhysicianCompare, :PAC_ID, :integer, limit: 4
    change_column :PhysicianCompare, :PE_ID, :integer, limit: 4
    change_column :GroupPrac_COC, :G_PAC_ID, :integer, limit: 4
    change_column :GroupPrac_PatientExp, :G_PAC_ID, :integer, limit: 4
    change_column :IndEPPublicReporting_COC, :PAC_ID, :integer, limit: 4    
  end
end