class SubmissionsController < ApplicationController
  before_action :set_submission, only: [:update, :show]

  def new
    @submission = Submission.new
    question = @survey.questions.build
    question.answers.build
  end

  def create
    @submission = Submission.new(submission_params)

    respond_to do |format|
      if @submission.save
        format.html { redirect_to @submission, notice: 'submission was successfully created.' }
        format.json { render :show, status: :created, location: @submission }
      else
        format.html { render :new }
        format.json { render json: @submission.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
  end

  def show
  end

  def index
  end
end
