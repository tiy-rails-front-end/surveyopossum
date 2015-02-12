class Survey < ActiveRecord::Base
  has_many :questions, :dependent => :destroy
  belongs_to :author
  accepts_nested_attributes_for :questions
end
