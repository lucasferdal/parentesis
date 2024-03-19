Rails.application.routes.draw do
  devise_for :users
  get '/users', to: 'users#get_users'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  resources :exercises
  resources :users
  # Defines the root path route ("/")
  # root "articles#index"
end
