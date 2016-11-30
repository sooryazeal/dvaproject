class CreatePrescriptionAndPaymentTable < ActiveRecord::Migration[5.0]
  def change
    create_table :prescription do |t|
  		t.integer :Total_Drug_Count, limit: 8
  		t.decimal :Total_Drug_Cost
  		t.integer :Bene_Count, limit: 8
  		t.integer :Total_Claim_Count, limit: 8
  		t.integer :Total_Day_Supply, limit: 8
    end

    create_table :payment do |t|
  		t.decimal :Total_Amount_of_Payment_USDollars
		t.string :Form_of_Payment_or_Transfer_of_Value
		t.string :Nature_of_Payment_or_Transfer_of_Value
    end
  end
end
