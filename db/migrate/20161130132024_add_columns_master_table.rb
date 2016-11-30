class AddColumnsMasterTable < ActiveRecord::Migration[5.0]
  def change
      add_column :master_table, :Total_Drug_Count, :integer , limit: 8
      add_column :master_table, :Total_Drug_Cost, :decimal , limit: 8
      add_column :master_table, :Bene_Count, :decimal , limit: 8
      add_column :master_table, :Total_Claim_Count, :decimal , limit: 8
      add_column :master_table, :Total_Day_Supply, :decimal , limit: 8
  end
end