class ApplicationController < ActionController::API
  def redirect_to_web
    redirect_to 'http://localhost:3001'
  end
end
