class Api::UsersController < ApplicationController

  def index
    render json: {status: :success, data: User.select(:id, :username, :email, :image_url)}
  end

  def show
    render json: {status: :success, data: User.find(params[:id])}
  end
end
