class UserStatesController < ApplicationController
    before_action :set_user

    def index
        user_states = @user.user_states
        render json: user_states
    end

    def create
        state = State.find_by(state: params["_json"])
        user_state = @user.user_states.new(state_id: state.id)
        if user_state.save
            render json: user_state, status: :created, location: user_state
        else
            render json: user_state.errors, status: :unprocessable_entity
        end
    end
    
    def destroy
        state = State.find_by(state: params[:id])
        user_state = @user.user_states.find_by(state_id: state.id)
        user_state.destroy
        render json: :accepted
    end

private

    def set_user
        @user = User.find_by_id(params[:user_id])
    end
    
end
