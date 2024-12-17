create table inventrak_web.bodegas
(
    id                             varchar(36)  not null
        primary key,
    nombre                         varchar(255) not null,
    direccion                      varchar(255) not null,
    telefono                       int          not null,
    correo_electronico             varchar(255) not null,
    gerente_de_la_bodega           varchar(255) not null,
    capacidad_de_almacenamiento_m3 int          not null
)
    collate = utf8mb4_uca1400_ai_ci;

create table inventrak_web.inventarios
(
    id             varchar(36)                           not null
        primary key,
    nombre         varchar(255)                          not null,
    fecha_creacion timestamp default current_timestamp() not null
)
    collate = utf8mb4_uca1400_ai_ci;

create table inventrak_web.productos
(
    id                 varchar(36)                           not null
        primary key,
    nombre             varchar(255)                          not null,
    codigo             varchar(100)                          not null,
    cantidad           int                                   not null,
    precio_entrada     decimal(15, 4)                        not null,
    precio_salida      decimal(15, 4)                        not null,
    descripcion        varchar(255)                          not null,
    imagen             text                                  not null,
    fecha_modificacion timestamp default current_timestamp() not null on update current_timestamp(),
    stock              tinyint(1)                            not null,
    inventario_id      varchar(36)                           not null,
    fecha_caducidad    date                                  not null,
    ventas             int       default 0                   not null,
    constraint productos_ibfk_1
        foreign key (inventario_id) references inventrak_web.inventarios (id)
)
    collate = utf8mb4_uca1400_ai_ci;

create index inventario_id
    on inventrak_web.productos (inventario_id);

create table inventrak_web.proveedores
(
    id                  varchar(36)  not null
        primary key,
    nombre              varchar(255) not null,
    direccion           varchar(255) not null,
    telefono            int          not null,
    correo_electronico  varchar(255) not null,
    persona_de_contacto varchar(255) not null
)
    collate = utf8mb4_uca1400_ai_ci;

create table inventrak_web.recordatorios
(
    id          uuid         not null
        primary key,
    nombre      varchar(255) not null,
    descripcion varchar(500) not null
);

create table inventrak_web.tiendas
(
    id               varchar(36)  not null
        primary key,
    nombre           text         not null,
    direccion        varchar(255) not null,
    encargado_tienda varchar(255) not null,
    telefono         varchar(12)  not null
)
    collate = utf8mb4_uca1400_ai_ci;

create table inventrak_web.usuarios
(
    id       varchar(36)  not null,
    nombres  varchar(255) not null,
    correo   varchar(255) not null,
    password text         not null,
    telefono varchar(255) not null
)
    collate = utf8mb4_uca1400_ai_ci;

