class SessionsController < ApplicationController

  def new

  end

  def create
    if author && author.authenticate(params[:password])
      make_session(author)
      redirect_to surveys_path
    else
      flash[:error] = 'Invalid email/password combination'
      render 'new'
    end
  end


  def logout
    session[:author_id] = nil
    redirect_to session_new_path
  end




  private

  def make_session(author)
    session[:author_id] = author.id
  end



end
