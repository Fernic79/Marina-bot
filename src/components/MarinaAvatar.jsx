import React from 'react';

const MarinaAvatar = ({ state }) => {
  const getAnimation = () => {
    if (state === 'thinking') return 'animate-float';
    return 'animate-breathe';
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-full w-full bg-gradient-to-b from-udemm-light to-white">
      {/* Contenedor cuadrado que recorta la imagen en círculo por CSS */}
      <div className={`relative z-10 w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden shadow-xl border-4 border-white ${getAnimation()}`}>
        <img 
          src="src/assets/marina.png" 
          alt="Marina - Asistente UdeMM" 
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Nombre */}
      <h2 className="mt-3 text-lg font-bold text-udemm-blue z-10">Marina</h2>
      <p className="text-xs text-gray-500 z-10">Tu asistente en UdeMM</p>

      {/* Indicador de estado (pensando) */}
      {state === 'thinking' && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-md border border-udemm-blue/20 z-20">
          <span className="text-[10px] text-udemm-blue font-medium animate-pulse">Pensando...</span>
        </div>
      )}
    </div>
  );
};

export default MarinaAvatar;