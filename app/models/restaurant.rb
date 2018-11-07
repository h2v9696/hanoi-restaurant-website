class Restaurant < ApplicationRecord
  has_many :subscriptions, dependent: :destroy
  has_many :ratings, dependent: :destroy
end
