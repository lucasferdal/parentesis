class RegistrationsController < Devise::RegistrationsController
    # skip_before_action :verify_authenticity_token, if: :json_request?
  
    def create
      build_resource(sign_up_params)
  
      resource.save
      if resource.persisted?
        render json: resource, status: :created
      else
        render json: { errors: resource.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    private
  
    def sign_up_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation, :edad, :genero)
    end
  
    def json_request?
      request.format.json?
    end
  end
  