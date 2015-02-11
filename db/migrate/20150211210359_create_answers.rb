class CreateAnswers < ActiveRecord::Migration
  def change
    create_table :answers do |t|
      t.integer :question_id
      t.integer :submission_id
      t.text :answer_text

      t.timestamps null: false
    end
  end
end
