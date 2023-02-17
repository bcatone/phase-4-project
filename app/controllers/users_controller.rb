class UsersController < ApplicationController

    skip_before_action :authorized_user, only: [:create]

    def show
        render json: current_user, status: :ok
    end

    def create
        render json: User.create!(user_params), status: :created
    end

    def update
        render json: current_user.update!(user_params), status: :accepted
    end

    def destroy
        user = User.find_by(id: params[:id])
        if user && user.authenticate(params[:password])
            user.destroy!
            head :no_content
        else
            render json: { errors: "Incorrect password" }, status: :unauthorized
        end
    end

    private

    def user_params
        params.permit(:username, :password, :email)
    end
end
