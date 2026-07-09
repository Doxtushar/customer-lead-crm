package com.crm.customerleadcrm.config;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customerLeadCRMOpenAPI() {

        return new OpenAPI()

                .info(new Info()

                        .title("Customer Lead CRM API")

                        .description("REST APIs for Customer Lead CRM System")

                        .version("1.0.0")

                        .contact(new Contact()

                                .name("Tushar Ranjan Muduli")

                                .email("your-email@example.com"))

                        .license(new License()

                                .name("MIT License")))

                .externalDocs(new ExternalDocumentation()

                        .description("API Documentation"));
    }
}