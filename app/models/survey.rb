class Survey < ActiveRecord::Base
  has_many :questions, :dependent => :destroy
  has_many :submissions, :dependent => :destroy
  belongs_to :author
  has_many :options, through: :questions
  validates :title, presence: true
  validates :description, presence: true
  accepts_nested_attributes_for :questions,
    :allow_destroy => true,
    :reject_if     => :all_blank
  accepts_nested_attributes_for :submissions,
    :allow_destroy => true,
    :reject_if     => :all_blank
end
