import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import "./css/ApresentacaoAssistente.css"


export default function ApresentacaoAssistente() {
    return (



        <div className="assistente-container">

            <div className="assistente-card">

                <div className="assistente-icon">
                    <Sparkles size={34} />
                </div>

                <h2>Olá! Sou seu Assistente Virtual</h2>

                <p className="assistente-descricao">
                    Vou te ajudar durante todo o processo de cadastro.
                    Se tiver alguma dúvida sobre como preencher os campos,
                    é só me chamar!
                </p>

                <section className="assistente-ajuda">

                    <p>Como posso ajudar:</p>

                    <ul>
                        <li>✔ Explicar cada etapa do cadastro</li>
                        <li>✔ Tirar dúvidas sobre preenchimento</li>
                        <li>✔ Validar informações em tempo real</li>
                        <li>✔ Esclarecer questões sobre privacidade</li>
                    </ul>

                </section>

                <p className="assistente-dica">
                    💡 Dica: Você pode me acessar a qualquer momento
                    pelo chat no canto da tela!
                </p>

                <Link to={"/Formulario"}>
                    <button className="btn-comecar" type="button">
                        Vamos começar!
                    </button>
                </Link>

            </div>
        </div>
    );
}