puts "\nGenerating fake data\n"

@count = 0
if ActiveRecord::Base.connection.table_exists? :users
  ActiveRecord::Base.connection.execute 'TRUNCATE TABLE users'
  50.times do
    User.create(
      username: Faker::Internet.unique.username(8),
      email: Faker::Internet.unique.free_email,
      password: '123456',
      password_confirmation: '123456',
      image_url: Faker::Avatar.unique.image
    )
    @count += 1
  end
end
puts "#{@count} Users created"

@count = 0
if ActiveRecord::Base.connection.table_exists? :admins
  ActiveRecord::Base.connection.execute 'TRUNCATE TABLE admins'
  Admin.create(
    username: 'admin',
    encrypted_password: BCrypt::Password.create('123456')
  )
  @count += 1
end
puts "#{@count} Admins created"

@count = 0
if ActiveRecord::Base.connection.table_exists? :restaurants
  ActiveRecord::Base.connection.execute 'TRUNCATE TABLE restaurants'
  20.times do
    Restaurant.create(
      name: Faker::Restaurant.unique.name,
      address: Faker::Address.unique.full_address,
      phone: Faker::PhoneNumber.unique.cell_phone,
      description: Faker::Restaurant.description
    )
    @count += 1
  end
end
puts "#{@count} Restaurants created"

@count = 0
if ActiveRecord::Base.connection.table_exists? :dishes
  ActiveRecord::Base.connection.execute 'TRUNCATE TABLE dishes'
  Restaurant.all.each do |restaurant|
    rand(5..10).times do
      Dish.create(
        restaurant_id: restaurant.id,
        name: Faker::Food.unique.dish,
        price: rand(20..100) * 1000,
        image_url: 'https://source.unsplash.com/user/foodess'
      )
      @count += 1
    end
    Faker::Food.unique.clear
  end
end
puts "#{@count} Dishes created"

@count = 0
if ActiveRecord::Base.connection.table_exists? :ratings
  ActiveRecord::Base.connection.execute 'TRUNCATE TABLE ratings'
  @indices = []
  500.times do |i|
    @restaurant_id = Restaurant.pluck(:id).sample
    @user_id = User.pluck(:id).sample
    @indices.push [@restaurant_id, @user_id]
  end
  @indices.uniq.each do |i, j|
    Rating.create(
      restaurant_id: i,
      user_id: j,
      value: rand(1..5)
    )
    @count += 1
  end
end
puts "#{@count} Ratings created"

@count = 0
if ActiveRecord::Base.connection.table_exists? :comments
  ActiveRecord::Base.connection.execute 'TRUNCATE TABLE comments'
  100.times do
    Comment.create(
      restaurant_id: Restaurant.pluck(:id).sample,
      user_id: User.pluck(:id).sample,
      parent_id: 0,
      content: Faker::Restaurant.review
    )
    @count += 1
  end

  100.times do
    Comment.create(
      restaurant_id: 0,
      user_id: User.pluck(:id).sample,
      parent_id: Comment.pluck(:id).sample,
      content: Faker::Dota.quote
    )
    @count += 1
  end
end
puts "#{@count} Comments created"

@count = 0
if ActiveRecord::Base.connection.table_exists? :subscriptions
  ActiveRecord::Base.connection.execute 'TRUNCATE TABLE subscriptions'
  @indices = []
  200.times do |i|
    @restaurant_id = Restaurant.pluck(:id).sample
    @user_id = User.pluck(:id).sample
    @indices.push [@restaurant_id, @user_id]
  end
  @indices.uniq.each do |i, j|
    Subscription.create(
      restaurant_id: i,
      user_id: j
    )
    @count += 1
  end
end
puts "#{@count} subscriptions created"

@count = 0
if ActiveRecord::Base.connection.table_exists? :likes
  ActiveRecord::Base.connection.execute 'TRUNCATE TABLE likes'
  @indices = []
  500.times do |i|
    @comment_id = Comment.pluck(:id).sample
    @user_id = User.pluck(:id).sample
    @indices.push [@comment_id, @user_id]
  end
  @indices.uniq.each do |i, j|
    Like.create(
      object_id: i,
      user_id: j,
      object_type: Comment::OBJECT_TYPE
    )
    @count += 1
  end
end
puts "#{@count} Likes created"
