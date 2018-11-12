# frozen_string_literal: true

class Api::CommentsController < ApplicationController
  def index
    # restaurant_id + user_id
    if params[:restaurant_id].present? && params[:user_id].present?
      render json: {
        status: :success,
        data: Comment.where(
          restaurant_id: params[:restaurant_id],
          user_id: params[:user_id]
        )
      }

    # restaurant_id only
    elsif params[:restaurant_id].present?
      render json: {
        status: :success,
        data: Comment.where(restaurant_id: params[:restaurant_id])
                     .as_json(methods: [:user, :no_of_like, :no_of_reply])
      }

    # user_id only
    elsif params[:user_id].present?
      render json: { status: :success, data: Comment.where(user_id: params[:user_id]) }

    # no params
    else
      render json: { status: :error, errors: 'Params restaurant_id and/or user_id empty' }
    end
  end

  def show
    render json: {
      status: :success,
      data: Comment.find(params[:id]).as_json(methods: [:user, :reply])
    }
  end

  def create
    @comment = Comment.new(comment_params)
    if @comment.save
      render json: { status: :success, data: @comment }
    else
      render json: { status: :error, errors: @comment.errors.full_messages }
    end
  end

  def update
    @comment = Comment.find(params[:id])
    if @comment.update_attributes(comment_params)
      render json: { status: :success, data: @comment }
    else
      render json: { status: :error, errors: @comment.errors.full_messages }
    end
  end

  def destroy
    if Comment.find(params[:id]).destroy
      render json: { status: :success }
    else
      render json: { status: :error }
    end
  end

  private

  def comment_params
    params.permit(:restaurant_id, :user_id, :content, :parent_id)
  end
end
