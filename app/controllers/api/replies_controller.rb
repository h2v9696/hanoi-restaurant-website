class Api::RepliesController < ApplicationController

  def index
    if (params[:parent_id].present?)
      render json: {status: :success, data: Reply.where(parent_id: params[:parent_id])}
    else
      render json: {status: :error, errors: "Params parent_id empty"}
    end
  end

  def show
    @reply = Reply.find(params[:id])
    @user_info =  User.find_by(@reply.parent_id)
    render json: {status: :success, data: Reply.find(params[:id])}
  end

  def create
    @reply = Reply.new(reply_params)
    if @reply.save
      render json: {status: :success, data: @reply}
    else
      render json: {status: :error, errors: @reply.errors.full_messages}
    end
  end

  def update
    @reply = Reply.find(params[:id])
    if @reply.update_attributes(reply_params)
      render json: {status: :success, data: @reply}
    else
      render json: {status: :error, errors: @reply.errors.full_messages}
    end
  end

  def destroy
    if Reply.find(params[:id]).destroy
      render json: {status: :success}
    else
      render json: {status: :error}
    end
  end

  private
  def reply_params
    params.permit(:restaurant_id, :parent_id, :content)
  end
end
