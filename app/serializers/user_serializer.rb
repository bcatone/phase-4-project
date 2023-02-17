class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :first_name
end
