class User < ApplicationRecord
    validates :username, presence: true
    has_many :user_states
    has_many :states, through: :user_states
    accepts_nested_attributes_for :user_states, allow_destroy: true
end
