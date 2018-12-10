class Api::SearchController < ApplicationController
  def index
    if (params[:q])
      render json: {
        status: :success,
        data: Restaurant.where(
          'name LIKE :q OR address LIKE :q OR description LIKE :q',
          q: "%#{params[:q]}%"
        ).as_json(methods: [:rating_avg, :rating_count])
      }
    elsif (params[:name])
      render json: {
        status: :success,
        data: Restaurant.where(
          'name LIKE :name',
          name: "%#{params[:name]}%"
        ).as_json(methods: [:rating_avg, :rating_count])
      }
    elsif (params[:address])
      render json: {
        status: :success,
        data: Restaurant.where(
          'address LIKE :address',
          address: "%#{params[:address]}%"
        ).as_json(methods: [:rating_avg, :rating_count])
      }
    end
  end
end
