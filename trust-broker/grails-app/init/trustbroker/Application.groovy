package trustbroker

import grails.boot.GrailsApp
import grails.boot.config.GrailsAutoConfiguration
import org.springframework.context.annotation.Bean
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter


class Application extends GrailsAutoConfiguration {
    static void main(String[] args) {
        GrailsApp.run(Application, args)
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurerAdapter() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                //registry.addMapping("/api/login").allowedOrigins("http://localhost:9000")
                //registry.addMapping("/api/**").allowedOrigins("http://localhost:3000").maxAge(3600);
                //registry.addMapping("/**/*").allowedOrigins("*");
                registry.addMapping("/**");
            }
        };
    }
}