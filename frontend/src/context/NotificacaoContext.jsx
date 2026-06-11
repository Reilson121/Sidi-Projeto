import { createContext, useContext, useState } from "react";

const NotificacaoContext = createContext();

export function NotificacaoProvider({ children }) {

    const [notificacoes, setNotificacoes] = useState([
        {
            id: 1,
            titulo: "Cadastro Aprovado",
            mensagem:
                "Seu pré-cadastro REG-2024-001 foi aprovado.",
            data: "2026-04-01 10:30",
            tipo: "sucesso",
            lida: false,
        },
    ]);

    function adicionarNotificacao(notificacao) {

        setNotificacoes((prev) => [
            {
                id: Date.now(),
                lida: false,
                ...notificacao,
            },
            ...prev,
        ]);
    }

    function marcarComoLida(id) {

        setNotificacoes((prev) =>
            prev.map((n) =>
                n.id === id
                    ? { ...n, lida: true }
                    : n
            )
        );
    }

    function excluirNotificacao(id) {

        setNotificacoes((prev) =>
            prev.filter((n) => n.id !== id)
        );
    }

    function limparTodas() {
        setNotificacoes([]);
    }

    return (
        <NotificacaoContext.Provider
            value={{
                notificacoes,
                adicionarNotificacao,
                marcarComoLida,
                excluirNotificacao,
                limparTodas,
            }}
        >
            {children}
        </NotificacaoContext.Provider>
    );
}

export function useNotificacoes() {
    return useContext(NotificacaoContext);
}