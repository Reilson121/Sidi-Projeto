export default function BeneficiosVisit(props) {
    return (
        <div>
            <div className="Beneficios-card">
                <div className="icone">
                    {props.icone}
                </div>

                <h4>
                    {props.titulo}
                </h4>

                <p>
                    {props.conteudo}
                </p>
            </div>
        </div>
    )
}
