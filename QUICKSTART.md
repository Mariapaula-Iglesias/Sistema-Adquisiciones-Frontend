# Guía Rápida de Inicio

## ¿Está funcionando?

Si ves una pantalla con el **Formulario de Adquisición**, ¡la aplicación está correctamente instalada!

## Primeros Pasos

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Iniciar Servidor de Desarrollo
```bash
npm run dev
```

El servidor abrirá en `http://localhost:5173` (o el siguiente puerto disponible)

### 3. Configurar Backend
Asegúrate que tu Spring Boot esté corriendo en `http://localhost:8080` y tenga estos endpoints:

#### Adquisiciones
```
GET    /api/acquisitions              # Listar todas
GET    /api/acquisitions/{id}         # Obtener una
POST   /api/acquisitions              # Crear
PUT    /api/acquisitions/{id}         # Actualizar
POST   /api/acquisitions/{id}/confirm # Confirmar
```

## Rutas de la Aplicación

| Ruta | Descripción |
|------|-------------|
| `/form` | Formulario de adquisición |
| `/review` | Revisión de datos |
| `/success` | Confirmación exitosa |
| `/acquisitions` | Lista de solicitudes |

## Endpoints Requeridos del Backend

### Adquisiciones
```
GET    /api/acquisitions              # Listar todas
GET    /api/acquisitions/{id}         # Obtener una
POST   /api/acquisitions              # Crear
PUT    /api/acquisitions/{id}         # Actualizar
POST   /api/acquisitions/{id}/confirm # Confirmar
```

## Troubleshooting

### "Cannot GET /"
- Esto es normal en SPA, el navegador debería mostrar el formulario

### "API Error" 
- Verifica que Spring Boot esté corriendo
- Verifica que CORS esté configurado
- Mira la Network tab en DevTools

### Puerto 5173 en uso
- Vite automáticamente usa 5174, 5175, etc.
- O mata el proceso: `lsof -ti :5173 | xargs kill`

### Módulos no encontrados
```bash
rm -rf node_modules package-lock.json
npm install
```

## Comandos Útiles

```bash
npm run dev      # Desarrollo con HMR
npm run build    # Compilar para production
npm run preview  # Vista previa de build
npm install      # Instalar dependencias
```

## Estructura de Carpetas

```
PRUEBA1FRONT/
├── src/
│   ├── components/          # Componentes React
│   ├── hooks/               # Custom hooks
│   ├── services/            # API client
│   ├── styles/              # CSS files
│   ├── types/               # TypeScript types
│   ├── App.tsx              # App principal
│   ├── main.tsx             # Entry point
│   └── index.css            # Estilos globales
├── public/                  # Assets estáticos (si los hay)
├── dist/                    # Build output (generado)
├── node_modules/            # Dependencias (generado)
├── index.html               # HTML template
├── package.json             # Dependencias
├── tsconfig.json            # TypeScript config
├── vite.config.ts           # Vite config
└── README.md                # Documentación
```

## Variables de Entorno

Si necesitas usar `.env`, crea un archivo `.env` en la raíz:

```
VITE_API_BASE_URL=http://localhost:8080/api
```

Luego accede en el código:
```typescript
const apiUrl = import.meta.env.VITE_API_BASE_URL;
```

## Performance

El build de producción es minificado y optimizado:
- Bundle: ~286 KB (91 KB gzipped)
- CSS: ~10.6 KB (2.34 KB gzipped)

## Más Información

Ver [README.md](./README.md) para documentación completa.

---

**¿Necesitas ayuda?** Revisa la sección de Troubleshooting o consulta README.md
