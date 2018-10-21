class CreateDishes < ActiveRecord::Migration[5.2]
  def up
    create_table :dishes do |t|
      t.integer :restaurant_id
      t.string :name
      t.integer :price
      t.string :image_url
      t.timestamps
    end
  end

  def down
    drop_table :dishes
  end
end
