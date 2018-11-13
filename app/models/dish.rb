class Dish < ApplicationRecord
  belongs_to :restaurant, inverse_of: :dishes
end
