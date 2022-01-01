package jp.co.kokou.ecommerce.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.core.mapping.ExposureConfigurer;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.Type;
import java.util.Arrays;

@Configuration
public class RestExposureConfiguration implements RepositoryRestConfigurer {

    private final ExposureConfigurer.AggregateResourceHttpMethodsFilter onlyAllowGetMethod;

    private final EntityManager entityManager;

    @Autowired
    public RestExposureConfiguration(EntityManager entityManager) {
        this.entityManager = entityManager;
        this.onlyAllowGetMethod = (metadata, httpMethods) -> httpMethods.disable(
                HttpMethod.DELETE, HttpMethod.POST, HttpMethod.PUT, HttpMethod.PATCH
        );
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        final var entities = getEntityClasses();

        // expose id for all entities
        config.exposeIdsFor(entities);

        final var configuration = config.getExposureConfiguration();
        Arrays.stream(entities).forEach(entity -> {
            configuration.forDomainType(entity)
                    .withItemExposure(onlyAllowGetMethod)
                    .withCollectionExposure(onlyAllowGetMethod);
        });

        cors.addMapping("/api/**")
                .allowedOrigins("http://localhost:4200")
                .allowedMethods(HttpMethod.GET.name())
                .allowCredentials(false)
                .maxAge(3000);

    }

    private Class<?>[] getEntityClasses() {
        return this.entityManager
                .getMetamodel()
                .getEntities()
                .stream()
                .map(Type::getJavaType)
                .toArray(Class<?>[]::new);
    }
}