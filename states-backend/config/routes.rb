Rails.application.routes.draw do
  resources :user_states
  resources :users
  resources :states
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end