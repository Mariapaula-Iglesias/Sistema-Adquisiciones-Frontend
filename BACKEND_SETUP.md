# Ejemplo de Configuración Spring Boot

Esta guía muestra qué se necesita en el backend Spring Boot para que el frontend funcione correctamente.

## Dependencias Necesarias

```xml
<!-- Spring Boot Web -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

<!-- Spring Data JPA -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>

<!-- Database -->
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.33</version>
</dependency>

<!-- Lombok (opcional) -->
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <optional>true</optional>
</dependency>
```

## Configuración CORS

```java
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
            .allowedOrigins("http://localhost:5173", "http://localhost:5174", "http://localhost:5175")
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .allowedHeaders("*")
            .allowCredentials(true)
            .maxAge(3600);
    }
}
```

## Modelo de Adquisición

```java
import javax.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.math.BigDecimal;

@Data
@Entity
@Table(name = "acquisitions")
public class Acquisition {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    
    // Información Básica
    private String rubro;
    private String nivelSubordinaRubro;
    private String nombreRubroNivel;
    private String despacho;
    private String dependencia;
    private String grupo;
    
    // Objeto del Contrato
    @Column(columnDefinition = "TEXT")
    private String objetoContrato;
    
    // Códigos UNSPSC
    @ElementCollection
    private List<String> unspscCodes;
    
    // Fechas
    private LocalDate fechaRadicacionEstudiosPrevios;
    private LocalDate fechaEstimadaInicio;
    private LocalDate fechaPlanadadFin;
    private String duracionContrato;
    
    // Modalidad y Ubicación
    private String modalidad;
    private String ciudadOrigen;
    private String requiereVigenciaFutura; // 'SI' o 'NO'
    
    // Supervisor
    private String supervisor;
    private String telefono;
    private String correoSupervisor;
    private String cargoSupervisor;
    
    // Justificación
    @Column(columnDefinition = "TEXT")
    private String justificacionNecesidad;
    
    // Recurso
    private Integer tipoRecurso;
    private String recurrente; // 'SI' o 'NO'
    
    // Valores
    private BigDecimal valorSolicitado;
    private BigDecimal valorVigenciaFutura;
    
    // Auto-calculado
    @Transient
    public BigDecimal getValorTotal() {
        return (valorSolicitado != null ? valorSolicitado : BigDecimal.ZERO)
            .add(valorVigenciaFutura != null ? valorVigenciaFutura : BigDecimal.ZERO);
    }
    
    // Confirmación
    private boolean confirmado;
    
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
```

## Controlador de Adquisiciones

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/acquisitions")
public class AcquisitionController {
    
    @Autowired
    private AcquisitionService acquisitionService;
    
    @PostMapping
    public ResponseEntity<Acquisition> create(@RequestBody Acquisition acquisition) {
        return ResponseEntity.ok(acquisitionService.save(acquisition));
    }
    
    @GetMapping
    public ResponseEntity<List<Acquisition>> list() {
        return ResponseEntity.ok(acquisitionService.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Acquisition> getById(@PathVariable String id) {
        return ResponseEntity.ok(acquisitionService.findById(id));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Acquisition> update(
        @PathVariable String id,
        @RequestBody Acquisition acquisition
    ) {
        return ResponseEntity.ok(acquisitionService.update(id, acquisition));
    }
    
    @PostMapping("/{id}/confirm")
    public ResponseEntity<Void> confirm(@PathVariable String id) {
        acquisitionService.confirm(id);
        return ResponseEntity.ok().build();
    }
}
```

## Servicio de Adquisiciones

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AcquisitionService {
    
    @Autowired
    private AcquisitionRepository acquisitionRepository;
    
    public Acquisition save(Acquisition acquisition) {
        if (acquisition.getValorTotal() == null) {
            // El total se calcula automáticamente
        }
        return acquisitionRepository.save(acquisition);
    }
    
    public List<Acquisition> findAll() {
        return acquisitionRepository.findAll();
    }
    
    public Acquisition findById(String id) {
        return acquisitionRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Adquisición no encontrada"));
    }
    
    public Acquisition update(String id, Acquisition updatedData) {
        Acquisition acquisition = findById(id);
        // Actualizar campos desde updatedData
        BeanUtils.copyProperties(updatedData, acquisition, "id", "createdAt");
        return acquisitionRepository.save(acquisition);
    }
    
    public void confirm(String id) {
        Acquisition acquisition = findById(id);
        acquisition.setConfirmado(true);
        acquisitionRepository.save(acquisition);
    }
}
```

## Repositorio

```java
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AcquisitionRepository extends JpaRepository<Acquisition, String> {
}
```

## Test desde cURL

```bash
# Crear Adquisición
curl -X POST http://localhost:8080/api/acquisitions \
  -H "Content-Type: application/json" \
  -d '{...datos de adquisición...}'

# Listar
curl -X GET http://localhost:8080/api/acquisitions

# Obtener una
curl -X GET http://localhost:8080/api/acquisitions/{id}

# Actualizar
curl -X PUT http://localhost:8080/api/acquisitions/{id} \
  -H "Content-Type: application/json" \
  -d '{...datos actualizados...}'

# Confirmar
curl -X POST http://localhost:8080/api/acquisitions/{id}/confirm
```

---

Este es un ejemplo simplificado. Adapta según tu estructura específica de Spring Boot.
