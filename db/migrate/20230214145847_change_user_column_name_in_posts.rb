class ChangeUserColumnNameInPosts < ActiveRecord::Migration[7.0]
  def change
    rename_column :posts, :user, :user_id
  end
end
