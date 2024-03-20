class UsersController < ApplicationController
  respond_to :json

  # Acción para obtener la lista de usuarios
  def get_users
    @users = User.all
    render json: @users
  end

  # Otras acciones relacionadas con los usuarios, como mostrar un perfil de usuario, actualizar información de usuario, etc.
end
