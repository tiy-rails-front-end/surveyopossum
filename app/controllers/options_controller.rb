class OptionsController < ApplicationController
  before_action :set_option, only: [:edit, :update, :destroy]
  before_action :authenticate_user

  def new
    @option = Option.new
  end

  def edit
  end

  def show
    render :edit
  end

  def index
    @options= Option.all
  end

  def create
    @option = Option.new(option_params)
    if @option.save
      redirect_to options_path, notice: 'Option was successfully created.'
    else
      render :new
    end
  end


  def update
    if @option.update(option_params)
      redirect_to options_path, notice: 'Option was successfully updated.'
    else
      render :edit
    end
  end

  def destroy
    @option.destroy
    redirect_to option_url, notice: 'Option was successfully destroyed.'
  end

  private
    def set_option
      @option = Option.find(params[:id])
    end

    def option_params
      params.require(:option).permit(:name, :email, :password)
    end

end
