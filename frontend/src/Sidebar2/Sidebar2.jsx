import {
    House,
    Bell,
    LayoutDashboard
} from "lucide-react";

import { Link } from "react-router-dom";

import "./style/sidebar2.css";

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

                    {/* NOVO BOTÃO */}
                    <div className="sidebar-item sidebar-item-ativo">
                        <LayoutDashboard size={18} />
                        <span>{titulo}</span>
                    </div>

                </nav>

            </div>

        </aside>
    );
}