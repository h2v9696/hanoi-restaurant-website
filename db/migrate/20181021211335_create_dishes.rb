class CreateDishes < ActiveRecord::Migration[5.2]
  def change
    create_table :dishes do |t|
      t.integer :restaurant_id
      t.string :name
      t.integer :price
      t.string :image_url
      t.timestamps
    end

    add_index :dishes, [:restaurant_id, :name], unique: true
  end
end
