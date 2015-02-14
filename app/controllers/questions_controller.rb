class QuestionsController < ApplicationController
  before_action :set_question, only: [:edit, :update, :destroy]
  before_action :authenticate_user

  def new
    @question = Question.new
  end

  def edit
  end

  def show
    render :edit
  end

  def index
    @survey=question.survey
    @questions= Question.all
  end

  def create
    @question = Question.new(question_params)
    if @question.save
      redirect_to questions_path, notice: 'Question was successfully created.'
    else
      render :new
    end
  end


  def update
    if @question.update(question_params)
      redirect_to questions_path, notice: 'Question was successfully updated.'
    else
      render :edit
    end
  end

  def destroy
    @question.destroy
    redirect_to question_url, notice: 'Question was successfully destroyed.'
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_question
    @question = Question.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def question_params
    params.require(:question).permit(:name, :email, :password, options_attributes: [:id, :name])
  end

end

end
