import React, { useState } from 'react';

const questions = [
  {
    id: 1,
    text: "¿Cuánto tiempo querés estudiar?",
    options: [
      { value: "corta", label: "2-3 años (quiero recibirme rápido)", icon: "⚡" },
      { value: "larga", label: "4-5 años (quiero una licenciatura)", icon: "🎓" },
      { value: "indistinto", label: "No sé / Todavía no lo decidí", icon: "🤔" }
    ]
  },
  {
    id: 2,
    text: "¿Cómo te imaginás trabajando?",
    options: [
      { value: "oficina", label: "En oficina / empresa", icon: "🏢" },
      { value: "campo", label: "Al aire libre / en movimiento", icon: "🌍" },
      { value: "tecnologia", label: "Con tecnología / computadoras", icon: "💻" },
      { value: "personas", label: "Con personas / ayudando a otros", icon: "🤝" },
      { value: "viajar", label: "Viajando / en distintos lugares", icon: "✈️" }
    ]
  },
  {
    id: 3,
    text: "¿Qué se te da mejor?",
    options: [
      { value: "numeros-analisis", label: "Números y análisis", icon: "📊" },
      { value: "comunicacion", label: "Comunicarte y relacionarte", icon: "💬" },
      { value: "tecnologia-sistemas", label: "Tecnología y sistemas", icon: "⚙️" },
      { value: "creatividad-arte", label: "Creatividad y arte", icon: "🎨" },
      { value: "variado", label: "Un poco de todo", icon: "" }
    ]
  },
  {
    id: 4,
    text: "¿Qué es más importante para vos?",
    options: [
      { value: "salida-rapida", label: "Salida laboral rápida", icon: "💼" },
      { value: "buena-plata", label: "Ganar buena plata", icon: "💰" },
      { value: "pasion", label: "Que me guste / me apasione", icon: "❤️" },
      { value: "viajar-remoto", label: "Poder viajar o trabajar remoto", icon: "🌎" },
      { value: "impacto-social", label: "Ayudar a otros / impacto social", icon: "🌱" }
    ]
  }
];

const QuestionFlow = ({ userData, onComplete, onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (optionValue) => {
    setSelectedOption(optionValue);
  };

  const handleNext = () => {
    const newAnswers = [...answers, {
      questionId: questions[currentQuestion].id,
      value: selectedOption
    }];

    if (currentQuestion < questions.length - 1) {
      setAnswers(newAnswers);
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      // Última pregunta - completar
      onComplete(newAnswers);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(answers[currentQuestion - 1]?.value || null);
      setAnswers(answers.slice(0, -1));
    } else {
      onBack();
    }
  };

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="h-full flex flex-col bg-white rounded-t-3xl p-6 overflow-y-auto">
      {/* Barra de progreso */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div 
          className="bg-udemm-blue h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Pregunta actual */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          Pregunta {currentQuestion + 1} de {questions.length}
        </h3>
        <p className="text-xl font-medium text-udemm-blue mb-6">
          {currentQ.text}
        </p>

        {/* Opciones */}
        <div className="space-y-3">
          {currentQ.options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleOptionSelect(option.value)}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                selectedOption === option.value
                  ? 'border-udemm-blue bg-udemm-light'
                  : 'border-gray-200 hover:border-udemm-blue/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{option.icon}</span>
                <span className="text-gray-700 font-medium">{option.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Botones de navegación */}
      <div className="flex gap-3 mt-6 pt-4">
        {currentQuestion > 0 && (
          <button
            onClick={handleBack}
            className="px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
          >
            ️ Volver
          </button>
        )}
        <button
          onClick={handleNext}
          disabled={!selectedOption}
          className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
            selectedOption
              ? 'bg-udemm-blue text-white hover:bg-blue-800'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {currentQuestion === questions.length - 1 ? 'Ver resultados ' : 'Continuar →'}
        </button>
      </div>
    </div>
  );
};

export default QuestionFlow;