import { useState } from "react";
import "./AssistenteIA.css";

export default function AssistenteIA() {

    const [mensagem, setMensagem] = useState("");
    const [resposta, setResposta] = useState("");
    const [loading, setLoading] = useState(false);

    async function enviarMensagem() {

        if (!mensagem.trim()) return;

        try {

            setLoading(true);

            const response = await fetch(
                "/ia",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        mensagem: mensagem,
                    }),
                }
            );

            const data = await response.json();

            setResposta(data.resposta);

        } catch (erro) {

            console.log(erro);

            setResposta("Erro ao conectar com a IA.");

        } finally {

            setLoading(false);
        }
    }

    function handleKeyDown(e) {

        if (e.key === "Enter") {
            enviarMensagem();
        }
    }

    return (

        <div className="assistant-container">

            <h2>Assistente IA</h2>

            <input
                type="text"
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Digite sua dúvida"
            />

            <button
                onClick={enviarMensagem}
                disabled={loading}
            >
                {loading ? "Enviando..." : "Enviar"}
            </button>

            <div className="resposta-box">

                {resposta}

            </div>

        </div>
    );
}