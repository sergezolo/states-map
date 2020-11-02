class CreateUserStates < ActiveRecord::Migration[6.0]
  def change
    create_table :user_states do |t|
      t.integer :user_id
      t.integer :state_id

      t.timestamps
    end
  end
end
