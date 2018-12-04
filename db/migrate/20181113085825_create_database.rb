class CreateDatabase < ActiveRecord::Migration[5.2]
  def change
    # User
    create_table :users do |t|
      t.string :username
      t.string :email
      t.string :image_url
      t.string :cover_url
      t.string :address
      t.string :password_digest
      t.timestamps
    end
    add_index :users, :email, unique: true
    add_index :users, :username, unique: true

    # Restaurant
    create_table :restaurants do |t|
      t.string :name
      t.string :address
      t.string :phone
      t.string :cover_url
      t.text :description
      t.timestamps
    end

    # Rating
    create_table :ratings do |t|
      t.integer :user_id
      t.integer :restaurant_id
      t.integer :value
      t.timestamps
    end
    add_index :ratings, [:user_id, :restaurant_id], unique: true

    # Dish
    create_table :dishes do |t|
      t.integer :restaurant_id
      t.string :name
      t.integer :price
      t.string :image_url
      t.timestamps
    end
    add_index :dishes, [:restaurant_id, :name], unique: true

    # Comment
    create_table :comments do |t|
      t.integer :user_id
      t.integer :restaurant_id
      t.integer :parent_id
      t.text :content
      t.timestamps
    end

    # Subscription
    create_table :subscriptions do |t|
      t.integer :user_id
      t.integer :restaurant_id
      t.timestamps
    end
    add_index :subscriptions, [:user_id, :restaurant_id], unique: true

    # Like
    create_table :likes do |t|
      t.integer :user_id
      t.integer :object_type
      t.integer :object_id
      t.timestamps
    end
    add_index :likes, [:user_id, :object_type, :object_id], unique: true

    # Notification
    create_table :notifications do |t|
      t.integer :user_id
      t.integer :type_id
      t.text :content
      t.timestamps
    end

    # Admin token
    create_table :admin_tokens do |t|
      t.string :token
      t.integer :user_id
      t.timestamps
    end
    
  end
end
