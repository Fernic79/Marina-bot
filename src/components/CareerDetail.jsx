import React from 'react';

const CareerDetail = ({ career, onBack, onContact }) => {
  return (
    <div className="h-full flex flex-col bg-white rounded-t-3xl p-6 overflow-y-auto">
      <button
        onClick={onBack}
        className="mb-4 text-gray-600 hover:text-udemm-blue flex items-center gap-2"
      >
        ← Volver a resultados
      </button>

      <h3 className="text-xl font-bold text-udemm-blue mb-2">
        {career.nombre}
      </h3>
      
      <div className="flex gap-2 mb-4">
        <span className="text-xs bg-udemm-light text-udemm-blue px-3 py-1 rounded-full">
          {career.duracion}
        </span>
        {career.modalidad.includes('virtual') && (
          <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
            💻 Virtual
          </span>
        )}
      </div>

      <div className="space-y-4 text-sm">
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">📋 ¿De qué se trata?</h4>
          <p className="text-gray-600">{career.resumen}</p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-2"> Perfil del estudiante</h4>
          <p className="text-gray-600">{career.perfil}</p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-2"> Salida laboral</h4>
          <ul className="text-gray-600 space-y-1">
            {career.salidaLaboral.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-udemm-blue">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <a
          href={career.urlOficial}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-3 rounded-xl bg-udemm-blue text-white text-center font-semibold hover:bg-blue-800 transition-colors"
        >
          🌐 Ver info oficial en UdeMM
        </a>
        
        <button
          onClick={() => onContact(career)}
          className="block w-full py-3 rounded-xl border-2 border-udemm-blue text-udemm-blue text-center font-semibold hover:bg-udemm-light transition-colors"
        >
          📩 Quiero que me contacten
        </button>
      </div>
    </div>
  );
};

export default CareerDetail;