import React from 'react';

const RestartOptions = ({ userData, onRestartSame, onRestartNew }) => {
  return (
    <div className="h-full flex flex-col bg-white rounded-t-3xl p-6 overflow-y-auto">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="text-6xl mb-4"></div>
        <h3 className="text-xl font-bold text-udemm-blue mb-2">
          ¡Esperamos que te haya sido útil!
        </h3>
        <p className="text-gray-600 text-sm mb-6">
          {userData.nombre.split(' ')[0]}, ¿qué querés hacer ahora?
        </p>

        <div className="w-full space-y-3">
          <button
            onClick={onRestartSame}
            className="w-full p-4 rounded-xl border-2 border-udemm-blue bg-udemm-light text-udemm-blue font-semibold hover:bg-blue-100 transition-colors"
          >
             Empezar de nuevo
            <p className="text-xs font-normal mt-1 text-gray-600">
              (Cambiar mis respuestas con los mismos datos)
            </p>
          </button>

          <button
            onClick={onRestartNew}
            className="w-full p-4 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
          >
             Empezar con otro perfil
            <p className="text-xs font-normal mt-1 text-gray-500">
              (Si otra persona va a usar este celular)
            </p>
          </button>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          Si tenés dudas, contactanos a{' '}
          <a href="mailto:info@udemm.edu.ar" className="text-udemm-blue underline">
            info@udemm.edu.ar
          </a>
        </p>
      </div>
    </div>
  );
};

export default RestartOptions;