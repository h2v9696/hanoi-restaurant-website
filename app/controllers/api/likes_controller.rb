class Api::LikesController < ApplicationController
  
  def index
    if (params[:user_id].present? && params[:object_id].present? && params[:object_type].present?)
      render json: {
        status: :success,  
        data: Like.where({
          object_id: params[:object_id],
          object_type: params[:object_type],
          user_id: params[:user_id]
        })
      }
    elsif (params[:object_id].present? && params[:object_type].present?)
      render json: {
        status: :success, 
        data: Like.where({
          object_id: params[:object_id],
          object_type: params[:object_type]
        })
      }
    elsif (params[:user_id].present?)
      render json: {status: :success, data: Like.where(user_id: params[:user_id])}
    else
      render json: {status: :error, data: "Params user_id and/or object_id + object_type not found"}
    end
  end
  
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
