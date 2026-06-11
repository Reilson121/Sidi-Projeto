import Sidebar from "../SidebarForm/Sidebar";
import "./Notificacoes.css";

import {
    useNotificacoes
} from "../context/NotificacaoContext";

export default function Notificacoes() {

    const {
        notificacoes,
        marcarComoLida,
        excluirNotificacao,
        limparTodas,
    } = useNotificacoes();

    return (

        <div className="layout">

            <Sidebar
                titulo="Notificações"
                mostrarNotificacoes={true}
            />

            <div className="conteudo-pagina">

                <div className="notificacoes-container">

                    <div className="notificacoes-header">

                        <div>

                            <h1>
                                Notificações
                            </h1>

                            <p>
                                Acompanhe as atualizações
                                do sistema
                            </p>

                        </div>

                        {notificacoes.length > 0 && (

                            <button
                                className="btn-limpar"
                                onClick={limparTodas}
                            >
                                Limpar todas
                            </button>

                        )}

                    </div>

                    <div className="notificacoes-lista">

                        {notificacoes.length > 0 ? (

                            notificacoes.map((notificacao) => (

                                <div
                                    key={notificacao.id}
                                    className={`notificacao-card ${notificacao.tipo} ${notificacao.lida ? "lida" : ""
                                        }`}
                                >

                                    <div className="notificacao-topo">

                                        <h3>
                                            {notificacao.titulo}
                                        </h3>

                                        <span>
                                            {notificacao.data}
                                        </span>

                                    </div>

                                    <p>
                                        {notificacao.mensagem}
                                    </p>

                                    <div className="notificacao-acoes">

                                        {!notificacao.lida && (

                                            <button
                                                onClick={() =>
                                                    marcarComoLida(notificacao.id)
                                                }
                                            >
                                                Marcar como lida
                                            </button>

                                        )}

                                        <button
                                            onClick={() =>
                                                excluirNotificacao(notificacao.id)
                                            }
                                        >
                                            Excluir
                                        </button>

                                    </div>

                                </div>

                            ))

                        ) : (

                            <div className="sem-notificacoes">

                                Nenhuma notificação encontrada.

                            </div>

                        )}

                    </div>

                </div>

            </div>

        </div>
    );
}