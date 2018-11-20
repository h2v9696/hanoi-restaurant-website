class Api::UsersController < ApplicationController

  def index
    render json: {status: :success, data: User.select(:id, :username, :email, :image_url)}
  end

  def show
    render json: {status: :success, data: User.find(params[:id])}
  end

  def create
    user = User.new(user_params)
    if user.save
      render json: {status: :success, data: user}
    else
      render json: {status: :error, errors: user.errors.full_messages}
    end
  end
    
  def update
    user = User.find(params[:id])
    user.update_password = true if params[:password].present?
    if user.update_attributes(user_params)
      render json: {status: :success, data: user}
    else
      render json: {status: :error, errors: user.errors.full_messages}
    end
  end

  def destroy
    if User.find(params[:id]).destroy
      render json: {status: :success}
    else
      render json: {status: :error}
    end
  end

  private

  def user_params
    params.permit(:username, :email, :image_url, :cover_url, :address, :password, :password_confirmation)
  end

end
