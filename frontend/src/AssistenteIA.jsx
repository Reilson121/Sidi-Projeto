import { useState, useRef, useEffect } from "react";
import "./AssistenteIA.css";

export default function AssistenteIA() {

    const [mensagem, setMensagem] = useState("");

    const [historico, setHistorico] = useState([
        {
            papel: "assistente",
            texto: "Olá! Sou a assistente do VisitControl. Posso te ajudar a preencher o formulário de pré-cadastro. Como posso ajudar?"
        }
    ]);

    const [carregando, setCarregando] = useState(false);

    const [aberto, setAberto] = useState(false);

    const fimDaListaRef = useRef(null);

    useEffect(() => {

        if (fimDaListaRef.current) {
            fimDaListaRef.current.scrollIntoView({ behavior: "smooth" });
        }

    }, [historico]);

    async function enviarMensagem() {

        if (!mensagem.trim()) return;

        const novaMensagem = { papel: "usuario", texto: mensagem };

        const historicoAtualizado = [...historico, novaMensagem];

        setHistorico(historicoAtualizado);

        setMensagem("");

        setCarregando(true);

        try {

            const resposta = await fetch(
                "/ia",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        mensagem: mensagem,
                        historico: historico.map((item) => ({
                            papel: item.papel,
                            texto: item.texto
                        }))
                    }),
                }
            );

            const dados = await resposta.json();

            setHistorico((anterior) => [
                ...anterior,
                { papel: "assistente", texto: dados.resposta }
            ]);

        } catch (erro) {

            console.log(erro);

            setHistorico((anterior) => [
                ...anterior,
                { papel: "assistente", texto: "Desculpe, não consegui me conectar. Tente novamente." }
            ]);

        } finally {

            setCarregando(false);

        }
    }

    function handleKeyDown(evento) {

        if (evento.key === "Enter") {
            enviarMensagem();
        }

    }

    return (

        <>

            {/* Botão flutuante — visível apenas no mobile */}
            <button
                className="ia-botao-flutuante"
                onClick={() => setAberto(!aberto)}
                aria-label="Assistente IA"
            >
                {aberto ? "✕" : "🤖"}
            </button>

            {/* Painel do assistente */}
            <div className={`assistant-container ${aberto ? "ia-aberto" : ""}`}>

                <div className="ia-cabecalho">

                    <div className="ia-cabecalho-info">

                        <span className="ia-avatar">🤖</span>

                        <div>

                            <h2>Assistente IA</h2>

                            <span className="ia-status">Online</span>

                        </div>

                    </div>

                    <button
                        className="ia-botao-fechar"
                        onClick={() => setAberto(false)}
                        aria-label="Fechar assistente"
                    >
                        ✕
                    </button>

                </div>

                <div className="ia-mensagens">

                    {historico.map((item, indice) => (

                        <div
                            key={indice}
                            className={`ia-msg ${item.papel === "usuario" ? "ia-msg-usuario" : "ia-msg-assistente"}`}
                        >
                            {item.texto}
                        </div>

                    ))}

                    {carregando && (

                        <div className="ia-msg ia-msg-assistente ia-digitando">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>

                    )}

                    <div ref={fimDaListaRef} />

                </div>

                <div className="ia-area-input">

                    <input
                        type="text"
                        value={mensagem}
                        onChange={(e) => setMensagem(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Digite sua dúvida..."
                        disabled={carregando}
                    />

                    <button
                        onClick={enviarMensagem}
                        disabled={carregando || !mensagem.trim()}
                    >
                        ➤
                    </button>

                </div>

            </div>

        </>
    );
}