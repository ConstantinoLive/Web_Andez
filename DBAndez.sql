--create database Web_AndezDB
--go
use Web_AndezDB
go

--Usuarios

create table Roles(
Id integer primary key identity(1,1),
NombreRol varchar(30) not null unique,
Activo bit default 1, 
);
go

create table Permisos(
Id integer primary key identity(1,1),
NombrePermiso varchar(50) not null unique,
Activo bit default 1,
);
go

create table Usuarios(
Id integer primary key identity(1,1),
Nombre varchar(40) not null,
Apellido varchar(40) not null,
Mail varchar(100) not null unique,
MailRecupero varchar(100) not null,
Pass varchar(255) not null,
IdRol integer not null references Roles(Id),
FechaAlta datetime not null default getdate(),
FechaBaja datetime, 
Activo bit default 1,

 CONSTRAINT CK_FechaBaja
        CHECK (FechaBaja >= FechaAlta),
);
go

create table RolPermisos(
IdRol integer not null references Roles(Id),
IdPermiso integer not null references Permisos(Id),
Activo bit default 1,
primary key (IdRol, IdPermiso),
);
go

create table UsuarioPermisos(
IdUsuario integer not null references Usuarios(Id),
IdPermiso integer not null references Permisos(Id),
Permitido bit default 1,
primary key (IdUsuario, IdPermiso),
);
go

--Productos

create table Colores(
Id integer primary key identity(1,1), 
CodigoColor varchar(2) not null check(CodigoColor like '[0-9][0-9]' and CodigoColor <> '00'),
NombreColor varchar(30) not null,
URLColor varchar(255) not null,
Activo bit default 1,
);
go

create table Atributos(
Id integer primary key identity(1,1),
NombreAtributos varchar(50) not null,
URLIcono varchar(255) not null,
Activo bit default 1,
);
go

create table Lineas(
IdCodigoLinea varchar(2) primary key check(IdCodigoLinea like '[0-9][0-9]' and IdCodigoLinea <> '00'),
NombreLinea varchar(50) not null,
Descripcion varchar(500), 
Activo bit default 1,
);
go

create table Catalogos(
IdCodigoLinea varchar(2) not null unique references Lineas(IdCodigoLinea),
URLPortadaCatalogo varchar(255),
URLCatalogo varchar(255),
FraseInstitucionalLinea varchar(150),
Activo bit default 1,
);
go

create table Articulos(
IdCodigoArticulo varchar(3) primary key check(IdCodigoArticulo like '[0-9][0-9][0-9]' and IdCodigoArticulo <> '000'),
NombreArticulo varchar(40) not null,
Activo bit default 1,
);
go

create table ManualesInstalacion_Repuestos_Planos(
IdCodigoLinea varchar(2) not null,
IdCodigoArticulo varchar(3) not null,
URLManual varchar(255),
URLRepuesto varchar(255),
URLPlano varchar(255),
Activo bit default 1,
primary key (IdCodigoLinea, IdCodigoArticulo),
);
go

create table TiposProducto(
Id integer primary key identity(1,1),
Tipo varchar(40) not null,
Activo bit default 1,
);
go

create table SubtiposProducto(
Id integer primary key identity(1,1),
Subtipo varchar(40) not null,
Activo bit default 1,
);
go

create table TiposSubtipos(
IdTipo integer not null references TiposProducto(Id),
IdSubtipo integer not null references SubtiposProducto(Id),
Activo bit default 1,
primary key (IdTipo, IdSubtipo),
);
go

create table Productos(
Id integer primary key identity(1,1),
IdLinea varchar(2) not null references Lineas(IdCodigoLinea),
IdArticulo varchar(3) not null references Articulos(IdCodigoArticulo),
Descripcion varchar(500),
URLImagenSinFondo varchar(255),
IdSubtipoProducto integer not null references SubtiposProducto(Id),
EsPortada bit default 0,
Activo bit default 1,
);
go

create table AtributosProductos(
IdProductos integer not null references Productos(Id),
IdAtributos integer not null references Atributos(Id),
Activo bit default 1,
primary key (IdProductos, IdAtributos),
);
go

