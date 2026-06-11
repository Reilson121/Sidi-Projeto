import StatusBadge from "./StatusBadge";

export default function TabelaVisitantes({ visitantes, atualizarStatus }) {
    function renderizarBotao(visitante) {
        if (visitante.status === "aguardando") {
            return (
                <button className="botao-acao botao-checkin" onClick={() => atualizarStatus(visitante.id)}>
                    Check-in
                </button>
            );
        }
        if (visitante.status === "atrasado") {
            return (
                <button className="botao-acao botao-atrasado" onClick={() => atualizarStatus(visitante.id)}>
                    Check-in
                </button>
            );
        }
        if (visitante.status === "presente") {
            return (
                <button className="botao-acao botao-checkout" onClick={() => atualizarStatus(visitante.id)}>
                    Check-out
                </button>
            );
        }
        return null;
    }

    return (
        <div className="tabela-container">
            <table>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Visitante</th>
                        <th>Empresa</th>
                        <th>Horário</th>
                        <th>Contato Interno</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {visitantes.map((visitante) => (
                        <tr key={visitante.id}>
                            <td>{visitante.codigo}</td>
                            <td>
                                <div className="visitante-info">
                                    <div>{visitante.visitante}</div>
                                    <small>{visitante.cpf}</small>
                                </div>
                            </td>
                            <td>{visitante.empresa}</td>
                            <td>{visitante.horario}</td>
                            <td>{visitante.contato}</td>
                            <td><StatusBadge status={visitante.status} /></td>
                            <td>{renderizarBotao(visitante)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}