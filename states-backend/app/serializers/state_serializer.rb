class StateSerializer < ActiveModel::Serializer
  attributes :id, :state, :abbreviation, :admission_to_statehood, :nickname, :capital, :population_2013, :outline
  has_many :user_states
  has_many :users, through: :user_states
end
