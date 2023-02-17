Rails.application.routes.draw do
  resources :comments
  resources :post_tags, only: [:create, :destroy]
  resources :tags, only: [:index, :create]
  resources :posts, only: [:index, :show, :create, :destroy]
  resources :users, only: [:show, :create, :update, :destroy]

  post '/login', to: 'sessions#create'
  delete '/logout', to:'sessions#destroy'
  get '/authorized_user', to: 'users#show'

  get '*path',
  to: 'fallback#index',
  constraints: ->(req) { !req.xhr? && req.format.html? }

end
