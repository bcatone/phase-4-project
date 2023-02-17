class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :upvotes, :downvotes, :username, :tags

  belongs_to :user
  has_many :tags

  def username
    self.object.user.username
  end

end
