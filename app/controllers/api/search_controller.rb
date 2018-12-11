class Api::SearchController < ApplicationController
  def index
    if params[:type] == "0" || !params[:type].present?
      render json: {
        status: :success,
        data: Restaurant.where(
          'name LIKE :q OR address LIKE :q OR description LIKE :q',
          q: "%#{params[:q]}%"
        ).as_json(methods: [:rating_avg, :rating_count])
      }
    elsif params[:type] == "1"
      render json: {
        status: :success,
        data: Restaurant.where(
          'name LIKE :q',
          q: "%#{params[:q]}%"
        ).as_json(methods: [:rating_avg, :rating_count])
      }
    elsif params[:type] == "2"
      render json: {
        status: :success,
        data: Restaurant.where(
          'address LIKE :q',
          q: "%#{params[:q]}%"
        ).as_json(methods: [:rating_avg, :rating_count])
      }
    elsif params[:type] == "3"
      render json: {
        status: :success,
        data: Restaurant.where(
          'description LIKE :q',
          q: "%#{params[:q]}%"
        ).as_json(methods: [:rating_avg, :rating_count])
      }
    else
      render json: {
        status: :success,
        data: []
      }
    end
  end
end
