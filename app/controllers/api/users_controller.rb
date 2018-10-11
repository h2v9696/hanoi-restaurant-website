class Api::UsersController < ApplicationController

  def index
    render json: {status: :success, data: User.select(:id, :username, :email, :image_url)}
  end

  def show
    render json: {status: :success, data: User.find(params[:id])}
  end

  def update
    @user = User.find(params[:id])
    if user.update(user_params)
      render json: {status: :success, location: [:api, user], data: @user}
    else
      render json: {status: :error, errors: @user.errors}
    end
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
    head 204
  end

  private
  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end

end
