import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Stepper from "../components/Stepper";
import "./styles/formulario.css";
import "./styles/stepper.css";
import Sidebar2 from "../Sidebar2/Sidebar2";
import AssistenteIA from "../AssistenteIA";

export default function DadosPessoais() {
    const navigate = useNavigate();

    const [dadosPessoais, setDadosPessoais] = useState({
        nome: "",
        email: "",
        empresa: "",
        cpf: "",
        telefone: ""
    });

    const [erros, setErro] = useState({
        nome: "",
        email: "",
        empresa: "",
        cpf: "",
        telefone: ""
    });

    function alterarValor(evento) {
        const nomeCampo = evento.target.name;
        let valor = evento.target.value;

        // Se for CPF, remove tudo que não for número
        if (nomeCampo === "cpf") {
            valor = valor.replace(/\D/g, ""); // Remove caracteres não numéricos
            if (valor.length > 11) {
                valor = valor.slice(0, 11); // Limita a 11 dígitos
            }
        }

        if (nomeCampo === "telefone") {

            // remove tudo que não for número
            valor = valor.replace(/\D/g, "");

            // limita a 11 números
            valor = valor.slice(0, 11);

            // aplica máscara
            valor = valor.replace(
                /^(\d{2})(\d{5})(\d{0,4})$/,
                "($1) $2-$3"
            );

            // remove traço sobrando
            valor = valor.replace(/-$/, "");
        }

        setDadosPessoais({
            ...dadosPessoais,
            [nomeCampo]: valor
        });

        setErro({
            ...erros,
            [nomeCampo]: ""
        });
    }

    async function enviarFormulario(evento) {
        evento.preventDefault();

        let novosErros = {
            nome: "",
            email: "",
            empresa: "",
            cpf: "",
            telefone: ""
        };

        if (!dadosPessoais.nome) novosErros.nome = "Nome é obrigatório";
        if (!dadosPessoais.email) novosErros.email = "Email é obrigatório";
        if (!dadosPessoais.empresa) novosErros.empresa = "Empresa é obrigatória";


        if (!dadosPessoais.telefone) {
            novosErros.telefone = "Telefone é obrigatório";
        } else if (!/^\(\d{2}\)\s\d{5}-\d{4}$/.test(dadosPessoais.telefone)) {
            novosErros.telefone = "Telefone inválido";
        }

        // Validação específica do CPF
        if (!dadosPessoais.cpf) {
            novosErros.cpf = "CPF é obrigatório";
        } else if (!/^\d{11}$/.test(dadosPessoais.cpf)) {
            novosErros.cpf = "CPF deve conter exatamente 11 números";
        }

        setErro(novosErros);

        if (
            novosErros.nome ||
            novosErros.email ||
            novosErros.empresa ||
            novosErros.cpf ||
            novosErros.telefone
        ) {
            return;
        }

        try {
            localStorage.setItem("dadosPessoais", JSON.stringify(dadosPessoais));
            navigate("/DadosVisita");
        } catch (erro) {
            console.error("Erro ao salvar usuário:", erro);
        }

        setDadosPessoais({
            nome: "",
            email: "",
            empresa: "",
            cpf: "",
            telefone: ""
        });
    }

    return (
        <div className="form-page">

            <div className="layout">
                <Sidebar2
                    titulo="Dados Pessoais"
                />

                <div className="conteudo-pagina">

                    <div className="formulario-container">


                        <Stepper etapaAtual={1} />

                        <div className="form-header">
                            <h3 className="form-title">Dados Pessoais</h3>
                            <p className="form-subtitle">Preencha suas informações</p>
                        </div>



                        <form onSubmit={enviarFormulario} className="form-container">

                            <input
                                className="form-input"
                                name="nome"
                                type="text"
                                value={dadosPessoais.nome}
                                onChange={alterarValor}
                                placeholder="Digite seu nome"
                            />
                            {erros.nome && <p className="form-error">{erros.nome}</p>}

                            <input
                                className="form-input"
                                name="cpf"
                                type="text"
                                value={dadosPessoais.cpf}
                                onChange={alterarValor}
                                placeholder="Digite seu CPF (apenas números)"
                                maxLength={11}
                                inputMode="numeric"
                            />
                            {erros.cpf && <p className="form-error">{erros.cpf}</p>}

                            <input
                                className="form-input"
                                name="telefone"
                                type="text"
                                value={dadosPessoais.telefone}
                                onChange={alterarValor}
                                placeholder="(81) 96633-8816"
                                maxLength={15}
                                inputMode="numeric"
                            />
                            {erros.telefone && <p className="form-error">{erros.telefone}</p>}

                            <input
                                className="form-input"
                                name="email"
                                type="email"
                                value={dadosPessoais.email}
                                onChange={alterarValor}
                                placeholder="Digite seu email"
                            />
                            {erros.email && <p className="form-error">{erros.email}</p>}

                            <input
                                className="form-input"
                                name="empresa"
                                type="text"
                                value={dadosPessoais.empresa}
                                onChange={alterarValor}
                                placeholder="Digite o nome da empresa"
                            />
                            {erros.empresa && <p className="form-error">{erros.empresa}</p>}

                            <div className="form-buttons">
                                <Link to={"/ApresentacaoAssistente"}>
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