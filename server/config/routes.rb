Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: 'registrations', sessions: 'sessions' }
  get '/users', to: 'users#get_users'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  resources :exercises
  resources :users, only: [:create]
  # Defines the root path route ("/")
  # root "articles#index"
end
