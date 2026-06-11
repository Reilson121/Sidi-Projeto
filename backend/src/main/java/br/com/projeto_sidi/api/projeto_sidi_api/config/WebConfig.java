package br.com.projeto_sidi.api.projeto_sidi_api.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    // Defina a variável FRONTEND_URL no Render com a URL do seu serviço,
    // ex: https://sidi-projeto.onrender.com
    // Em desenvolvimento, o padrão localhost:5173 continua funcionando.
    @Value("${FRONTEND_URL:http://localhost:5173}")
    private String frontendUrl;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins(frontendUrl)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*");
    }

    /**
     * Serve os arquivos estáticos do React (gerados por `npm run build`)
     * copiados para src/main/resources/static pelo vite.config.js.
     *
     * O Spring Boot já faz isso automaticamente para /static,
     * mas este handler garante que o React Router funcione:
     * qualquer rota não reconhecida pelo Spring devolve o index.html
     * para que o react-router-dom assuma o controle no cliente.
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Arquivos estáticos normais (JS, CSS, imagens, etc.)
        registry.addResourceHandler("/assets/**")
                .addResourceLocations("classpath:/static/assets/");

        // Fallback: qualquer outra rota que não seja /api/** devolve o index.html
        // Isso é essencial para o react-router-dom funcionar em produção.
        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/static/")
                .resourceChain(true);
    }
}