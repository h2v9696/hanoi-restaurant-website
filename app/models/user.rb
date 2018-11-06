class User < ApplicationRecord
  attr_accessor :update_password
  has_many :comments, dependent: :destroy

  has_secure_password
  before_save :before_save_action

  validates :username,
    presence: true,
    length: {maximum: 50},
    uniqueness: true

  validates :email,
    presence: true,
    length: { maximum: 255},
    format: { with: URI::MailTo::EMAIL_REGEXP},
    uniqueness: { case_sensitive: false }

  validates :password,
    length: { minimum: 6},
    if: :should_validate_password?

  validates :password_confirmation,
    presence: true,
    if: :should_validate_password?

  private

  def before_save_action
    self.email = email.downcase
    self.image_url = image_url.presence || "default_avar.png"
    self.cover_url = cover_url || "banner_default.png"
    self.address ||= ""
  end

  def should_validate_password?
    update_password || new_record?
  end
end
