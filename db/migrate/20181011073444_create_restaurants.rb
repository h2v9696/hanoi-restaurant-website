class CreateRestaurants < ActiveRecord::Migration[5.2]
  def change
    create_table :restaurants do |t|
      t.string :name
      t.string :address
      t.string :phone
      t.string :cover_url
      t.text :description
      t.timestamps
    end
  end
end