create table ProductoColores(
IdProductos integer not null references Productos(Id),
IdColores integer not null references Colores(Id),
Activo bit default 1,
primary key (IdProductos, IdColores),
);
go

create table ImagenesAmbientaciones(
Id integer primary key identity(1,1),
IdProducto integer not null references Productos(Id),
Titulo varchar(60) not null,
URLImagen varchar(255),
Publicada bit default 0,
Activo bit default 1,
);
go

--Distribuidores

create table Paises(
Id integer primary key identity(1,1),
Pais varchar(30) not null,
Latitud decimal(9,6) not null,
Longitud decimal(9,6) not null,
Zoom tinyint not null check(Zoom>=0),
Activo bit default 1,
);
go

create table Provincias(
Id integer primary key identity(1,1),
Provincia varchar(30) not null,
IdPais integer not null references Paises(Id),
Latitud decimal(9,6) not null,
Longitud decimal(9,6) not null,
Zoom tinyint not null check(Zoom>=0),
Region varchar(30) not null,
Activo bit default 1,
);
go

create table Distribuidores(
Id integer primary key identity(1,1),
RazonSocial varchar(50) not null,
Direccion varchar(80),
IdProvincia integer references Provincias(Id),
Telefono varchar(25),
Latitud decimal(9,6),
Longitud decimal(9,6),
Zoom tinyint not null check(Zoom>=0),
Activo bit default 1,
);
go

create table PaginaDistribuidores(
IdDistribuidor integer primary key references Distribuidores(Id),
URLPaginaDistribuidor varchar(255),
URLLogoDistribuidor varchar(255),
Activo bit default 1,
);
go

--Datos de la empresa

create table Empresa(
Id tinyint primary key identity(1,1),
RazonSocial varchar(20) not null,
CUIT varchar(13) not null,
Direccion varchar(50) not null,
Localidad varchar(30) not null,
Partido varchar(30) not null,
IdProvincia integer not null references Provincias(Id),
CP varchar(4) not null,
Horario varchar(20) not null,
Activo bit default 1,
);
go

create table Telefonos(
Id tinyint primary key identity(1,1),
IdEmpresa tinyint references Empresa(Id),
Nombre varchar(20) not null,
Numero varchar(20),
Activo bit default 1,
);
go

create table Mails(
Id tinyint primary key identity(1,1),
IdEmpresa tinyint references Empresa(Id),
Nombre varchar(20) not null,
Mail varchar(40),
Activo bit default 1,
);
go

create table RedesSociales(
Id tinyint primary key identity(1,1),
IdEmpresa tinyint references Empresa(Id),
RedSocial varchar(20) not null,
URLRedSocial varchar(255),
Activo bit default 1,
);
go

--Postventa

create table FormasContacto(
Id tinyint primary key identity(1,1),
FormaContacto varchar(30) not null,
Activo bit default 1,
);
go

create table EstadosReclamo(
Id tinyint primary key identity(1,1),
Estado varchar(150) not null,
Activo bit default 1,
);
go

create table TiposRepuesto(
Id tinyint primary key identity(1,1),
TipoRepuesto varchar(30) not null,
Activo bit default 1,
);
go

create table ModosSolucion(
Id tinyint primary key identity(1,1),
ModoSolucion varchar(50) not null,
Activo bit default 1,
);
go

create table MotivosContacto(
Id tinyint primary key identity (1,1),
CodigoMotivo tinyint not null check(CodigoMotivo like '[0-9][0-9]' and CodigoMotivo <> '00'),
MotivoContacto varchar(30) not null,
Activo bit default 1,
);
go

create table ComponentesReclamo(
Id integer primary key identity(1,1),
CodigoComponente integer not null check(CodigoComponente like '[0-9][0-9][0-9][0-9]' and CodigoComponente <> '0000'),
ComponenteReclamo varchar(50) not null,
Activo bit default 1,
);
go

create table DetallesReclamo(
Id integer primary key identity(1,1),
CodigoDetalle integer not null check(CodigoDetalle like '[0-9][0-9][0-9]' and CodigoDetalle <> '000'),
DetalleReclamo varchar(150) not null,
Activo bit default 1,
);
go

