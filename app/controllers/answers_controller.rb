class AnswersController < ApplicationController
  before_action :set_answer, only: [:edit, :update, :destroy]
  #before_action :authenticate_user, except: [:new, :create]

  def new
    @answer = Answer.new
  end

  def edit
  end

  def show
    render :edit
  end

  def index
    @answers= Answer.all
  end

  def create
    @answer = Answer.new(answer_params)
    if @answer.save
      submission=Submission.new
      submission.save
      @answer.submission_id= submission.id
      @answer.save
      redirect_to answers_path, notice: 'Answer was successfully created.'
    else
      render :new
    end
  end


  def update
    if @answer.update(answer_params)
      redirect_to answers_path, notice: 'Answer was successfully updated.'
    else
      render :edit
    end
  end

  def destroy
    @answer.destroy
    redirect_to answer_url, notice: 'Answer was successfully destroyed.'
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_answer
    @answer = Answer.find_by(survey_id: session[:survey_id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def answer_params
    params.require(:answer).permit(:answer_text, :question_id, :submission_id)
  end

end
