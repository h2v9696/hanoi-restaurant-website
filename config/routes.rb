Rails.application.routes.draw do
  namespace :api, default: { format: :json } do
    mount_devise_token_auth_for 'User', at: 'users'
    resources :users, only: [:index, :show]
    resources :restaurants, only: [:index, :show, :create, :update, :destroy]
    resources :ratings, only: [:index, :create, :update, :destroy]
    resources :dishes, only: [:index, :show, :create, :update, :destroy]
    resources :comments, only: [:index, :show, :create, :update, :destroy]
    resources :subscriptions, only: [:index, :create, :destroy]
    resources :likes, only: [:index, :create, :destroy]
  end
end
