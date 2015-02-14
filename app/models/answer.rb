class Answer < ActiveRecord::Base
  belongs_to :question
  belongs_to :submission
  validate :must_answer_required_question

  def must_answer_required_question
    if question.is_required && answer_text.blank?
      errors.add(:Answer, "You must answer required questions")
    end
  end
end
