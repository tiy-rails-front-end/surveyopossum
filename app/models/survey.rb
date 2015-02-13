class Survey < ActiveRecord::Base
  has_many :questions, :dependent => :destroy
  belongs_to :author
  has_many :submissions
  accepts_nested_attributes_for :questions
end
