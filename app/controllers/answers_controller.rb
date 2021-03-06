class AnswersController < ApplicationController
  before_action :set_answer, only: [:edit, :update, :destroy]

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
      redirect_to surveys_path, notice: 'Answer was successfully created.'
    else
      redirect_to :back, notice: 'You must answer required questions'
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
  def set_answer
    @answer = Answer.find(params[:id])
  end

  def answer_params
    params.require(:answer).permit(:answer_text, :question_id, :submission_id)
  end

end
