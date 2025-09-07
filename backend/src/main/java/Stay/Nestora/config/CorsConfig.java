package Stay.Nestora.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    private  Environment environment;
    public CorsConfig(Environment env) {
        this.environment = env;
    }
    public void addCorsMappings(CorsRegistry registry) {
        String allowedOrigins = environment.getProperty("NestoraFrontEndURL");
        registry.addMapping("/**")
                .allowedOrigins(allowedOrigins)// frontend origin
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
