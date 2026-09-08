## 🌍 Otros Idiomas

- [English](README.md)

# 📦 Plantillas de Proyectos .NET

Plantillas personalizadas de .NET para aplicaciones de **El Catador** y **Bona** usando una arquitectura Híbrida entre Onion y Clean Architecture, preconfiguradas con paquetes NuGet, diseños y entornos.

---

## 🚀 Inicio Rápido (Español)

### ✅ Requisitos Previos

- [.NET 6 SDK](https://dotnet.microsoft.com/download)
- PowerShell 5+
- Token de Acceso Personal (PAT) de Azure DevOps con permiso `Packaging > Read`

---

### ⚙️ Paso 1: Clona el Repositorio

```bash
git clone https://dev.azure.com/{ORG}/DotNetTemplates/_git/DotNetTemplates
cd DotNetTemplates
```

### 🔑 Paso 2: Generar un Token de Acceso Personal (PAT)

Necesitas un PAT (Token de Acceso Personal) con permiso de **Packaging (Read)** para instalar plantillas desde el feed privado de Azure Artifacts.

#### 🧭 Cómo generar un PAT:

1. Ve a tu organización en Azure DevOps:  
   [https://dev.azure.com/{ORG}](https://dev.azure.com/{ORG})

2. Haz clic en tu ícono de perfil (esquina superior derecha) → **Security**

3. Bajo **Personal Access Tokens**, haz clic en **+ New Token**

4. Establece lo siguiente:
   - **Nombre**: `ProjectTemplatesAccess`
   - **Expiración**: Elige según tu política (por ejemplo, 30 o 90 días o personalizado, como 1 año)
   - **Organización**: {ORG}
   - **Ámbitos (Scopes)**:  
     Selecciona **Custom defined** →  
     Expande **Packaging** y marca `Read`

5. Haz clic en **Create** y **copia el token de inmediato**  
   (no podrás verlo nuevamente)

6. Usa este token cuando el script lo solicite.

> 🛑 No compartas tu PAT. Es tan sensible como una contraseña.


### ⚙️ Paso 3: Ejecutar el Script de Configuración

El script configura el feed de NuGet, solicita tu PAT e instala la plantilla.

```powershell
.\scripts\setup-template-feed.ps1
```

### 📥 Paso 4: Instalar la Plantilla

Una vez que el script configure la fuente NuGet, puedes instalar el paquete de la plantilla con:

```bash
dotnet new install {ORG}.DotNet.Templates
```

---

### 📦 Plantillas Incluidas

Instalar `{ORG}.DotNet.Templates` te da acceso a las siguientes plantillas listas para usar:

| Nombre de Plantilla                  | Nombre Corto                      | Tipo                                  | Descripción                                                            |
|-------------------------------------|-----------------------------------|---------------------------------------|------------------------------------------------------------------------|
| Hybrid Onion/Clean Api Template     | `hybridonioncleanapitemplate`     | `Web` `API` `REST` `Onion` `Clean`    | Plantilla de API web dividida en capas con arquitectura Onion/Clean   |
| Hybrid Onion/Clean Web Template     | `hybridonioncleantemplate`        | `Web` `MVC` `Onion` `Clean`           | Plantilla de proyecto web dividida en capas con arquitectura Onion/Clean |
| Single Project Web Template         | `singleprojectwebtemplate`        | `Web` `MVC`                           | Plantilla de proyecto web standalone con arquitectura Onion/Clean     |

> ✅ Puedes confirmar que están instaladas con:
>
> ```bash
> dotnet new --list
> ```
> ✅ Luego de instalarlas, estas plantillas están disponibles desde la línea de comandos y desde **Visual Studio**.

---

### 🧪 Ejemplo de Uso (Línea de Comandos)

```bash
dotnet new hybridonioncleantemplate -n MiApp
dotnet new hybridonioncleanapitemplate -n MiApp
dotnet new singleprojectwebtemplate -n MiApp
```
