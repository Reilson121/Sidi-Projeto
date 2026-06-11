import "../Formulario/styles/stepper.css";

export default function Stepper({ etapaAtual }) {
    const steps = [
        "Dados Pessoais",
        "Dados da Visita",
        "Informações Adicionais",
        "Revisão"
    ];

    return (
        <div className="stepper-container">

            <h2>Pré-Cadastro</h2>
            <p>Etapa {etapaAtual} de {steps.length}</p>

            <div className="progress-bar">
                <div
                    className="progress"
                    style={{ width: `${(etapaAtual / steps.length) * 100}%` }}
                />
            </div>

            <div className="steps">
                {steps.map((step, i) => (
                    <div
                        key={step}
                        className={`step ${etapaAtual >= i + 1 ? "active" : ""}`}
                    >
                        <div className="circle">{i + 1}</div>
                        <label>{step}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}