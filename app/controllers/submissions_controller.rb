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
