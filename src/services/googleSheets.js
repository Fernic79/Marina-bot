// REEMPLAZAR con la URL de tu Apps Script cuando la tengas
const SHEET_URL = import.meta.env.VITE_SHEET_URL;

export const sendLead = async (userData, carreraInteres) => {
  // Si no hay URL configurada, solo logueamos (no rompe el flujo)
  if (!SHEET_URL) {
    console.log('⚠️ Google Sheets no configurado. Lead:', { ...userData, carreraInteres });
    return { result: 'success' };
  }

  try {
    await fetch(SHEET_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tipo: 'lead',
        nombre: userData.nombre,
        email: userData.email,
        edad: userData.edad || '',
        ciudad: userData.ciudad || '',
        carreraInteres: carreraInteres || ''
      })
    });
    console.log('✅ Lead enviado a Sheets');
    return { result: 'success' };
  } catch (error) {
    console.error('❌ Error enviando lead:', error);
    return { result: 'error', error };
  }
};

export const sendMetric = async (sessionId, evento, valor, metadata = '') => {
  if (!SHEET_URL) {
    console.log('📊 Métrica:', { sessionId, evento, valor, metadata });
    return { result: 'success' };
  }

  try {
    await fetch(SHEET_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tipo: 'metrica',
        sessionId,
        evento,
        valor,
        metadata
      })
    });
    console.log('✅ Métrica enviada:', evento);
    return { result: 'success' };
  } catch (error) {
    console.error('❌ Error enviando métrica:', error);
    return { result: 'error', error };
  }
};