import "./Administrador.css";
import Sidebar2 from "../Sidebar2/Sidebar2"

export default function DashboardAdmin() {
    return (
        <div className="admin-container">
            {/* Sidebar */}
            <aside className="sidebar">
                <Sidebar2
                    titulo="Dashboard Administrador"
                />
                <div className="logo">VisitControl</div>

                <nav className="menu">
                    <a href="#">Início</a>
                    <a href="#" className="active">
                        Dashboard Administrativo
                    </a>
                </nav>

                <button className="logout">Sair</button>
            </aside>

            {/* Conteúdo */}
            <main className="content">
                <div className="top-header">
                    <div>
                        <h1>Dashboard Administrativo</h1>
                        <p>Controle completo do sistema</p>
                    </div>

                    <div className="header-buttons">
                        <button className="btn-outline">Exportar Dados</button>
                        <button className="btn-primary">+ Novo Usuário</button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="tabs">
                    <button className="tab active">Visão Geral</button>
                    <button className="tab">Usuários</button>
                    <button className="tab">Relatórios</button>
                </div>

                {/* Cards */}
                <div className="cards">
                    <div className="card">
                        <span className="icon blue">📄</span>
                        <h4>Total de Cadastros</h4>
                        <h2>219</h2>
                        <p className="success">+12% este mês</p>
                    </div>

                    <div className="card">
                        <span className="icon green">👥</span>
                        <h4>Visitantes Hoje</h4>
                        <h2>18</h2>
                        <p className="success">+3 desde ontem</p>
                    </div>

                    <div className="card">
                        <span className="icon yellow">⚡</span>
                        <h4>Pendentes</h4>
                        <h2>23</h2>
                        <p>Aguardando aprovação</p>
                    </div>

                    <div className="card">
                        <span className="icon purple">📊</span>
                        <h4>Taxa de Aprovação</h4>
                        <h2>91%</h2>
                        <p className="success">+2% este mês</p>
                    </div>
                </div>

                {/* Gráficos */}
                <div className="charts-row">
                    <div className="chart-box">
                        <h3>Cadastros Mensais</h3>

                        <div className="line-chart">
                            <div className="line"></div>
                        </div>
                    </div>

                    <div className="chart-box">
                        <h3>Status dos Cadastros</h3>

                        <div className="pie-chart-container">
                            <div className="pie-chart"></div>

                            <div className="legend">
                                <p className="approved">Aprovados: 81%</p>
                                <p className="pending">Pendentes: 11%</p>
                                <p className="rejected">Recusados: 8%</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Barras */}
                <div className="bar-chart-box">
                    <h3>Tipos de Visitantes</h3>

                    <div className="bars">
                        <div className="bar-group">
                            <div className="bar large"></div>
                            <span>Visitantes</span>
                        </div>

                        <div className="bar-group">
                            <div className="bar medium"></div>
                            <span>Fornecedores</span>
                        </div>

                        <div className="bar-group">
                            <div className="bar small"></div>
                            <span>Prestadores</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}