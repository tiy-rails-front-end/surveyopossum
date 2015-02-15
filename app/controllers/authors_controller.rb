class AuthorsController < ApplicationController
  before_action :set_author, only: [:edit, :update, :destroy]
  before_action :authenticate_user, except: [:new, :create]

  def new
    @author = Author.new
  end

  def edit
  end

  def show
    render :edit
  end

  def index
    @authors= Author.all
    redirect_to surveys_path
  end

  def create
    @author = Author.new(author_params)
    if @author.save
      redirect_to authors_path, notice: 'Author was successfully created.'
    else
      render :new
    end
  end


  def update
    if @author.update(author_params)
      redirect_to authors_path, notice: 'Author was successfully updated.'
    else
      render :edit
    end
  end

  def destroy
    @author.destroy
    redirect_to author_url, notice: 'Author was successfully destroyed.'
  end

  private
    def set_author
      @author = Author.find(session[:author_id])
    end

    def author_params
      params.require(:author).permit(:name, :email, :password)
    end

    def make_session(author)
      session[:author_id] = author.id
    end
end
