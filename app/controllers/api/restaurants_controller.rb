class Api::RestaurantsController < ApplicationController

  def index
    render json: {status: :success, data: Restaurant.all}
  end

  def show
    render json: {status: :success, data: Restaurant.find(params[:id])}
  end

  def create
    @restaurant = Restaurant.new(restaurant_params)
    if @restaurant.save
      render json: {status: :success, data: @restaurant}
    else
      render json: {status: :error, errors: @restaurant.errors}
    end
  end

  def update
    @restaurant = Restaurant.find(params[:id])
    if @restaurant.update_attributes(restaurant_params)
      render json: {status: :success, data: @restaurant}
    else
      render json: {status: :error, errors: @restaurant.errors}
    end
  end

  def destroy
    if Restaurant.find(params[:id]).destroy
      render json: {status: :success}
    else
      render json: {status: :error}
    end
  end

  private
  def restaurant_params
    params.permit(:name, :address, :phone, :description, :cover_url)
  end

end
