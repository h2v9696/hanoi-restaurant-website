class Api::CommentsController < ApplicationController

  def index
    # restaurant_id + user_id
    if (params[:restaurant_id].present? && params[:user_id].present?)
      render json: {status: :success,  data: Comment.where({
        restaurant_id: params[:restaurant_id],
        user_id: params[:user_id]
      })}

    # restaurant_id only
    elsif (params[:restaurant_id].present?)
      @data = Comment.where(restaurant_id: params[:restaurant_id]).as_json
      @data.each do |cmt|
        cmt[:user] = User.where(id: cmt["user_id"]).select("username, image_url").first.as_json
        cmt[:no_of_like] = Like.where({object_type: Comment::OBJECT_TYPE, object_id: cmt["id"]}).count
        cmt[:no_of_reply] = Comment.where(parent_id: cmt["id"]).count
      end
      render json: {
        status: :success,
        data: @data
      }

    # user_id only
    elsif (params[:user_id].present?)
      render json: {status: :success, data: Comment.where(user_id: params[:user_id])}

    # no params
    else
      render json: {status: :error, errors: "Params restaurant_id and/or user_id empty"}
    end
  end

  def show
    @data = Comment.find(params[:id]).as_json
    @data[:user] = User.where(id: @data["user_id"]).select("username, image_url").first.as_json
    @data[:reply] = Comment.where(parent_id: @data["id"]).as_json
    @data[:reply].each do |d|
      d[:user] = User.where(id: d["user_id"]).select("username, image_url").first.as_json
    end
    render json: {
      status: :success, 
      data: @data
    }
  end

  def create
    @comment = Comment.new(comment_params)
    if @comment.save
      render json: {status: :success, data: @comment}
    else
      render json: {status: :error, errors: @comment.errors.full_messages}
    end
  end

  def update
    @comment = Comment.find(params[:id])
    if @comment.update_attributes(comment_params)
      render json: {status: :success, data: @comment}
    else
      render json: {status: :error, errors: @comment.errors.full_messages}
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
