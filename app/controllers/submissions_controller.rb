class SubmissionsController < ApplicationController

  before_action :set_submission, only: [:update, :show]

  def new
    @submission=Submission.new
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
    @submissions= Submission.where(survey_id: params[:survey_id])
  end


  private
  # Use callbacks to share common setup or constraints between actions.
  def set_submission
    @submission = Submission.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def submission_params
    params.require(:submission).permit(:survey_id)
  end
end
