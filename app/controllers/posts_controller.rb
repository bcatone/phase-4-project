class PostsController < ApplicationController
    skip_before_action :authorized_user, only: [:index, :show]

    def index
        render json: Post.all, status: :ok
    end

    def show
        render json: Post.find(params[:id]), status: :ok
    end

    def create
        render json: Post.create!(post_params), status: :ok
        # post = Post.create!(post_params)
        # submitted_tags = params[:submitted_tags]
        # submitted_tags.each  do |submitted_tag|
        #     tag = Tag.find_by(name: submitted_tag)
        #     if !tag
        #         tag = Tag.create!(name: submitted_tag)
        #     end
        #     PostTag.create!(post: post, tag: tag)
        #     render json: post, status: :created
        # end
        
        #  # render json: Post.create!(post_params), status: :ok
        #  render json: post, status: :created
    end

    def destroy
        post = Post.find(params[:id])
        if (post.user.id == current_user.id)
            post.destroy!
            head :no_content
        else
            render json: { errors: "Not Authorized!" }, status: :unauthorized
        end
    end

    private

    def post_params
        params.permit(:title, :content, :user_id)
    end

    def tag_params
        params.permit(:name)
    end

end
