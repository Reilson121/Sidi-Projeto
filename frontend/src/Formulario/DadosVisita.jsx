import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Stepper from "../components/Stepper";
import "./styles/formulario.css";
import "./styles/stepper.css";
import Sidebar2 from "../Sidebar2/Sidebar2"
import AssistenteIA from "../AssistenteIA";


export default function DadosVisita() {
    const navigate = useNavigate();

    const [dados, setDados] = useState({
        quemConvidou: "",
        setor: "",
        qntdVisitantes: 0,
        data: "",
        horario: "",
    });

    const [erro, setErro] = useState({
        quemConvidou: "",
        setor: "",
        qntdVisitantes: "",
        data: "",
        horario: "",
    });

    function alterarDados(evento) {
        const nomeCampo = evento.target.name;
        let valor = evento.target.value;

        if (nomeCampo === "qntdVisitantes") {
            valor = Number(valor);
        }

        setDados({
            ...dados,
            [nomeCampo]: valor
        });

        setErro({
            ...erro,
            [nomeCampo]: ""
        });
    }

    function enviarFormulario(evento) {
        evento.preventDefault();

        let novosErros = {
            quemConvidou: "",
            setor: "",
            qntdVisitantes: "",
            data: "",
            horario: "",
        };

        if (!dados.quemConvidou) novosErros.quemConvidou = "Esse campo é obrigatório";
        if (!dados.setor) novosErros.setor = "Esse campo é obrigatório";
        if (!dados.qntdVisitantes || dados.qntdVisitantes <= 0)
            novosErros.qntdVisitantes = "Esse campo é obrigatório";
        if (!dados.data) novosErros.data = "Esse campo é obrigatório";
        if (!dados.horario) novosErros.horario = "Esse campo é obrigatório";

        setErro(novosErros);

        if (
            novosErros.quemConvidou ||
            novosErros.setor ||
            novosErros.qntdVisitantes ||
            novosErros.data ||
            novosErros.horario
        ) {
            return;
        }

        localStorage.setItem("dadosVisita", JSON.stringify(dados));
        navigate("/InformacoesAdicionais");

        setDados({
            quemConvidou: "",
            setor: "",
            qntdVisitantes: 0,
            data: "",
            horario: "",
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

                        <Stepper etapaAtual={2} />

                        <div className="form-header">
                            <h3 className="form-title">Dados da Visita</h3>
                            <p className="form-subtitle">Preencha as informações da visita</p>
                        </div>



                        <form onSubmit={enviarFormulario} className="form-container">

                            <input
                                className="form-input"
                                type="text"
                                name="quemConvidou"
                                value={dados.quemConvidou}
                                onChange={alterarDados}
                                placeholder="Nome do colaborador"
                            />
                            {erro.quemConvidou && (
                                <p className="form-error">{erro.quemConvidou}</p>
                            )}

                            <select
                                className="form-input"
                                name="setor"
                                value={dados.setor}
                                onChange={alterarDados}
                            >
                                <option value="">Selecione o setor</option>
                                <option value="TI">TI</option>
                                <option value="RECURSOS_HUMANOS">Recursos Humanos</option>
                                <option value="FINANCEIRO">Financeiro</option>
                                <option value="COMERCIAL">Comercial</option>
                                <option value="OPERACOES">Operações</option>
                                <option value="DIRETORIA">Diretoria</option>
                            </select>

                            <input
                                className="form-input"
                                type="number"
                                name="qntdVisitantes"
                                value={dados.qntdVisitantes}
                                onChange={alterarDados}
                                placeholder="Quantidade de visitantes"
                                min="1"
                            />
                            {erro.qntdVisitantes && (
                                <p className="form-error">{erro.qntdVisitantes}</p>
                            )}

                            <input
                                className="form-input"
                                type="date"
                                name="data"
                                value={dados.data}
                                onChange={alterarDados}
                            />
                            {erro.data && (
                                <p className="form-error">{erro.data}</p>
                            )}

                            <input
                                className="form-input"
                                type="time"
                                name="horario"
                                value={dados.horario}
                                onChange={alterarDados}
                            />
                            {erro.horario && (
                                <p className="form-error">{erro.horario}</p>
                            )}

                            <div className="form-buttons">

                                <Link to={"/Formulario"}>
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