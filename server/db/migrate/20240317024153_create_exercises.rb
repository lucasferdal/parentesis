class CreateExercises < ActiveRecord::Migration[7.0]
  def change
    create_table :exercises do |t|
      t.string :categoria, array: true, default: []
      t.string :descripcion
      t.integer :duracion
      t.string :titulo
      t.string :url

      t.timestamps
    end
  end
end
