class AddIndexes < ActiveRecord::Migration[5.0]
  def change
      add_index :Prescription, :NPI
      add_index :Payments, :Physician_First_Name
      add_index :Payments, :Physician_Last_Name
      add_index :IndEPPublicReporting_COC, :FirstName
      add_index :IndEPPublicReporting_COC, :LastName
      add_index :GroupPrac_COC, :G_PAC_ID

      change_column_default :master_table, :Total_Day_Supply, 0
      change_column_default :master_table, :Total_Claim_Count, 0
      change_column_default :master_table, :Bene_Count, 0
      change_column_default :master_table, :Total_Drug_Cost, 0

      add_column :master_table, :Total_Amount_of_Payment_USDollars, :decimal
      add_column :master_table, :Form_of_Payment_or_Transfer_of_Value, :string
      add_column :master_table, :Nature_of_Payment_or_Transfer_of_Value, :string

      change_column_default :master_table, :Total_Amount_of_Payment_USDollars, 0
      change_column_default :master_table, :Form_of_Payment_or_Transfer_of_Value, ""
      change_column_default :master_table, :Nature_of_Payment_or_Transfer_of_Value, ""

  end
end