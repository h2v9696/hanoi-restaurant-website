class CreateRestaurants < ActiveRecord::Migration[5.2]
  def self.up
    create_table :restaurants do |t|
      t.string :name
      t.string :address
      t.string :phone
      t.text :description
      t.timestamps
    end
  end

  def self.down
  	drop_table :restaurant
  end
end
