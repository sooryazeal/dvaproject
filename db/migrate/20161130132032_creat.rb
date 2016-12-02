class Creat < ActiveRecord::Migration[5.0]
  def up
    rename_column :master_table, :group_prac_coc_id, :pat_rat
  end 

  def down
    rename_column :master_table, :group_prac_coc_id, :pat_rat
  end
end