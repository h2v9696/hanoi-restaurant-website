class Api::SubscriptionsController < ApplicationController
  
  def index
    if (params[:restaurant_id].present? && params[:user_id].present?)
      render json: {
        status: :success,
        data: Subscription.where({
          restaurant_id: params[:restaurant_id],
          user_id: params[:user_id]
        })
      }
    elsif (params[:restaurant_id].present?)
      render json: {status: :success, data: Subscription.where(restaurant_id: params[:restaurant_id])}
    elsif (params[:user_id].present?)
      render json: {status: :success, data: Subscription.where(user_id: params[:user_id])}
    else
      render json: {status: :error, data: "Params user_id and/or restaurant_id not found"}
    end
  end
  
  def create
    @subscription = Subscription.new(subscription_params)
    if @subscription.save
      render json: {status: :success, data: @subscription}
    else
      render json: {status: :error, errors: @subscription.errors}
    end
  end
  
  def destroy
    if Subscription.find(params[:id]).destroy
      render json: {status: :success}
    else
      render json: {status: :error}
    end
  end
  
  private
  def subscription_params
    params.permit(:restaurant_id, :user_id)    
  end
end
