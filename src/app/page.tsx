'use client'

import React from 'react'

export default function ElementCycle() {
  const elements = [
    {
      name: 'AR',
      color: '#87CEEB',
      icon: '💨',
      defeats: 'FOGO',
      defeatedBy: 'TERRA',
      position: { top: '10%', left: '50%' }
    },
    {
      name: 'FOGO',
      color: '#FF6B35',
      icon: '🔥',
      defeats: 'ÁGUA',
      defeatedBy: 'AR',
      position: { top: '50%', right: '10%' }
    },
    {
      name: 'ÁGUA',
      color: '#4A90E2',
      icon: '💧',
      defeats: 'TERRA',
      defeatedBy: 'FOGO',
      position: { bottom: '10%', left: '50%' }
    },
    {
      name: 'TERRA',
      color: '#8B4513',
      icon: '🌍',
      defeats: 'AR',
      defeatedBy: 'ÁGUA',
      position: { top: '50%', left: '10%' }
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-8">
      <div className="relative w-full max-w-4xl h-96">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">CICLO DOS ELEMENTOS</h1>
            <p className="text-lg opacity-80">Cada elemento supera o próximo no ciclo</p>
          </div>
        </div>

        {elements.map((element, index) => {
          const nextIndex = (index + 1) % elements.length
          const nextElement = elements[nextIndex]
          
          return (
            <div key={element.name}>
              <div
                className="absolute transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full flex flex-col items-center justify-center text-white font-bold shadow-2xl border-4 border-white/30 backdrop-blur-sm"
                style={{
                  backgroundColor: element.color,
                  ...element.position
                }}
              >
                <div className="text-3xl mb-1">{element.icon}</div>
                <div className="text-sm">{element.name}</div>
              </div>

              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ zIndex: -1 }}
              >
                <defs>
                  <marker
                    id={`arrowhead-${index}`}
                    markerWidth="10"
                    markerHeight="7"
                    refX="9"
                    refY="3.5"
                    orient="auto"
                  >
                    <polygon
                      points="0 0, 10 3.5, 0 7"
                      fill="#FFD700"
                      stroke="#FFD700"
                      strokeWidth="1"
                    />
                  </marker>
                </defs>
                
                <line
                  x1={`${parseFloat(element.position.left || element.position.right || '50')}%`}
                  y1={`${parseFloat(element.position.top || element.position.bottom || '50')}%`}
                  x2={`${parseFloat(nextElement.position.left || nextElement.position.right || '50')}%`}
                  y2={`${parseFloat(nextElement.position.top || nextElement.position.bottom || '50')}%`}
                  stroke="#FFD700"
                  strokeWidth="3"
                  markerEnd={`url(#arrowhead-${index})`}
                  className="drop-shadow-lg"
                />
              </svg>

              <div
                className="absolute transform -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm border border-yellow-400"
                style={{
                  left: `${(parseFloat(element.position.left || element.position.right || '50') + parseFloat(nextElement.position.left || nextElement.position.right || '50')) / 2}%`,
                  top: `${(parseFloat(element.position.top || element.position.bottom || '50') + parseFloat(nextElement.position.top || nextElement.position.bottom || '50')) / 2}%`
                }}
              >
                {element.name} → {nextElement.name}
              </div>
            </div>
          )
        })}

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-6 py-3 rounded-lg backdrop-blur-sm border border-white/20">
          <div className="text-center text-sm">
            <div className="font-semibold mb-2">Regras do Ciclo:</div>
            <div className="space-y-1">
              <div>💨 AR supera 🔥 FOGO</div>
              <div>🔥 FOGO supera 💧 ÁGUA</div>
              <div>💧 ÁGUA supera 🌍 TERRA</div>
              <div>🌍 TERRA supera 💨 AR</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}