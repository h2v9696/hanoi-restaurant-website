class Api::CommentsController < ApplicationController
  
  def index
    if (params[:restaurant_id].present? && params[:user_id].present?)
      render json: {status: :success,  data: Comment.where({
        restaurant_id: params[:restaurant_id],
        user_id: params[:user_id]
      })}
    elsif (params[:restaurant_id].present?)
      render json: {status: :success, data: Comment.where(restaurant_id: params[:restaurant_id])}
    elsif (params[:user_id].present?)
      render json: {status: :success, data: Comment.where(user_id: params[:user_id])}
    else
      render json: {status: :error, errors: "Params restaurant_id and/or user_id empty"}
    end
  end
  
  def show
    render json: {status: :success, data: Comment.find(params[:id])}
  end
  
  def create
    @comment = Comment.new(comment_params)
    if @comment.save
      render json: {status: :success, data: @comment}
    else
      render json: {status: :error, errors: @comment.errors}
    end
  end
  
  def update
    @comment = Comment.find(params[:id])
    if @comment.update_attributes(comment_params)
      render json: {status: :success, data: @comment}
    else
      render json: {status: :error, errors: @comment.errors}
    end
  end
  
  def destroy
    if Comment.find(params[:id]).destroy
      render json: {status: :success}
    else
      render json: {status: :error}
    end
  end
  
  private
  def comment_params
    params.permit(:restaurant_id, :user_id, :content)
    
  end
end
