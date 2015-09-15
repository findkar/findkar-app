class CreateParkings < ActiveRecord::Migration
  def change
    create_table :parkings do |t|
      t.integer :user_id
      t.string :latitude
      t.string :longitude
      t.string :time_up

      t.timestamps null: false
    end
  end
end
