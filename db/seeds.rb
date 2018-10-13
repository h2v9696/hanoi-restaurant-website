if ActiveRecord::Base.connection.table_exists?(:users)
  User.delete_all
  ActiveRecord::Base.connection.execute('TRUNCATE TABLE users')
  20.times do
    User.create(
      username: Faker::Internet.unique.username(8),
      email: Faker::Internet.unique.free_email,
      password: '123456',
      image_url: Faker::Avatar.unique.image
    )
  end
end
  
if ActiveRecord::Base.connection.table_exists?(:admins)
  Admin.delete_all
  ActiveRecord::Base.connection.execute('TRUNCATE TABLE admins')
  Admin.create(
    username: 'admin',
    encrypted_password: BCrypt::Password.create('123456')
  )
end

if ActiveRecord::Base.connection.table_exists?(:restaurants)
  Restaurant.delete_all
  ActiveRecord::Base.connection.execute('TRUNCATE TABLE restaurants')
  10.times do
    Restaurant.create(
      name: Faker::Restaurant.unique.name,
      address: Faker::Address.unique.full_address,
      phone: Faker::PhoneNumber.unique.cell_phone,
      description: Faker::Restaurant.unique.description
    )
  end
end