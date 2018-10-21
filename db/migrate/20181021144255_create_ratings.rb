class CreateRatings < ActiveRecord::Migration[5.2]
  def up
    create_table :ratings do |t|
      t.integer :restaurant_id
      t.integer :value
      t.timestamps
    end
  end

  def down
    drop_table :ratings
  end
end
