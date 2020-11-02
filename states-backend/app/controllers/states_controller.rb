class StatesController < ApplicationController
    before_action :set_state, only: [:show, :update, :destroy]

    def index
        @states = State.all
        render json: @states
    end

    def show
        render json: @state
    end
  
private

    def set_state
        @state = State.find(params[:id])
    end
  
    def state_params
        params.require(:state).permit(:state, :abbreviation, :admission_to_statehood, :nickname, :capital, :population_2013, :outline)
    end

end