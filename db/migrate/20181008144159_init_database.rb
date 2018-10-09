class InitDatabase < ActiveRecord::Migration[5.2]
  def self.up
    create_table :users do |t|
      t.string :username
      t.string :email
      t.string :password_digest
      t.string :image_url
    end

    create_table :admins do |t|
      t.string :username
      t.string :password_digest
    end

    create_table :restaurants do |t|
      t.string :name
      t.string :address
      t.string :phone
      t.text :description
    end
  end

  def self.down
    drop_table :users
    drop_table :admins
    drop_table :restaurants
  end
end
