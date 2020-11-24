Rails.application.routes.draw do
  resources :states
  resources :users do
    resources :user_states 
  end
  resources :user_states
end