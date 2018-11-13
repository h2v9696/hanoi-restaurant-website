class Restaurant < ApplicationRecord
  has_many :dishes, inverse_of: :restaurant
  OBJECT_TYPE = 1

  def rating_avg
    (Rating.where(restaurant_id: self.id).average(:value).to_f * 2.0).round / 2.0
  end

  def rating_count
    Rating.where(restaurant_id: self.id).count
  end
end
