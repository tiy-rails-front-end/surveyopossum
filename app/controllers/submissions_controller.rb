class SubmissionsController < ApplicationController
  before_action :set_submission, only: [:edit, :update, :destroy, :show]
  def new
    @submission=Submission.new
  end

  def edit
  end

  def create
  end

  def update
  end

  def destroy
  end

  def show

  end

  def index
  end
end
