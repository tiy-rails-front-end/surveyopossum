class Survey < ActiveRecord::Base
  has_many :questions, :dependent => :destroy
  belongs_to :author
  validates :title, presence: true
  validates :description, presence: true
  accepts_nested_attributes_for :questions,
    :allow_destroy => true,
    :reject_if     => :all_blank
end
