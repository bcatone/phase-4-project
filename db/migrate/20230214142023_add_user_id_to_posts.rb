class AddUserIdToPosts < ActiveRecord::Migration[7.0]
  def change
    add_column :posts, :user, :integer
  end
end
