class TagsController < ApplicationController

    def index
        render json: Tag.all, status: :ok
    end

    def create
        render json: Tag.create!(tag_params), status: :created
    end

    private

    def tag_params
        params.permit(:name)
    end
end
