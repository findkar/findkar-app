class CreateParkings < ActiveRecord::Migration
  def change
    create_table :parkings do |t|
      t.integer :user_id
      t.string :carLatitude
      t.string :carLongitude
      t.string :currentLatitude
      t.string :currentLongitude
      t.string :time_up

      t.timestamps null: false
    end
  end
end
