class Api::SessionsController < ApplicationController
  
  def create
    if !(user = User.find_by(email: params[:email].downcase))
      render json: {status: :error, errors: ["Email not found"]}
    else
      if user.authenticate(params[:password])
        new_token = ""
        if user.admin
          new_token = SecureRandom.hex
          AdminToken.create(token: new_token, user_id: user.id)
        end
        render json: {status: :success, data: user, token: new_token}
      else
        render json: {status: :error, errors: ["Wrong password"]}
      end
    end
  end

  def destroy
    AdminToken.delete_all
    render json: {status: :success}
  end
end