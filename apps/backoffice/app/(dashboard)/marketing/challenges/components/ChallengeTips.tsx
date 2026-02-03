export function ChallengeTips() {
  return (
    <div className="rounded-xl border border-orange-100 bg-gradient-to-r from-orange-50 to-red-50 p-6">
      <h3 className="mb-3 font-bold text-gray-900">Suggerimenti per sfide di successo</h3>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="flex items-start gap-3">
          <span className="text-2xl">📸</span>
          <div>
            <p className="font-medium text-gray-900">Scatta foto</p>
            <p className="text-sm text-gray-600">Le foto dei vincitori aumentano la viralita</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-2xl">🎬</span>
          <div>
            <p className="font-medium text-gray-900">Fai video</p>
            <p className="text-sm text-gray-600">
              I video dei tentativi funzionano benissimo sui social
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-2xl">🏆</span>
          <div>
            <p className="font-medium text-gray-900">Aggiorna il Wall of Fame</p>
            <p className="text-sm text-gray-600">Mostra i campioni per ispirare nuovi sfidanti</p>
          </div>
        </div>
      </div>
    </div>
  );
}
