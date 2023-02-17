class CommentSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :upvotes, :downvotes
  has_one :post
  has_one :user
end
