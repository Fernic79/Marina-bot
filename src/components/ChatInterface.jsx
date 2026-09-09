import React, { useState } from 'react';
import { sendLead, sendMetric } from '../services/googleSheets';

const ChatInterface = ({ onCompleteIdentification }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    edad: '',
    ciudad: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Enviar lead a Sheets (o loguear si no está configurado)
      await sendLead(formData, '');
      await sendMetric('session-' + Date.now(), 'identification_complete', 'true');
      
      console.log('✅ Formulario enviado:', formData);
      
      // Pasar al siguiente paso
      onCompleteIdentification(formData);
    } catch (error) {
      console.error('Error:', error);
      // Igual avanzamos aunque falle el envío
      onCompleteIdentification(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.05)] p-6 overflow-y-auto">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800">¡Hola! 👋</h3>
        <p className="text-gray-600 text-sm mt-1">
          Soy Marina. Para ayudarte a encontrar la carrera ideal en UdeMM, contame un poquito de vos:
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">¿Cómo te llamás? *</label>
          <input
            type="text"
            name="nombre"
            required
            value={formData.nombre}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-udemm-blue focus:ring-1 focus:ring-udemm-blue outline-none transition-all"
            placeholder="Tu nombre"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Tu email *</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-udemm-blue focus:ring-1 focus:ring-udemm-blue outline-none transition-all"
            placeholder="tucorreo@ejemplo.com"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-500 mb-1">Edad</label>
            <input
              type="number"
              name="edad"
              value={formData.edad}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-udemm-blue focus:ring-1 focus:ring-udemm-blue outline-none transition-all"
              placeholder="18"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-500 mb-1">Ciudad</label>
            <input
              type="text"
              name="ciudad"
              value={formData.ciudad}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-udemm-blue focus:ring-1 focus:ring-udemm-blue outline-none transition-all"
              placeholder="Buenos Aires"
            />
          </div>
        </div>

        <p className="text-[10px] text-gray-400 text-center mt-2 px-4">
          Tus datos son confidenciales y serán utilizados exclusivamente por la UdeMM para brindarte información académica. Responsable: Universidad de la Marina Mercante.
        </p>

        <button
          type="submit"
          disabled={loading}
          className={`w-full font-semibold py-3 rounded-xl transition-all shadow-lg mt-2 ${
            loading 
              ? 'bg-gray-400 text-white cursor-not-allowed' 
              : 'bg-udemm-blue text-white hover:bg-blue-800'
          }`}
        >
          {loading ? 'Enviando...' : 'Empezar a buscar mi carrera 🚀'}
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;