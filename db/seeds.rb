User.delete_all
Admin.delete_all
Restaurant.delete_all

20.times do
  User.create(
    username: Faker::Internet.username(8),
    email: Faker::Internet.free_email,
    password_digest: BCrypt::Password.create('123456'),
    image_url: Faker::Avatar.image
  )
end

Admin.create(
  username: 'admin',
  password_digest: BCrypt::Password.create('123456')
)

10.times do
  Restaurant.create(
    name: Faker::Restaurant.name,
    address: Faker::Address.full_address,
    phone: Faker::PhoneNumber.cell_phone,
    description: Faker::Restaurant.description
  )
end