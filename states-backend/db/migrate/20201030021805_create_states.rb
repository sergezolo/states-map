class CreateStates < ActiveRecord::Migration[6.0]
  def change
    create_table :states do |t|
      t.string :state
      t.string :abbreviation
      t.string :admission_to_statehood
      t.string :nickname
      t.string :capital
      t.string :population_2013
      t.string :outline

      t.timestamps
    end
  end
end
