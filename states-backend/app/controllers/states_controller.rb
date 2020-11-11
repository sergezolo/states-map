class StatesController < ApplicationController

    def index
        states = State.all
        render json: states
    end

    def show
        state = State.find_by(id: params[:id])
        render json: state
    end
  
private

    def state_params
        params.require(:state).permit(:state, :abbreviation, :admission_to_statehood, :nickname, :capital, :population_2013, :outline)
    end

end