class Dish < ApplicationRecord
  mount_uploader :image_url, DishUploaderUploader
end
