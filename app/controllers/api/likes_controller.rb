class Api::LikesController < ApplicationController
  
  def create
    @like = Like.new(like_params)
    if @like.save
      render json: {status: :success, data: @like}
    else
      render json: {status: :error, errors: @like.errors.full_messages}
    end
  end
  
  def destroy
    if Like.find(params[:id]).destroy
      render json: {status: :success}
    else
      render json: {status: :error}
    end
  end
  
  private
  def like_params
    params.permit(:object_id, :object_type, :user_id)    
  end
end
