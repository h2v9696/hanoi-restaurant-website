class Restaurant < ApplicationRecord
  OBJECT_TYPE = 1
  has_many :subscriptions, dependent: :destroy
  has_many :ratings, dependent: :destroy
end
