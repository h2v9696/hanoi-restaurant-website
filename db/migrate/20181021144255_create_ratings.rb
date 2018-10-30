class CreateRatings < ActiveRecord::Migration[5.2]
  def change
    create_table :ratings do |t|
      t.integer :user_id
      t.integer :restaurant_id
      t.integer :value
      t.timestamps
    end

    add_index :ratings, [:user_id, :restaurant_id], unique: true
  end
end