create table Sectores(
Id tinyint primary key identity(1,1),
Sector varchar(30) not null,
Activo bit default 1,
);
go

create table CodigosReclamo(
Id integer primary key identity(1,1),
IdMotivoContacto tinyint not null references MotivosContacto(Id),
IdComponenteReclamo integer not null references ComponentesReclamo(Id),
IdDetalleReclamo integer not null references DetallesReclamo(Id),
CodigoReclamo varchar(12) not null,
Descripcion varchar(100) not null,
IdSector tinyint references Sectores(Id),
Activo bit default 1,
);
go

create table ClientesPostventa(
Id integer primary key identity(1,1),
NombreApellido varchar(30) not null,
Mail varchar(50) not null,
Telefono varchar(20),
DNI_CUIT varchar(13),
Direccion varchar(100),
Numeracion varchar(5),
Piso varchar(5),
DptoLote varchar(10),
Localidad varchar(50),
NombreBarrio varchar(50),
IdProvincia integer references Provincias(Id),
CP varchar(4),
Activo bit default 1,
);
go

create table DatosCompra(
Id integer primary key identity(1,1),
IdDistribuidor integer references Distribuidores(Id),
FechaCompra date check(FechaCompra<=getdate()),
Factura varchar(10),
Activo bit default 1,
);
go

create table DetalleCompra(
Id integer primary key identity(1,1),
IdDatoCompra integer references DatosCompra(Id),
IdProducto integer references Productos(Id),
);
go

create table Casos(
IdCaso integer primary key identity(5000,1),
IdCliente integer not null references ClientesPostventa(Id),
IdDetalleCompra integer references DetalleCompra(Id),
IdFormaContacto tinyint references FormasContacto(Id),
FechaContacto date not null,
Fecha1eraRespuesta date,
FechaCierre date,
IdCodigoReclamo integer references CodigosReclamo(Id),
IdEstadoReclamo tinyint references EstadosReclamo(Id),
Consulta varchar(500),
Solucion varchar(500),
FechaOT date, 
NumeroOT integer check(NumeroOT>0),
Repuesto varchar(100),
Cantidad tinyint check(Cantidad>0),
IdTipoRepuesto tinyint references TiposRepuesto(Id),
IdModoSolucion tinyint references ModosSolucion(Id),
Observaciones varchar(255),
NumTiendanube varchar(30),
NumOperacionML varchar(30),
FechaCompraTNyML date, 
MontoCompraRepuesto money check(MontoCompraRepuesto>0),
NumFacturaRepuesto varchar(30),
NumGuiaCorreo varchar(50),


CONSTRAINT CK_Casos_FechaContacto
        CHECK (FechaContacto <= CAST(GETDATE() AS date)),

    CONSTRAINT CK_Casos_Fecha1eraRespuesta
        CHECK (Fecha1eraRespuesta >= FechaContacto),

    CONSTRAINT CK_Casos_FechaCierre
        CHECK (FechaCierre IS NULL OR FechaCierre >= FechaContacto),

    CONSTRAINT CK_Casos_FechaOT
        CHECK (FechaOT IS NULL OR FechaOT <= CAST(GETDATE() AS date)),

    CONSTRAINT CK_Casos_FechaCompraTNyML
        CHECK (FechaCompraTNyML IS NULL OR FechaCompraTNyML <= CAST(GETDATE() AS date))
);
go

create table InboxPostventa(
Id integer primary key identity(1,1),
IdCaso integer not null references Casos(IdCaso),
Fecha date not null check(Fecha<=getdate()),
Remitente bit,
TextoLibre varchar(2000),
Activo bit default 1,
);
go

create table ImagenesPostventa(
Id integer primary key identity(1,1),
IdCaso integer not null references Casos(IdCaso),
Fecha date not null check(Fecha<=getdate()),
NombreArchivo varchar(100) not null,
URLImagenPostventa varchar(100) not null,
);
go

