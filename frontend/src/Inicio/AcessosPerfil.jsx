import { Link } from "react-router-dom"

export default function AcessosPerfil(props) {
    return (

        <Link to={props.to} className="Acessos">

            <div className="icones">
                {props.icone}
            </div>

            <p>
                {props.perfil}
            </p>


            <div>
                {props.seta}
            </div>

        </Link>



    )
}