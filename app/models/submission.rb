class Submission < ActiveRecord::Base
  has_many :answers, :dependent => :destroy
  belongs_to :survey
  accepts_nested_attributes_for :answers,
  :allow_destroy => true,
  :reject_if     => :all_blank

  def build_answers
    answers.build
  end
end
