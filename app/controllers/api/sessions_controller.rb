class Api::SessionsController < ApplicationController
  def create
    if !(user = User.find_by(email: params[:email].downcase))
      render json: {status: :error, errors: ["Email not found"]}
    else
      if user.authenticate(params[:password])
        auth_token = user.generate_auth_token
        render json: {status: :success, data: user}
      else
        render json: {status: :error, errors: ["Wrong password"]}
      end
    end
  end

  def destroy
    session[:auth_token] = nil
    # current_user.invalidate_auth_token
    render json: {status: :success}
  end
end
