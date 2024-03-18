class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :email
      t.string :name
      t.integer :total_medallas
      t.jsonb :medallas, default: {}
      t.integer :edad
      t.string :genero
      t.jsonb :horarios, default: []

      t.timestamps
    end
  end
end
