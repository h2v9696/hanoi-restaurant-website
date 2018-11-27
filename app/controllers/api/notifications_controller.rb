class Api::NotificationsController < ApplicationController

  def index
    if (params[:user_id].present?)
      render json: {
        status: :success,
        data: Notification.where(user_id: params[:user_id])
      }
    else
      render json: {
        status: :error,
        data: "Params user_id not found"
      }
    end
  end

  def create
    @noti = Notification.new(notification_params)
    if @noti.save
      render json: {status: :success, data: @noti}
    else
      render json: {status: :error, errors: @noti.errors.full_messages}
    end
  end

  def update
    @noti = Notification.find(params[:id])
    if @noti.update_attributes(notification_params)
      render json: { status: :success, data: @noti }
    else
      render json: { status: :error, errors: @noti.errors.full_messages }
    end
  end

  def destroy
    if Notification.find(params[:id]).destroy
      render json: {status: :success}
    else
      render json: {status: :error}
    end
  end

  private
  def notification_params
    params.permit(:user_id, :type_id, :content, :is_read)
  end
end
