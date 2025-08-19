import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt é obrigatório' },
        { status: 400 }
      );
    }

    // Gerar imagem usando o modelo FLUX
    const response = await fetch('https://oi-server.onrender.com/chat/completions', {
      method: 'POST',
      headers: {
        'customerId': 'wandebascastello@gmail.com',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer xxx'
      },
      body: JSON.stringify({
        model: 'replicate/black-forest-labs/flux-1.1-pro',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erro na API:', errorText);
      return NextResponse.json(
        { error: 'Erro ao gerar imagem', details: errorText },
        { status: 500 }
      );
    }

    const data = await response.json();
    
    if (data.choices && data.choices[0] && data.choices[0].message) {
      const imageUrl = data.choices[0].message.content;
      return NextResponse.json({ imageUrl });
    } else {
      console.error('Resposta inesperada da API:', data);
      return NextResponse.json(
        { error: 'Formato de resposta inesperado da API' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Erro interno:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor', details: error instanceof Error ? error.message : 'Erro desconhecido' },
      { status: 500 }
    );
  }
}