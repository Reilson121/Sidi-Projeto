import api from "./api";

export const visitanteService = {
    // Cadastrar novo visitante
    cadastrar: async (dados) => {
        const response = await api.post("/api/visitantes", dados);
        return response.data;
    },

    // Listar todos os visitantes
    listarTodos: async () => {
        const response = await api.get("/api/visitantes");
        return response.data;
    },

    // Buscar visitante por ID
    buscarPorId: async (id) => {
        const response = await api.get(`/api/visitantes/${id}`);
        return response.data;
    },

    // Listar visitantes pendentes
    listarPendentes: async () => {
        const response = await api.get("/api/visitantes/pendentes");
        return response.data;
    },

    // Listar visitantes por setor
    listarPorSetor: async (setor) => {
        const response = await api.get(`/api/visitantes/setor/${setor}`);
        return response.data;
    },

    // Atualizar status do visitante
    atualizarStatus: async (id, status) => {
        const response = await api.put(`/api/visitantes/${id}/status`, { status });
        return response.data;
    },

    // Deletar visitante
    deletar: async (id) => {
        await api.delete(`/api/visitantes/${id}`);
    },

     listarAprovados: async () => {
        const response = await api.get("/api/visitantes");
        // Filtra apenas os que não estão PENDENTE, RECUSADO ou FINALIZADO
        return response.data.filter(v => 
            v.status === "AGUARDANDO" || 
            v.status === "ATRASADO" || 
            v.status === "PRESENTE" ||
            v.status === "APROVADO"
        );
    }
};