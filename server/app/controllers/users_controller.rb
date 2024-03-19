# skip_before_action :verify_authenticity_token, if: :json_request?
class UsersController < ApplicationController
  respond_to :json

  def get_users
    @users = User.all
    render json: @users
  end

  def create
    user = User.new(user_params)
    if user.save
      render json: user, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :age, :gender)
  end
end
