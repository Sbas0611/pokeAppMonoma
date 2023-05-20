import { useState } from 'react';

export default function PokemonCard({ pokemon }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <a onClick={() => setShowModal(true)} className="block">
          <div className="relative">
            <img
              src={pokemon.sprites.other.dream_world.front_default}
              alt={`Imagen de ${pokemon.name}`}
              className="h-48 w-full object-cover"
            />
            <div className="absolute top-0 right-0 bg-red-500 text-white font-bold px-2 py-1 rounded-bl-lg">
              #{pokemon.id}
            </div>
          </div>
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-2">{pokemon.name}</h2>

          </div>
        </a>
      </div>

      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <a onClick={() => setShowModal(false)}>
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
              &#8203;
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">{pokemon.name}</h3>
                      <div className="mt-2">
                        <img src={pokemon.sprites.other.dream_world.front_default} alt={`Imagen de ${pokemon.name}`} className="h-48 w-full object-cover" />
                      </div>
                      <div className="mt-2">
                        <p className="text-gray-600 font-medium mb-2">
                          Tipo(s):
                          {pokemon.types.map((type, index) => (
                            <span key={type.type.name} className="text-gray-800 font-bold">
                              {' '}
                              {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
                              {index !== pokemon.types.length - 1 && ','}
                            </span>
                          ))}
                        </p>
                        <p className="text-gray-600 font-medium">
                          Habilidades:
                          {pokemon.abilities.map((ability, index) => (
                            <span key={ability.ability.name} className="text-gray-800 font-bold">
                              {' '}
                              {ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1)}
                              {index !== pokemon.abilities.length - 1 && ','}
                            </span>
                          ))}
                        </p>
                        <p className="text-gray-600 font-medium mb-2">
                          Peso: <span className="text-gray-800 font-bold">{pokemon.weight / 10} kg</span>
                        </p>
                        <p className="text-gray-600 font-medium">
                          Altura: <span className="text-gray-800 font-bold">{pokemon.height / 10} m</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                </div>
              </div>
            </div>
          </a>
        </div>
      )}
    </div>
  );
}
