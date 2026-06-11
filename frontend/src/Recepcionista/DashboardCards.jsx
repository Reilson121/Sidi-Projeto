export default function DashboardCards({ visitantes }) {
    const visitasHoje = visitantes.length;

    const aguardando = visitantes.filter(
        (v) => v.status === "aguardando"
    ).length;

    const presentes = visitantes.filter(
        (v) => v.status === "presente"
    ).length;



    return (
        <div className="dashboard-cards">
            <div className="card-dashboard">
                <h3>Visitas Hoje</h3>
                <p>{visitasHoje}</p>
            </div>

            <div className="card-dashboard">
                <h3>Aguardando</h3>
                <p>{aguardando}</p>
            </div>

            <div className="card-dashboard">
                <h3>Presentes</h3>
                <p>{presentes}</p>
            </div>

            <div className="card-dashboard">
                <h3>Total Visitantes</h3>
                <p>{visitantes.length}</p>
            </div>
        </div>
    );
}