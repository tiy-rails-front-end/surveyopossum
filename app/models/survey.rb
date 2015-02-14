class Survey < ActiveRecord::Base
  has_many :questions, :dependent => :destroy
  has_many :submissions
  belongs_to :author
  has_many :submissions
  has_many :options, through: :questions
  accepts_nested_attributes_for :options,
    :allow_destroy => true,
    :reject_if => :all_blank

  validates :title, presence: true
  validates :description, presence: true
  accepts_nested_attributes_for :questions,
    :allow_destroy => true,
    :reject_if     => :all_blank


end
