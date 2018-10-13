Rails.application.routes.draw do
  namespace :api, default: { format: :json } do
	  mount_devise_token_auth_for 'User', at: 'users'
	  resources :users, only: [:index, :show, :update, :destroy]
	  resources :restaurants
  end
end
