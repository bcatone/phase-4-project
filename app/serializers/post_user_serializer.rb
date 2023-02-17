class PostUserSerializer < ActiveModel::Serializer
  attributes :username

  has_many :posts
end
