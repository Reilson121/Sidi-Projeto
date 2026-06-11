import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Stepper from "../components/Stepper";
import "./styles/formulario.css";
import "./styles/stepper.css";
import Sidebar2 from "../Sidebar2/Sidebar2"
import AssistenteIA from "../AssistenteIA";

export default function InformacoesAdicionais() {

    const navigate = useNavigate();

    const [informacoesAdicionais, setInformacoesAdicionais] = useState({
        tipoVisitante: "",
        placaVeiculo: "",
        observacao: ""
    });

    const [erros, setErro] = useState({
        tipoVisitante: "",
        placaVeiculo: "",
        observacao: ""
    });

    function alterarValor(evento) {
        const nomeCampo = evento.target.name;
        const valor = evento.target.value;

        setInformacoesAdicionais({
            ...informacoesAdicionais,
            [nomeCampo]: valor
        });

        setErro({
            ...erros,
            [nomeCampo]: ""
        });
    }

    function enviarFormulario(evento) {

        evento.preventDefault();

        let novosErros = {
            tipoVisitante: "",
            placaVeiculo: "",
            observacao: ""
        };

        if (!informacoesAdicionais.tipoVisitante) {

            novosErros.tipoVisitante =
                "Tipo de visitante é obrigatório";
        }

        setErro(novosErros);

        if (novosErros.tipoVisitante) {
            return;
        }

        localStorage.setItem(
            "informacoesAdicionais",
            JSON.stringify(informacoesAdicionais)
        );

        navigate("/Revisao");

        setInformacoesAdicionais({
            tipoVisitante: "",
            placaVeiculo: "",
            observacao: ""
        });
    }

    return (
        <div className="form-page">


            <div className="layout">


                <Sidebar2
                    titulo="Dados Visita"
                />
                <div className="conteudo-pagina">

                    <div className="formulario-container">

                        <Stepper etapaAtual={3} />

                        <div className="form-header">
                            <h3 className="form-title">Informações Adicionais</h3>
                            <p className="form-subtitle">Complete com dados complementares</p>
                        </div>



                        <form onSubmit={enviarFormulario} className="form-container">

                            <select
                                className="form-input"
                                name="tipoVisitante"
                                value={informacoesAdicionais.tipoVisitante}
                                onChange={alterarValor}
                            >
                                <option value="">Selecione o tipo</option>
                                <option value="visitante">Visitante</option>
                                <option value="fornecedor">Fornecedor</option>
                                <option value="prestador_servico">Prestador de serviço</option>
                                <option value="entrevista">Entrevista</option>
                            </select>

                            {erros.tipoVisitante && (
                                <p className="form-error">{erros.tipoVisitante}</p>
                            )}

                            <input
                                className="form-input"
                                type="text"
                                name="placaVeiculo"
                                value={informacoesAdicionais.placaVeiculo}
                                onChange={alterarValor}
                                placeholder="ABC-1234"
                            />

                            {erros.placaVeiculo && (
                                <p className="form-error">{erros.placaVeiculo}</p>
                            )}

                            <input
                                className="form-input"
                                type="text"
                                name="observacao"
                                value={informacoesAdicionais.observacao}
                                onChange={alterarValor}
                                placeholder="Ex: necessidades especiais, materiais que trará"
                            />

                            {erros.observacao && (
                                <p className="form-error">{erros.observacao}</p>
                            )}

                            <div className="form-buttons">

                                <Link to={"/DadosVisita"}>
                                    <button
                                        type="button"
                                        className="form-button form-button-secondary"
                                    >
                                        Anterior
                                    </button>
                                </Link>

                                <button
                                    type="submit"
                                    className="form-button form-button-primary"
                                >
                                    Próximo
                                </button>

                            </div>
                        </form>
                    </div>
                    <AssistenteIA />

                </div>

            </div>
        </div>
    );




}