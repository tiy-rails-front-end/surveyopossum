class SubmissionsController < ApplicationController
  before_action :set_submission, only: [:edit, :update, :destroy]

  def new
    @submission=Submission.new
  end


  def create
    @submission = Submission.new(submission_params)
    if @submission.save
     redirect_to surveys_path, notice: 'Submission was successfully created.'
    else
      redirect_to :back, notice: "An error prevented your submission from being saved"
    end
  end

  def update
  end

  def show
  end

  def index
    @submissions= Submission.where(survey_id: params[:survey_id])
  end


  private
    def set_submission
      @submission = Submission.find(params[:id])
    end

    def submission_params
      params.require(:submission).permit(:survey_id, answers_attributes: [:id, :answer_text, :submission_id, :question_id])
    end
  end
