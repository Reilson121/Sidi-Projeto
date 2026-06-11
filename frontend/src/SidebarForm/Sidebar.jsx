import {
    House,
    Bell,
    User
} from "lucide-react";

import { Link } from "react-router-dom";

import "./style/sidebar.css";

export default function Sidebar({
    titulo,
    mostrarNotificacoes = false,
}) {

    return (
        <aside className="sidebar">

            <div className="sidebar-topo">

                <h2 className="logo">
                    VisitControl
                </h2>

                <nav className="sidebar-menu">

                    <Link
                        to="/"
                        className="sidebar-item"
                    >
                        <House size={18} />
                        <span>Início</span>
                    </Link>

                    <Link
                        to="/Recepcao"
                        className="sidebar-item"
                    >
                        <User size={18} />
                        <span>Dashboard da Recepção </span>
                    </Link>

                    {mostrarNotificacoes && (
                        <Link
                            to="/Notificacoes"
                            className="sidebar-item"
                        >
                            <Bell size={18} />
                            <span>Notificações</span>
                        </Link>
                    )}

                </nav>

            </div>



        </aside>
    );
}