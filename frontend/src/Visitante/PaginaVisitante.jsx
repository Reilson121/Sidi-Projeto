import { Check, Shield, Sparkles, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

import BeneficiosVisit from "./BeneficiosVisit"

import "./css/Visitante.css"

export default function PaginaVisitante() {

    return (

        <main className="visitante-page">

            <section className="visitante-card">

                <div className="assistente-icone">
                    <Sparkles size={34} />
                </div>

                <h2>Bem-vindo ao VisitControl</h2>

                <p className="descricao">
                    Nosso sistema de pré-cadastro foi desenvolvido para tornar sua visita
                    mais ágil e segura. Em poucos minutos, você estará pronto!
                </p>


                <div className="Beneficios-container">

                    <BeneficiosVisit
                        icone={<Check />}
                        titulo="Rápido"
                        conteudo="Processo simples em poucos passos"
                    />

                    <BeneficiosVisit
                        icone={<Shield />}
                        titulo="Seguro"
                        conteudo="Seus dados protegidos pela LGPD"
                    />

                    <BeneficiosVisit
                        icone={<Sparkles />}
                        titulo="Assistido"
                        conteudo="IA para auxiliar no cadastro"
                    />

                </div>


                <div className="botao-container">

                    <Link to="/ApresentacaoAssistente">

                        <button type="button" className="botao-iniciar">
                            Iniciar Cadastro
                            <ArrowRight size={18} />
                        </button>

                    </Link>

                </div>

            </section>

        </main>

    )

}