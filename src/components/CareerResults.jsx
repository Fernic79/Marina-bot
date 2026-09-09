import React from 'react';

const CareerResults = ({ careers, userData, onViewDetail, onRestart }) => {
  const getAreaName = (areaId) => {
    const areas = {
      administracion: '💼 Administración',
      juridicas: '⚖️ Cs. Jurídicas',
      humanidades: '🧠 Humanidades',
      ingenieria: '⚙️ Ingeniería'
    };
    return areas[areaId] || areaId;
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-t-3xl p-6 overflow-y-auto">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-udemm-blue mb-2">
          ¡Encontré {careers.length} carreras para vos! 🎯
        </h3>
        <p className="text-gray-600 text-sm">
          Estas son las que mejor se adaptan a lo que buscás, {userData.nombre.split(' ')[0]}.
        </p>
      </div>

      <div className="space-y-4 flex-1 overflow-y-auto">
        {careers.map((career) => (
          <div 
            key={career.id}
            className="border border-gray-200 rounded-xl p-4 hover:border-udemm-blue transition-colors cursor-pointer"
            onClick={() => onViewDetail(career)}
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold text-gray-800 flex-1">
                {career.nombre}
              </h4>
              <span className="text-xs bg-udemm-light text-udemm-blue px-2 py-1 rounded-full">
                {career.duracion}
              </span>
            </div>
            
            <p className="text-xs text-gray-500 mb-2">
              {getAreaName(career.area)}
            </p>
            
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {career.resumen}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {career.modalidad.includes('virtual') && (
                  <span className="text-xs text-green-600">💻 Virtual</span>
                )}
                {career.modalidad.includes('presencial') && (
                  <span className="text-xs text-blue-600">🏫 Presencial</span>
                )}
              </div>
              <span className="text-udemm-blue text-sm font-medium">
                Ver más →
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <button
          onClick={onRestart}
          className="w-full py-3 rounded-xl border-2 border-udemm-blue text-udemm-blue font-medium hover:bg-udemm-light transition-colors"
        >
          🔄 Ver otras opciones
        </button>
      </div>
    </div>
  );
};

export default CareerResults;