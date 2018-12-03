class Restaurant < ApplicationRecord
  has_many :dishes
  before_save :update_notification, only: :update
  mount_uploader :cover_url, ImageUploader

  OBJECT_TYPE = 1

  def rating_avg
    (Rating.where(restaurant_id: self.id).average(:value).to_f * 2.0).round / 2.0
  end

  def rating_count
    Rating.where(restaurant_id: self.id).count
  end

  def update_notification
    Subscription.select(:user_id).where(restaurant_id: self.id).as_json.each do |sub|
      Notification.create(
        user_id: sub["user_id"],
        type_id: Notification::TYPE_NEW_DISH,
        content: "Restaurant #{self.name} has updated their infomation",
        is_read: false
      )
    end
  end

  def change_img
  end
end
