Rails.application.routes.draw do
	root to: 'home#landing'
	controller :home do
		get :search
	end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/doctor/:id', to: 'doctor#show'
end
