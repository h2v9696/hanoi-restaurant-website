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
    	self.image_url = "default_avar.png"
    end
    if self.cover_url.blank?
    	self.cover_url = "banner_default.png"
    end
  end

end
