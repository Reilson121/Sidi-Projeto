export default function TabelaSolicitacao({
    requests,
    onApprove,
    onReject,
}) {

    return (
        <table>

            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nome</th>
                    <th>Empresa</th>
                    <th>Data/Hora</th>
                    <th>Tipo</th>
                    <th>Status</th>
                    <th>Ações</th>
                </tr>
            </thead>

            <tbody>

                {requests.map((req) => (

                    <tr key={req.id}>

                        <td>{req.code}</td>

                        <td>
                            <div className="user-name">
                                {req.name}
                            </div>

                            <div className="user-email">
                                {req.email}
                            </div>
                        </td>

                        <td>{req.company}</td>

                        <td>
                            <div className="date">{req.date}</div>
                            <div className="time">{req.time}</div>
                        </td>

                        <td>
                            <span className="type-badge">
                                {req.type}
                            </span>
                        </td>

                        <td>
                            <span className={`status ${req.status.toLowerCase()}`}>
                                {req.status}
                            </span>
                        </td>

                        <td>

                            <div className="actions">

                                <button
                                    className="btn-approve"
                                    onClick={() => onApprove(req)}
                                >
                                    Aprovar
                                </button>

                                <button
                                    className="btn-reject"
                                    onClick={() => onReject(req)}
                                >
                                    Recusar
                                </button>

                            </div>

                        </td>

                    </tr>

                ))}

            </tbody>

        </table>
    );
}