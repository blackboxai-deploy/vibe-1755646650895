'use client';

import { useState } from 'react';
import { Card } from './ui/card';

export default function ElementCycle() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async () => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const prompt = "Crie uma ilustração artística mostrando o ciclo dos elementos clássicos dispostos em um padrão circular. Mostre: AR (redemoinhos de vento, nuvens) vence FOGO (chamas, faíscas), FOGO vence ÁGUA (vapor, evaporação), ÁGUA (ondas, gotículas) vence TERRA (rochas, solo), e TERRA vence AR (montanhas bloqueando vento). Use setas para mostrar a direção do ciclo. Estilo: arte mística, fantasia, cores vibrantes, efeitos de energia mágica, símbolos detalhados para cada elemento. Imagem circular com os 4 elementos conectados por setas indicando as relações de superioridade.";
      
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setImageUrl(data.imageUrl);
      } else {
        setError(data.error || 'Erro ao gerar imagem');
      }
    } catch (err) {
      setError('Erro de conexão');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Ciclo dos Elementos
        </h1>
        
        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-center">Como Funciona o Ciclo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center mb-6">
            <div className="p-4 bg-blue-100 rounded-lg">
              <div className="text-3xl mb-2">💨</div>
              <h3 className="font-bold text-blue-800">AR</h3>
              <p className="text-sm text-blue-600">Vence o Fogo</p>
            </div>
            <div className="p-4 bg-red-100 rounded-lg">
              <div className="text-3xl mb-2">🔥</div>
              <h3 className="font-bold text-red-800">FOGO</h3>
              <p className="text-sm text-red-600">Vence a Água</p>
            </div>
            <div className="p-4 bg-blue-100 rounded-lg">
              <div className="text-3xl mb-2">💧</div>
              <h3 className="font-bold text-blue-800">ÁGUA</h3>
              <p className="text-sm text-blue-600">Vence a Terra</p>
            </div>
            <div className="p-4 bg-green-100 rounded-lg">
              <div className="text-3xl mb-2">🌍</div>
              <h3 className="font-bold text-green-800">TERRA</h3>
              <p className="text-sm text-green-600">Vence o Ar</p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-gray-700 mb-4">
              <strong>Sequência do Ciclo:</strong> Ar → Fogo → Água → Terra → Ar
            </p>
            <p className="text-sm text-gray-600">
              Cada elemento tem superioridade sobre o próximo na sequência circular
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="text-center">
            <button
              onClick={generateImage}
              disabled={isGenerating}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold disabled:opacity-50 hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
            >
              {isGenerating ? 'Gerando Imagem...' : 'Gerar Imagem do Ciclo dos Elementos'}
            </button>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-100 border border-red-300 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {imageUrl && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4 text-center">Ciclo dos Elementos Gerado</h3>
              <div className="flex justify-center">
                <img
                  src={imageUrl}
                  alt="Ciclo dos elementos: Ar vence Fogo, Fogo vence Água, Água vence Terra, Terra vence Ar"
                  className="max-w-full h-auto rounded-lg shadow-lg"
                  style={{ maxHeight: '600px' }}
                />
              </div>
              <p className="text-center text-gray-600 mt-4">
                Imagem gerada mostrando o ciclo completo: Ar vence Fogo → Fogo vence Água → Água vence Terra → Terra vence Ar
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}