class Question < ActiveRecord::Base
  belongs_to :survey
  has_many :answers
  has_many :options, :dependent => :destroy
  accepts_nested_attributes_for :options,
    :allow_destroy => true,
    :reject_if => proc { |attributes| attributes['name'].blank? }

end
