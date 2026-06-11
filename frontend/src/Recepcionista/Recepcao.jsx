import { useState, useEffect } from "react";
import DashboardCards from "./DashboardCards";
import CheckinRapido from "./CheckinRapido";
import TabelaVisitantes from "./TabelaVisitantes";
import { visitanteService } from "../services/visitanteService";
import "./style/recepcao.css";
import Sidebar from "../SidebarForm/Sidebar";

export default function Recepcao() {
    const [visitantes, setVisitantes] = useState([]);
    const [busca, setBusca] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        carregarVisitantes();
        const intervalo = setInterval(verificarAtrasos, 30000);
        return () => clearInterval(intervalo);
    }, []);

    // Converter status do backend para o formato da tabela
    function converterStatus(statusBackend, data, hora) {
        // Se está APROVADO ou AGUARDANDO, verifica se está atrasado
        if (statusBackend === "APROVADO" || statusBackend === "AGUARDANDO") {
            if (data && hora) {
                const dataHoraVisita = new Date(`${data}T${hora}`);
                const agora = new Date();
                if (agora > dataHoraVisita) {
                    return "atrasado";
                }
            }
            return "aguardando";
        }
        
        // Mapeamento direto
        const mapa = {
            "PRESENTE": "presente",
            "FINALIZADO": "finalizado",
            "CANCELADO": "cancelado",
            "RECUSADO": "recusado"
        };
        
        return mapa[statusBackend] || "aguardando";
    }

    async function carregarVisitantes() {
        try {
            setLoading(true);
            const dados = await visitanteService.listarAprovados();
            console.log("Dados recebidos:", dados);

            const formatados = dados.map((v) => ({
                id: v.id,
                codigo: `REG-${new Date().getFullYear()}-${String(v.id).padStart(3, '0')}`,
                visitante: v.nome || "N/A",
                cpf: v.cpf || "N/A",
                empresa: v.empresa || "N/A",
                horario: `${v.data || "N/A"} ${v.horario || ""}`,
                contato: v.quemConvidou || "N/A",
                status: converterStatus(v.status, v.data, v.horario),
                data: v.data,
                hora: v.horario
            }));

            console.log("Formatados:", formatados);
            setVisitantes(formatados);
        } catch (err) {
            console.error("Erro ao carregar visitantes:", err);
        } finally {
            setLoading(false);
        }
    }

    // Verificar atrasos periodicamente
    function verificarAtrasos() {
        setVisitantes(prev => prev.map(v => {
            if (v.status === "aguardando" && v.data && v.hora) {
                const dataHoraVisita = new Date(`${v.data}T${v.hora}`);
                const agora = new Date();
                if (agora > dataHoraVisita) {
                    return { ...v, status: "atrasado" };
                }
            }
            return v;
        }));
    }

    async function atualizarStatus(id) {
        const visitante = visitantes.find(v => v.id === id);
        if (!visitante) return;

        console.log("Visitante encontrado:", visitante);
        console.log("Status atual:", visitante.status);

        let novoStatus;

        if (visitante.status === "aguardando" || visitante.status === "atrasado") {
            novoStatus = "PRESENTE";
        } else if (visitante.status === "presente") {
            novoStatus = "FINALIZADO";
        } else {
            console.log("Status não permite ação:", visitante.status);
            return;
        }

        console.log("Enviando para backend:", { id, novoStatus });

        try {
            await visitanteService.atualizarStatus(id, novoStatus);
            
            // Atualiza localmente
            setVisitantes(prev => prev.map(v => 
                v.id === id 
                    ? { ...v, status: novoStatus === "PRESENTE" ? "presente" : "finalizado" } 
                    : v
            ));
        } catch (err) {
            console.error("Erro ao atualizar:", err);
            alert("Erro ao atualizar status");
        }
    }

    const visitantesFiltrados = visitantes.filter((v) => {
        const texto = busca.toLowerCase();
        return (
            v.visitante.toLowerCase().includes(texto) ||
            v.cpf.toLowerCase().includes(texto) ||
            v.codigo.toLowerCase().includes(texto) ||
            v.empresa.toLowerCase().includes(texto)
        );
    });

    const existeAtrasado = visitantes.some((v) => v.status === "atrasado");

    if (loading) {
        return (
            <div className="layout">
                <Sidebar titulo="Dashboard da Recepção" mostrarNotificacoes={true} />
                <div className="conteudo-pagina">
                    <p>Carregando visitantes...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="layout">
            <Sidebar titulo="Dashboard da Recepção" mostrarNotificacoes={true} />
            <div className="conteudo-pagina">
                <div className="recepcao-container">
                    <div className="recepcao-header">
                        <h1>Dashboard da Recepção</h1>
                        <p>Gerencie a entrada e saída de visitantes em tempo real</p>
                    </div>

                    {existeAtrasado && (
                        <div className="alerta-atraso">
                            ⚠️ Há visitantes com atraso. Verifique os detalhes.
                        </div>
                    )}

                    <DashboardCards visitantes={visitantesFiltrados} />
                    <CheckinRapido busca={busca} setBusca={setBusca} />
                    <TabelaVisitantes
                        visitantes={visitantesFiltrados}
                        atualizarStatus={atualizarStatus}
                    />
                </div>
            </div>
        </div>
    );
}