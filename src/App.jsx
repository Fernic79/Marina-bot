import React, { useState } from 'react';
import MarinaAvatar from './components/MarinaAvatar';
import ChatInterface from './components/ChatInterface';
import QuestionFlow from './components/QuestionFlow';
import CareerResults from './components/CareerResults';
import CareerDetail from './components/CareerDetail';
import RestartOptions from './components/RestartOptions';
import carrerasData from './data/carreras.json';
import { sendLead, sendMetric } from './services/googleSheets';

function App() {
  const [step, setStep] = useState('identification'); // identification, questions, results, detail, restart
  const [userData, setUserData] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [marinaState, setMarinaState] = useState('idle');
  const [sessionId] = useState('session-' + Date.now());

  const handleIdentificationComplete = async (data) => {
    setMarinaState('thinking');
    setUserData(data);
    
    // Guardar lead inicial
    await sendLead(data, '');
    await sendMetric(sessionId, 'identification_complete', 'true');
    
    setTimeout(() => {
      setMarinaState('idle');
      setStep('questions');
    }, 1000);
  };

  const handleQuestionsComplete = async (finalAnswers) => {
    setMarinaState('thinking');
    setAnswers(finalAnswers);
    
    await sendMetric(sessionId, 'questions_completed', 'true');
    
    setTimeout(() => {
      setMarinaState('idle');
      setStep('results');
    }, 1000);
  };

  const handleViewDetail = (career) => {
    setSelectedCareer(career);
    setStep('detail');
    sendMetric(sessionId, 'career_viewed', career.id);
  };

  const handleContact = async (career) => {
    await sendLead(userData, career.nombre);
    await sendMetric(sessionId, 'contact_requested', career.id);
    alert(`¡Genial! Vamos a contactarte al email ${userData.email} con más información sobre ${career.nombre}.`);
  };

  // Manejar reinicio con datos existentes
  const handleRestartWithSameData = () => {
    setMarinaState('thinking');
    setAnswers([]);
    setSelectedCareer(null);
    
    sendMetric(sessionId, 'restart_same_profile', 'true');
    
    setTimeout(() => {
      setMarinaState('idle');
      setStep('questions');
    }, 800);
  };

  // Manejar reinicio con nuevo perfil
  const handleRestartWithNewProfile = () => {
    setMarinaState('thinking');
    setUserData(null);
    setAnswers([]);
    setSelectedCareer(null);
    
    sendMetric(sessionId, 'restart_new_profile', 'true');
    
    setTimeout(() => {
      setMarinaState('idle');
      setStep('identification');
    }, 800);
  };

  // Filtrar carreras basado en las respuestas
  const getFilteredCareers = () => {
    if (!answers.length) return [];

    const duracionTag = answers.find(a => a.questionId === 1)?.value;
    const trabajoTipo = answers.find(a => a.questionId === 2)?.value;
    const afinidad = answers.find(a => a.questionId === 3)?.value;
    const prioridad = answers.find(a => a.questionId === 4)?.value;

    let filtered = carrerasData.carreras;

    // Filtrar por duración
    if (duracionTag && duracionTag !== 'indistinto') {
      filtered = filtered.filter(c => c.duracionTag === duracionTag);
    }

    // Filtrar por tipo de trabajo y afinidad (tags)
    if (trabajoTipo || afinidad || prioridad) {
      const tags = [trabajoTipo, afinidad, prioridad].filter(Boolean);
      filtered = filtered.filter(career => {
        const matchCount = tags.filter(tag => career.tags.includes(tag)).length;
        return matchCount >= 1;
      });
    }

    // Ordenar por relevancia
    filtered = filtered.map(career => {
      const matchCount = [trabajoTipo, afinidad, prioridad]
        .filter(Boolean)
        .filter(tag => career.tags.includes(tag)).length;
      return { ...career, _matchScore: matchCount };
    })
    .sort((a, b) => b._matchScore - a._matchScore);

    return filtered.slice(0, 5);
  };

  const filteredCareers = getFilteredCareers();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md h-screen md:h-[800px] md:rounded-3xl bg-white shadow-2xl overflow-hidden flex flex-col relative">
        
        {/* Parte Superior: Marina (30%) */}
        <div className="h-[30%] w-full flex-shrink-0">
          <MarinaAvatar state={marinaState} />
        </div>

        {/* Parte Inferior: Contenido dinámico (60%) */}
        <div className="h-[60%] w-full flex-shrink-0">
          {step === 'identification' && (
            <ChatInterface onCompleteIdentification={handleIdentificationComplete} />
          )}
          
          {step === 'questions' && (
            <QuestionFlow 
              userData={userData}
              onComplete={handleQuestionsComplete}
              onBack={() => setStep('identification')}
            />
          )}
          
          {step === 'results' && (
            <CareerResults 
              careers={filteredCareers}
              userData={userData}
              onViewDetail={handleViewDetail}
              onRestart={() => setStep('restart')}
            />
          )}
          
          {step === 'detail' && selectedCareer && (
            <CareerDetail 
              career={selectedCareer}
              onBack={() => setStep('results')}
              onContact={handleContact}
            />
          )}

          {step === 'restart' && (
            <RestartOptions
              userData={userData}
              onRestartSame={handleRestartWithSameData}
              onRestartNew={handleRestartWithNewProfile}
            />
          )}
        </div>

      </div>
    </div>
  );
}

export default App;