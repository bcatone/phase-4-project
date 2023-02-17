class PostTagsController < ApplicationController

    def create
        submitted_tags = params[:submitted_tags]
        puts submitted_tags
        submitted_tags.each do |submitted_tag|
            addedTag = Tag.find_by!(name: submitted_tag)
            post = Post.find(params[:post_id])
            PostTag.create!(post: post, tag: addedTag)
        end
        render json: params[:post], status: :created
    end
    
end