create table RegistrosPostventa(
Id integer primary key identity(1,1),
IdUsuario integer not null references Usuarios(Id),
IdCaso integer not null references Casos(IdCaso),
Fecha date not null check(Fecha<=getdate()),
Registro varchar(60) not null,
Activo bit default 1
);
go

--Edicion de texto y background

create table Paginas(
Id tinyint primary key identity(1,1),
Pagina varchar(100) not null,
);
go

create table Fuentes(
Id tinyint primary key identity(1,1),
Nombre varchar(20) not null,
Declaracion varchar(255) not null,
URLFuente varchar(255),
Activo bit default 1,
);
go

create table TiposTexto(
Id tinyint primary key identity(1,1),
Nombre varchar(20) not null,
Activo bit default 1,
);
go

create table EdicionTexto(
Id integer primary key identity(1,1),
IdTipoTexto tinyint not null references TiposTexto(Id),
IdFuente tinyint not null references Fuentes(Id) default 1,
Color varchar(20) not null default '#000000',
Tamanio tinyint not null default 12 check(Tamanio>=6),
Mayuscula bit default 0,
Contraste bit default 0,
Espaciado tinyint not null default 0 check(Espaciado>=0 and Espaciado<=30),
Activo bit default 1,
);
go

create table PaginasIndex(
Id integer primary key identity(1,1),
Posicion tinyint not null check(Posicion>0),
IdEdicionTexto integer not null references EdicionTexto(Id),
Nombre varchar(50) not null,
URLImagen varchar(255) not null,
Titulo varchar(50),
Descripcion varchar(500),
Link varchar(255),
LinkSN bit default 0,
LanzamientoSN bit default 0,
Pausa bit default 0,
Activo bit default 1,
);
go

create table EdicionBackground(
Id integer primary key identity(1,1),
URLBackground varchar(255),
ColorGradiente1 varchar(20),
ColorGradiente2 varchar(20),
ColorGradiente3 varchar(20),
ColorGradiente4 varchar(20),
Angulo decimal default 0 check(Angulo>=0 and Angulo<=360),
ColorSolido varchar(20),
Opacidad decimal default 1 check(Opacidad>=0 and Opacidad<=1),
Blur tinyint default 0 check(Blur>=0 and Blur<=30),
Brillo decimal default 100 check(Brillo>=0 and Brillo<=200),
Contraste decimal default 100 check(Contraste>=0 and Contraste<=200),
EscalaGris decimal default 0 check(EscalaGris>=0 and EscalaGris<=1),
Activo bit default 1
);
go

--Logs

create table Entidades(
Id integer primary key identity(1,1),
Descripcion varchar(50) not null,
Activo bit default 1,
);
go

create table Acciones(
Id integer primary key identity(1,1),
Descripcion varchar(50) not null,
Activo bit default 1,
);
go

create table Campos(
Id integer primary key identity(1,1),
Descripcion varchar(50) not null,
Activo bit default 1,
);
go

create table Modulos(
Id integer primary key identity(1,1),
Descripcion varchar(50) not null,
Activo bit default 1,
);
go

create table Niveles(
Id integer primary key identity(1,1),
Descripcion varchar(15) not null,
Activo bit default 1,
);
go

create table LogsSistema(
Id integer primary key identity(1,1),
Fecha datetime not null check(Fecha<=getdate()),
IdNivel integer not null references Niveles(Id),
IdModulo integer not null references Modulos(Id),
Caso varchar(50) not null,
Metodo varchar(50) not null,
Mensaje varchar(500) not null,
StackTrace varchar(255) not null,
IdUsuario integer not null references Usuarios(Id),
IdSesion varchar(50) not null,
URLdata varchar(255) not null,
CodigoRespuesta integer not null,
);
go

create table Auditoria(
Id integer primary key identity(1,1),
Fecha datetime not null check(Fecha<=getdate()),
IdUsuario integer not null references Usuarios(Id),
IdModulo integer not null references Modulos(Id),
IdEntidad integer not null references Entidades(Id),
IdAccion integer not null references Acciones(Id),
IdCampo integer not null references Campos(Id),
ValorAnterior varchar(500),
ValorNuevo varchar(500),
);
go