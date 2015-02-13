class Survey < ActiveRecord::Base
  has_many :questions, :dependent => :destroy
  has_many :submissions
  belongs_to :author
<<<<<<< HEAD
  has_many :submissions
  accepts_nested_attributes_for :questions
=======
  validates :title, presence: true
  validates :description, presence: true
  accepts_nested_attributes_for :questions,
    :allow_destroy => true,
    :reject_if     => :all_blank
  accepts_nested_attributes_for :questions,
  :allow_destroy => true,
  :reject_if     => :all_blank
>>>>>>> 15ef07607c7c3d8646262d6e13a50d7e2d946de6
end
