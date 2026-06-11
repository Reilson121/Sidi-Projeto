import { Clock, Calendar, UserCheckIcon, Users } from "lucide-react"


export default function Status(props) {
    return (
        <div className="caixas">
            <p>
                {props.descricao}
            </p>


            <div>
                {props.icone}
            </div>


            <h3>
                {props.numero}
            </h3>
        </div>
    )
}