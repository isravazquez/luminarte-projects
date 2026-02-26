# LuminArte Projects

Plataforma de propuestas y previews para clientes de LuminArte.

Este proyecto en Astro renderiza páginas privadas de propuesta (`/preview/[slug]`) conectadas al CMS (Strapi), con soporte para:

- modelo 3D (`model`)
- imágenes (`images`)
- videos (`videos`)
- descripción (`description`)

## Uso

Desde la raíz `luminarte-web`:

```bash
npm --prefix luminarte-projects run dev
npm --prefix luminarte-projects run build
```

## Variables de entorno

Crear `.env` en `luminarte-projects` con:

```bash
CMS_URL=https://tu-cms.com
CMS_TOKEN=tu_token_opcional
```

Notas:

- `CMS_TOKEN` es opcional si el endpoint es público.
- `CMS_URL` es requerido.

## Rutas principales

- `/` página de apoyo (contacto + contexto de uso)
- `/preview/[slug]` propuesta privada para cliente
- `/404` página de error personalizada

## Contenido esperado desde CMS (`projects`)

- `slug` texto único
- `name` texto
- `description` texto
- `model` media (GLB)
- `images` media (idealmente múltiple)
- `videos` media (idealmente múltiple)

## Comportamiento de la propuesta

- `noindex` y `X-Robots-Tag` para evitar indexación
- metadata Open Graph/Twitter para compartir mejor por WhatsApp/Slack
- galería fullscreen con imágenes y videos
- control mobile para evitar conflicto entre scroll y giro del modelo 3D

## Mantenimiento útil

- `public/vendor/model-viewer.min.js` se sirve localmente
- script disponible:

```bash
npm --prefix luminarte-projects run sync:model-viewer
```
