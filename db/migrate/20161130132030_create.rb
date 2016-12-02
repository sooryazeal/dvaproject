class Create < ActiveRecord::Migration[5.0]
  def up
    change_column :master_table, :group_prac_coc_id, :integer, limit: 8 
  end 

  def down
    change_column :master_table, :group_prac_coc_id, :integer, limit: 4    
  end
end