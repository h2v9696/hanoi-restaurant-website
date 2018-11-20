class Subscription < ApplicationRecord

  def restaurant
    Restaurant.select(:id, :name, :cover_url).find(self.restaurant_id)
  end
end
