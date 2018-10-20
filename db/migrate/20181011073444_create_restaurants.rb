class CreateRestaurants < ActiveRecord::Migration[5.2]
  def up
    create_table :restaurants do |t|
      t.string :name
      t.string :address
      t.string :phone
      t.text :description
      t.timestamps
    end
  end

  def down
  	drop_table :restaurant
  end
end
