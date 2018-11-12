class Api::SearchController < ApplicationController
  def index
    render json: {
      status: :success,
      data: Restaurant.where(
        'name LIKE :q OR address LIKE :q OR description LIKE :q',
        q: "%#{params[:q]}%"
      ).as_json(methods: [:rating_avg, :rating_count])
    }
  end
end
