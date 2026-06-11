export default function StatusBadge({ status }) {
    const textos = {
        aguardando: "Aguardando",
        atrasado: "Atrasado",
        presente: "Presente",
        finalizado: "Finalizado",
    };

    return (
        <span className={`status-badge status-${status}`}>
            {textos[status]}
        </span>
    );
}