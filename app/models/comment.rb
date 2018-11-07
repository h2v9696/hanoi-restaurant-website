class Comment < ApplicationRecord
  belongs_to :user
  LIKE_TYPE = 1
end
