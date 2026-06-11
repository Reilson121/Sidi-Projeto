export default function CheckinRapido({
    busca,
    setBusca,
}) {
    return (
        <div className="checkin-rapido">
            <h2>Check-in Rápido</h2>

            <div className="checkin-input-area">
                <input
                    type="text"
                    placeholder="Buscar por nome, CPF ou código..."
                    value={busca}
                    onChange={(e) =>
                        setBusca(e.target.value)
                    }
                />

            </div>
        </div>
    );
}