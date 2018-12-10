class ApplicationController < ActionController::API
  include ActionView::Layouts
  include ActionController::ImplicitRender
  include ActionController::Helpers
  include ActionController::Flash
  include ActionController::MimeResponds
  include ActionController::HttpAuthentication::Token::ControllerMethods
  include ActionView::Helpers::TranslationHelper
  include ActionController::RequestForgeryProtection

  helper_method :user_signed_in?, :current_user

  def redirect_to_web
    redirect_to 'http://localhost:3001'
  end

  def require_login!
    session[:auth_token] = params[:auth_token]
    if authenticate_token
      redirect_to '/admin'
    else
      redirect_to main_app.root_path
    end
  end

  def user_signed_in?
    current_user.present?
  end

  def current_user
    return authenticate_token
  end

  private
    def authenticate_token
      return nil if (!session[:auth_token])
      User.find_by(auth_token: session[:auth_token])
    end
end
