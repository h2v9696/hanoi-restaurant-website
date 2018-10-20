# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
     :recoverable, :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User

  before_save :add_missing_fields

  private

  def add_missing_fields
  	if self.image_url.blank?
    	self.image_url = Faker::Avatar.unique.image
    end
    if self.cover_url.blank?
    	self.cover_url = "https://placeholdit.imgix.net/~text?txtsize=80&txt=800x300&w=800&h=300"
    end
  end

end
