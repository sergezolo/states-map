class UserStatesController < ApplicationController

    def index
        user_states = UserState.all
        render json: user_states
    end

    def create
        state = State.find_by(state: params["_json"])
        user = User.last
        user_state = UserState.new(user_id: user.id, state_id: state.id)
        if user_state.save
            render json: user_state, status: :created, location: user_state
        else
            render json: user_state.errors, status: :unprocessable_entity
        end
    end
    
    def destroy
        user_state = UserState.find(params[:id])
        user_state.destroy
        render json: :accepted
    end
    
end
