export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-green-700 to-emerald-800">
      <main className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">
            🎰 Mega Sena
          </h1>
          <h2 className="text-2xl md:text-3xl text-green-100 font-semibold mb-2">
            Game Plan
          </h2>
          <p className="text-green-50 text-lg max-w-2xl mx-auto">
            Planeje suas apostas e analise as melhores estratégias para a Mega Sena
          </p>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Card 1 - Gerador */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 hover:scale-105 transition-transform duration-300">
            <div className="text-4xl mb-4">🎲</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Gerador de Números
            </h3>
            <p className="text-gray-600 mb-4">
              Gere combinações aleatórias de números para suas apostas com base em diferentes estratégias.
            </p>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
              Em breve
            </button>
          </div>

          {/* Card 2 - Estatísticas */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 hover:scale-105 transition-transform duration-300">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Estatísticas
            </h3>
            <p className="text-gray-600 mb-4">
              Analise números mais sorteados, frequências e padrões históricos dos concursos.
            </p>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
              Em breve
            </button>
          </div>

          {/* Card 3 - Minhas Apostas */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 hover:scale-105 transition-transform duration-300">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Minhas Apostas
            </h3>
            <p className="text-gray-600 mb-4">
              Gerencie e acompanhe suas apostas realizadas e organize seus jogos favoritos.
            </p>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
              Em breve
            </button>
          </div>

          {/* Card 4 - Conferir Resultados */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 hover:scale-105 transition-transform duration-300">
            <div className="text-4xl mb-4">🏆</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Conferir Resultados
            </h3>
            <p className="text-gray-600 mb-4">
              Confira automaticamente suas apostas com os resultados dos últimos concursos.
            </p>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
              Em breve
            </button>
          </div>

          {/* Card 5 - Dashboard */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 hover:scale-105 transition-transform duration-300">
            <div className="text-4xl mb-4">📈</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Dashboard
            </h3>
            <p className="text-gray-600 mb-4">
              Visualize análises detalhadas e gráficos com insights sobre seus jogos e padrões.
            </p>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
              Em breve
            </button>
          </div>

          {/* Card 6 - Simulador */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 hover:scale-105 transition-transform duration-300">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Simulador
            </h3>
            <p className="text-gray-600 mb-4">
              Simule cenários e calcule probabilidades de acerto com diferentes combinações.
            </p>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
              Em breve
            </button>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-16 max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <h3 className="text-2xl font-bold text-white mb-4 text-center">
            ℹ️ Sobre a Mega Sena
          </h3>
          <p className="text-green-50 text-center leading-relaxed">
            A Mega Sena é a maior loteria do Brasil, onde você escolhe de 6 a 15 números 
            entre os 60 disponíveis. Os sorteios acontecem duas vezes por semana, e você 
            pode ganhar acertando 4 (quadra), 5 (quina) ou 6 (sena) números.
          </p>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-green-100 text-sm">
            ⚠️ Este projeto é apenas para fins educacionais e de entretenimento.
          </p>
          <p className="text-green-100 text-sm mt-2">
            Jogue com responsabilidade. 🍀
          </p>
        </div>
      </main>
    </div>
  );
}
