class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.string :question_type
      t.integer :survey_id
      t.string :question_text
      t.integer :order_number

      t.timestamps null: false
    end
  end
end
