class ChangeDateType < ActiveRecord::Migration
  def change
  	change_column(:parkings, :time_up, :datetime)
  end
end
