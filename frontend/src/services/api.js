import axios from "axios";

// Em produção (Render), o frontend é servido pelo próprio Spring Boot,
// então as chamadas de API são relativas à mesma origem.
// Em desenvolvimento local, usa o proxy configurado no vite.config.js
// (ou o endereço do backend diretamente).
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "",
    headers: {
        "Content-Type": "application/json"
    }
});

export default api;