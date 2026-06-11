export default function ListaEtapas(props) {
    return (
        <div className="Etapas">

            <div className="numeros">
                {props.numero}
            </div>

            <div className="etapa-texto">
                <h4>{props.topico}</h4>
                <p>{props.descricao}</p>
            </div>

        </div>
    )
}