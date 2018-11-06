class Restaurant < ApplicationRecord
  has_many :subscriptions, dependent: :destroy
end
