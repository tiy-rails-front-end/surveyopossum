class SurveysController < ApplicationController
  before_action :set_survey, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user, except: [:show]


  def index
    @surveys = Survey.all
  end


  def show
    @surveys = Survey.all
    @submission=Submission.new
    @survey.submissions.build
    @survey.submissions.each { |s|  s.answers.build }
    @answer=Answer.new
  end

  def new
    @survey = Survey.new
    @survey.questions.build
    @survey.questions.each { |q|  q.options.build }
  end

  def edit
    @survey.questions.build
    @survey.questions.each { |q|  q.options.build }
    if @survey.submissions.count > 0
      redirect_to surveys_path, notice: 'You can not edit the survey once responses have been received'
    end
  end

  def create
    @survey = Survey.new(survey_params)

    respond_to do |format|
      if @survey.save
        format.html { redirect_to surveys_path, notice: "Survey was successfully created. The link to your survey is https://tiy-rails-front-end.herokuapp.com/surveys/#{@survey.id}" }
        format.json { render :show, status: :created, location: @survey }
      else
        format.html { render :new }
        format.json { render json: @survey.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    if @survey.update(survey_params)
      redirect_to @survey, notice: 'Survey was successfully updated.'
    else
       render :edit
    end
  end


  def destroy
    @survey.destroy
    respond_to do |format|
      format.html { redirect_to surveys_url, notice: 'Survey was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    def set_survey
       @survey = Survey.find(params[:id])
    end

    def survey_params
      params.require(:survey).permit(:title, :description, :author_id, :survey_id,
      questions_attributes: [:id, :question_text, :question_type, :is_required, :_destroy,
        options_attributes: [:id, :name]], submissions_attributes: [:id, :survey_id,
        answers_attributes: [:id, :answer_text, :submission_id, :question_id]])
    end
end
