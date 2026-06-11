import { useState, useEffect } from "react";
import TabelaSolicitacao from "./TabelaSolicitacao";
import "./styles/Colaborador.css";
import Sidebar2 from "../Sidebar2/Sidebar2";
import { useNotificacoes } from "../context/NotificacaoContext";
import { visitanteService } from "../services/visitanteService";

export default function Colaborador() {
    const { adicionarNotificacao } = useNotificacoes();

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);

    const [selectedRequest, setSelectedRequest] = useState(null);
    const [showApproveModal, setShowApproveModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [rejectReason, setRejectReason] = useState("");

    // 🔄 CARREGAR DO BACKEND
    useEffect(() => {
        carregarPendentes();
    }, []);

    async function carregarPendentes() {
        try {
            setLoading(true);
            setErro(null);
            
            const dados = await visitanteService.listarPendentes();
            console.log("Pendentes carregados:", dados);

            const formatados = dados.map((v) => ({
                id: v.id,
                code: `REG-${new Date().getFullYear()}-${String(v.id).padStart(3, '0')}`,
                name: v.nome,
                email: v.email,
                company: v.empresa || "N/A",
                date: v.data || "N/A",
                time: v.horario || "N/A",
                type: formatarTipo(v.tipoVisitante),
                status: formatarStatus(v.status)
            }));

            setRequests(formatados);
        } catch (err) {
            console.error("Erro ao carregar pendentes:", err);
            setErro("Erro ao carregar solicitações do servidor");
        } finally {
            setLoading(false);
        }
    }

    function formatarTipo(tipo) {
        const mapa = {
            "ENTREVISTA": "Entrevista",
            "FORNECEDOR": "Fornecedor",
            "PRESTADOR_SERVICO": "Prestador",
            "VISITANTE": "Visitante"
        };
        return mapa[tipo] || tipo || "N/A";
    }

    function formatarStatus(status) {
        const mapa = {
            "PENDENTE": "Pendente",
            "APROVADO": "Confirmado",
            "RECUSADO": "Recusado",
            "CANCELADO": "Cancelado"
        };
        return mapa[status] || status || "N/A";
    }

    function handleApproveClick(request) {
        setSelectedRequest(request);
        setShowApproveModal(true);
    }

    function handleRejectClick(request) {
        setSelectedRequest(request);
        setShowRejectModal(true);
    }

    // ✅ APROVAR NO BACKEND
    async function confirmApprove() {
        try {
            console.log("Aprovando:", selectedRequest.id);
            
            await visitanteService.atualizarStatus(selectedRequest.id, "APROVADO");

            adicionarNotificacao({
                titulo: "Cadastro Aprovado",
                mensagem: `${selectedRequest.name} foi aprovado com sucesso.`,
                data: new Date().toLocaleString(),
                tipo: "sucesso"
            });

            setShowApproveModal(false);
            carregarPendentes(); // Recarregar lista
        } catch (err) {
            console.error("Erro ao aprovar:", err);
            alert("Erro ao aprovar. Tente novamente.");
        }
    }

    // ❌ RECUSAR NO BACKEND
    async function confirmReject() {
        try {
            console.log("Recusando:", selectedRequest.id, "Motivo:", rejectReason);
            
            await visitanteService.atualizarStatus(selectedRequest.id, "RECUSADO");

            adicionarNotificacao({
                titulo: "Cadastro Recusado",
                mensagem: `${selectedRequest.name} foi recusado. Motivo: ${rejectReason || "Não informado"}`,
                data: new Date().toLocaleString(),
                tipo: "alerta"
            });

            setShowRejectModal(false);
            setRejectReason("");
            carregarPendentes(); // Recarregar lista
        } catch (err) {
            console.error("Erro ao recusar:", err);
            alert("Erro ao recusar. Tente novamente.");
        }
    }

    if (loading) {
        return (
            <div className="colaborador-container">
                <div className="layout">
                    <Sidebar2 titulo="Painel do Colaborador" />
                    <div className="conteudo-pagina">
                        <p>Carregando solicitações...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (erro) {
        return (
            <div className="colaborador-container">
                <div className="layout">
                    <Sidebar2 titulo="Painel do Colaborador" />
                    <div className="conteudo-pagina">
                        <p style={{ color: "red" }}>{erro}</p>
                        <button onClick={carregarPendentes}>Tentar novamente</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="colaborador-container">
            <div className="layout">
                <Sidebar2 titulo="Painel do Colaborador" />

                <div className="conteudo-pagina">
                    <div className="colaborador-container">
                        <div className="colaborador-header">
                            <h2>Painel do Colaborador</h2>
                            <p>Gerencie os cadastros vinculados ao seu nome</p>
                        </div>

                        <div className="alert-box">
                            <h4>Você tem {requests.length} cadastros pendentes de aprovação</h4>
                            <p>Revise e aprove os cadastros para liberar o acesso dos visitantes</p>
                        </div>

                        <div className="table-container">
                            <TabelaSolicitacao
                                requests={requests}
                                onApprove={handleApproveClick}
                                onReject={handleRejectClick}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL APROVAÇÃO */}
            {showApproveModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Confirmar Aprovação</h3>
                        <p>
                            Você está prestes a aprovar o cadastro de{" "}
                            <strong>{selectedRequest?.name}</strong> para visita no dia{" "}
                            <strong>{selectedRequest?.date}</strong> às{" "}
                            <strong>{selectedRequest?.time}</strong>.
                        </p>
                        <div className="modal-actions">
                            <button className="btn-cancel" onClick={() => setShowApproveModal(false)}>
                                Cancelar
                            </button>
                            <button className="btn-confirm" onClick={confirmApprove}>
                                Confirmar Aprovação
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL RECUSA */}
            {showRejectModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Recusar Cadastro</h3>
                        <p>
                            Informe o motivo da recusa do cadastro de{" "}
                            <strong>{selectedRequest?.name}</strong>
                        </p>
                        <textarea
                            placeholder="Digite o motivo da recusa..."
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                        />
                        <div className="modal-actions">
                            <button className="btn-cancel" onClick={() => setShowRejectModal(false)}>
                                Cancelar
                            </button>
                            <button className="btn-reject-modal" onClick={confirmReject}>
                                Confirmar Recusa
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}