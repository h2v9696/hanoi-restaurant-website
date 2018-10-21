class Api::RatingsController < ApplicationController

  def index
    render json: {
      status: :success, 
      data: Rating.where(restaurant_id: params[:restaurant_id])
    }
  end

  def create
    @rating = Rating.new(rating_params)
    if @rating.save
      render json: {status: :success, data: @rating}
    else
      render json: {status: :error, errors: @rating.errors}
    end
  end

  def update
    @rating = Rating.find(params[:id])
    if @rating.update_attributes(rating_params)
      render json: {status: :success, data: @rating}
    else
      render json: {status: :error, errors: @rating.errors}
    end
  end

  def destroy
    if Rating.find(params[:id]).destroy
      render json: {status: :success}
    else
      render json: {status: :error}
    end
  end

  private
  def rating_params
    params.permit(:restaurant_id, :value)
  end
end
