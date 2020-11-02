class UserStateSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :state_id
  belongs_to :user 
  belongs_to :state
end
