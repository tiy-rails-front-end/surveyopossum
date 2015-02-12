class AddSurveyIDtoSubmissions < ActiveRecord::Migration
  def change
    add_column :submissions, :survey_id, :integer
  end
end
