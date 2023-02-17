class User < ApplicationRecord
    has_many :posts

    validates :username, presence: true, uniqueness: true
    validates :password, length: { in: 8..20 }

    has_secure_password
end
