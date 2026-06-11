import { Link } from "react-router-dom";
import { Shield, Sparkles, Clock3, CircleCheck } from "lucide-react"
import { UserRound, UsersRound, UserCheck, Settings, ArrowRight } from "lucide-react"
import CardBeneficios from "./CardBeneficios"
import AcessosPerfil from "./AcessosPerfil"
import ListaEtapas from "./ListaEtapas"
import "./css/Inicio.css"

export default function Inicio() {

    return (
        <main>

            <div className="hero">
                <h1>Bem-vindo ao VisitControl</h1>

                <p>
                    Sistema inteligente de pré-cadastro de visitantes e fornecedores.
                    Rápido, seguro e em conformidade com a LGPD.
                </p>

                <Link to={"/Formulario"}>
                    <button type="button">
                        Novo Pré-Cadastro
                    </button>
                </Link>
            </div>


            <div className="titulo-secao">
                <h2>Por que usar o VisitControl?</h2>

                <p>
                    Nossa plataforma oferece a melhor experiência em gestão de visitantes
                </p>
            </div>


            <section className="caixas">

                <CardBeneficios
                    icone={<Shield />}
                    titulo="Conformidade LGPD"
                    descricao="Sistema totalmente adequado às normas de proteção de dados"
                />

                <CardBeneficios
                    icone={<Sparkles />}
                    titulo="Assistente IA"
                    descricao="Inteligência artificial para auxiliar no preenchimento"
                />

                <CardBeneficios
                    icone={<Clock3 />}
                    titulo="Acompanhamento em Tempo Real"
                    descricao="Verifique o status do seu cadastro a qualquer momento"
                />

                <CardBeneficios
                    icone={<CircleCheck />}
                    titulo="Processo Simplificado"
                    descricao="Cadastro rápido e intuitivo em poucos passos"
                />

            </section>


            <div className="titulo-secao">
                <p>Acesso por perfil</p>
                <h3>Selecione seu perfil de acesso</h3>
            </div>


            <section className="perfis">

                <AcessosPerfil
                    icone={<UserRound />}
                    perfil="Visitante"
                    seta={<ArrowRight size={18} />}
                    to="/PaginaVisitante"
                />

                <AcessosPerfil
                    icone={<UsersRound />}
                    perfil="Colaborador"
                    seta={<ArrowRight size={18} />}
                    to="/Colaborador"
                />

                <AcessosPerfil
                    icone={<UserCheck />}
                    perfil="Recepcionista"
                    seta={<ArrowRight size={18} />}
                    to="/Recepcao"

                />

                <AcessosPerfil
                    icone={<Settings />}
                    perfil="Administrador"
                    seta={<ArrowRight size={18} />}
                    to="/Administrador"
                />

            </section>


            <p className="texto-perfil">
                Clique no perfil desejado para acessar o sistema com as permissões correspondentes
            </p>


            <div className="titulo-secao">
                <h2>Como funciona</h2>
                <p>Processo simples em 5 etapas</p>
            </div>


            <section className="etapas-container">

                <ListaEtapas
                    numero="01"
                    topico="Dados Pessoais"
                    descricao="Preencha suas informações básicas"
                />

                <ListaEtapas
                    numero="02"
                    topico="Dados da Visita"
                    descricao="Informe detalhes sobre sua visita"
                />

                <ListaEtapas
                    numero="03"
                    topico="Informações Adicionais"
                    descricao="Complete com dados complementares"
                />

                <ListaEtapas
                    numero="04"
                    topico="Aceite LGPD"
                    descricao="Confirme os termos de privacidade"
                />

                <ListaEtapas
                    numero="05"
                    topico="Revisão e Envio"
                    descricao="Revise e envie seu cadastro"
                />

            </section>


            <div className="cta-final">

                <h2>Pronto para começar?</h2>

                <p>
                    Faça seu pré-cadastro agora e garanta um acesso rápido e seguro
                </p>

                <Link to={"/Formulario"}>
                    <button type="button">
                        Iniciar Pré-Cadastro
                    </button>
                </Link>

            </div>

        </main>
    )
}