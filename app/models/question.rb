class Question < ActiveRecord::Base
  belongs_to :survey
  has_many :answers
  has_many :options
  accepts_nested_attributes_for :options
end
