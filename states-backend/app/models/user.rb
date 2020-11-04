class User < ApplicationRecord
    validates :username, presence: true
    has_many :user_states
    has_many :states, through: :user_states
end
