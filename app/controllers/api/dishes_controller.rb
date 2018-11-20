class Api::DishesController < ApplicationController

  def index
    if params[:restaurant_id].present?
      render json: {status: :success,  data: Dish.where(restaurant_id: params[:restaurant_id])}
    else
      render json: {status: :error, errors: "Params restaurant_id not found"}
    end
  end

  def show
    render json: {status: :success, data: Dish.find(params[:id])}
  end

  def create
    @dish = Dish.new(dish_params)
    if @dish.save
      render json: {status: :success, data: @dish}
    else
      render json: {status: :error, errors: @dish.errors.full_messages}
    end
  end

  def update
    @dish = Dish.find(params[:id])
    if @dish.update_attributes(dish_params)
      render json: {status: :success, data: @dish}
    else
      render json: {status: :error, errors: @dish.errors.full_messages}
    end
  end

  def destroy
    if Dish.find(params[:id]).destroy
      render json: {status: :success}
    else
      render json: {status: :error}
    end
  end

  private
  def dish_params
    params.permit(:restaurant_id, :name, :price, :image_url)
  end
end
