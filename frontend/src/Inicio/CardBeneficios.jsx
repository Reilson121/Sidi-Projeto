export default function CardBeneficios(props) {
    return (
        <div className="caixa">
            <div className="icone">
                {props.icone}
            </div>

            <h3>
                {props.titulo}
            </h3>

            <p>
                {props.descricao}
            </p>
        </div>
    )
}