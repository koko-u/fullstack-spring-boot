package jp.co.kokou.ecommerce.config;

import jp.co.kokou.ecommerce.entities.Product;
import jp.co.kokou.ecommerce.entities.ProductCategory;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.core.mapping.ExposureConfigurer;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class RestExposureConfiguration implements RepositoryRestConfigurer {

    private final ExposureConfigurer.AggregateResourceHttpMethodsFilter onlyAllowGetMethod;

    public RestExposureConfiguration() {
        this.onlyAllowGetMethod = (metadata, httpMethods) -> httpMethods.disable(
                HttpMethod.DELETE, HttpMethod.POST, HttpMethod.PUT, HttpMethod.PATCH
        );
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        final var configuration = config.getExposureConfiguration();
        configuration.forDomainType(Product.class)
                .withItemExposure(onlyAllowGetMethod)
                .withCollectionExposure(onlyAllowGetMethod);

        configuration.forDomainType(ProductCategory.class)
                .withItemExposure(onlyAllowGetMethod)
                .withCollectionExposure(onlyAllowGetMethod);

        cors.addMapping("/api/**")
                .allowedOrigins("http://localhost:4200")
                .allowedMethods(HttpMethod.GET.name())
                .allowCredentials(false)
                .maxAge(3000);
    }
}