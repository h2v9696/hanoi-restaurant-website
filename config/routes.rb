Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  root 'infos#home'
  namespace :api, default: { format: :json } do
    scope '/users' do
      post '/sign_in', to: 'sessions#create'
      delete '/sign_out', to: 'sessions#destroy'
    end
    resources :users, only: [:index, :show, :create, :update, :destroy]
    resources :restaurants, only: [:index, :show, :create, :update, :destroy]
    resources :ratings, only: [:index, :create, :update, :destroy]
    resources :dishes, only: [:index, :show, :create, :update, :destroy]
    resources :comments, only: [:index, :show, :create, :update, :destroy]
    resources :replies, only: [:index, :show, :create, :update, :destroy]
    resources :subscriptions, only: [:index, :create, :destroy]
    resources :likes, only: [:create, :destroy]
    get '/search', to: 'search#index'
  end
end
