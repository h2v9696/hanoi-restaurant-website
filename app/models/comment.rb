class Comment < ApplicationRecord
  OBJECT_TYPE = 2

  def user
    User.select("id, username, image_url").find(self.user_id)
  end

  def no_of_like
    Like.where({object_type: Comment::OBJECT_TYPE, object_id: self.id}).count
  end

  def no_of_reply
    Comment.where(parent_id: self.id).count
  end

  def reply
    Comment.where(parent_id: self.id).as_json(methods: [:user, :no_of_like, :no_of_reply])
  end
end
