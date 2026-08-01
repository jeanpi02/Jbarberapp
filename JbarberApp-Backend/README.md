# JBarberApp Backend

API REST para gestión de citas de barbería construida con NestJS y TypeORM.

## Características

- **Autenticación JWT** para barberos
- **Gestión de barberos** con horarios personalizados
- **Gestión de servicios** ofrecidos
- **Sistema de reservas** con validación de disponibilidad
- **Base de datos PostgreSQL** con TypeORM
- **Documentación Swagger** interactiva

## Requisitos

- Node.js 18+
- PostgreSQL 14+
- npm o yarn

## Instalación

```bash
cd JbarberApp-Backend
npm install
```

## Configuración

Copia el archivo `.env.example` a `.env` y configura las variables:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=jbarberapp

JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=7d

PORT=3001
```

## Ejecución

```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod
```

## Documentación API

Una vez ejecutado, accede a la documentación Swagger en:
http://localhost:3001/api

## Endpoints Principales

### Autenticación
- `POST /auth/login` - Iniciar sesión
- `POST /auth/register` - Registrar nuevo barbero

### Barberos
- `GET /barbers` - Listar barberos activos
- `GET /barbers/:id` - Obtener barbero por ID
- `POST /barbers` - Crear barbero
- `PUT /barbers/:id` - Actualizar barbero
- `DELETE /barbers/:id` - Eliminar barbero (soft delete)

### Horarios
- `GET /barbers/:id/schedules` - Obtener horarios del barbero
- `POST /barbers/:id/schedules` - Crear horario
- `PUT /barbers/:id/schedules/:scheduleId` - Actualizar horario
- `DELETE /barbers/:id/schedules/:scheduleId` - Eliminar horario
- `GET /barbers/:id/availability?date=2026-07-15` - Obtener disponibilidad

### Servicios
- `GET /services` - Listar servicios activos
- `GET /services/:id` - Obtener servicio por ID
- `POST /services` - Crear servicio
- `PUT /services/:id` - Actualizar servicio
- `DELETE /services/:id` - Eliminar servicio (soft delete)

### Reservas
- `GET /bookings` - Listar todas las reservas
- `GET /bookings/:id` - Obtener reserva por ID
- `GET /bookings/barber/:barberId` - Reservas por barbero
- `GET /bookings/barber/:barberId/date?date=2026-07-15` - Reservas por fecha
- `POST /bookings` - Crear reserva (valida disponibilidad)
- `PUT /bookings/:id` - Actualizar reserva
- `PUT /bookings/:id/cancel` - Cancelar reserva
- `DELETE /bookings/:id` - Eliminar reserva

## Estructura de Base de Datos

### Tablas
- `users` - Usuarios del sistema (barberos/admin)
- `barbers` - Perfiles de barberos
- `barber_schedules` - Horarios de trabajo por día
- `services` - Servicios ofrecidos
- `bookings` - Reservas de clientes

## Flujo de Reserva

1. Cliente consulta barberos disponibles
2. Cliente selecciona barbero y servicio
3. Cliente consulta disponibilidad para una fecha
4. Sistema genera slots de tiempo basados en el horario del barbero
5. Cliente selecciona fecha y hora
6. Sistema valida que el slot esté disponible
7. Se crea la reserva con estado CONFIRMED

## Modelo de Horarios

Cada barbero puede tener múltiples horarios configurados:
- Un horario por día de la semana (Lunes a Domingo)
- Hora de inicio y fin
- Estado activo/inactivo

Ejemplo:
```json
{
  "dayOfWeek": "monday",
  "startTime": "09:00",
  "endTime": "17:00",
  "isActive": true
}
```

## Validación de Disponibilidad

Al crear una reserva, el sistema:
1. Verifica que el barbero tenga horario configurado para ese día
2. Verifica que la hora solicitada esté dentro del horario
3. Verifica que no exista otra reserva confirmada en ese slot
4. Si todo está OK, crea la reserva

## Seguridad

- Contraseñas hasheadas con bcrypt
- Autenticación JWT con tokens de 7 días
- Validación de datos con class-validator
- CORS configurado para el frontend

## Desarrollo Futuro

- [ ] App móvil para barberos (React Native / Flutter)
- [ ] Notificaciones push/email de reservas
- [ ] Sistema de calificaciones y reseñas
- [ ] Pagos integrados
- [ ] Reportes y estadísticas
- [ ] Multi-tenancy (múltiples barberías)

## Licencia

MIT
