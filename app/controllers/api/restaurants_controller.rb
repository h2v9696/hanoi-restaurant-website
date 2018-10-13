class Api::RestaurantsController < ApplicationController

  def create
    @restaurant = Restaurant.new(restaurant_params)
    if @restaurant.save
      render json: {status: :success, data: @restaurant}
    else
      render json: {status: :error, errors: @restaurant.errors}
    end
  end

  def index
    render json: {status: :success, data: Restaurant.all}
  end

  def show
    render json: {status: :success, data: Restaurant.find(params[:id])}
  end

  def update
    @restaurant = Restaurant.find(params[:id])
    if restaurant.update(user_params)
      render json: {status: :success, location: [:api, restaurant], data: @restaurant}
    else
      render json: {status: :error, errors: @restaurant.errors}
    end
  end

  def destroy
    @restaurant = Restaurant.find(params[:id])
    @restaurant.destroy
    head 204
  end

  private
  def restaurant_params
    params.permit(:name, :address, :phone, :description)
  end

end
