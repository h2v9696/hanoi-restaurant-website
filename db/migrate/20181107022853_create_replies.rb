class CreateReplies < ActiveRecord::Migration[5.2]
  def change
    create_table :replies do |t|
      t.integer :parent_id
      t.timestamps
    end

    add_index :replies, :parent_id, unique: true
  end
end
