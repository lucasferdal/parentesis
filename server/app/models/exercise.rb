class Exercise < ApplicationRecord
  #validaciones
  validates :categoria, :descripcion, :duracion, :titulo, :url, presence: true
end
