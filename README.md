## 🌍 Other Languages

- [Español](README.es.md)

# 📦 DotNet Project Templates

Custom .NET templates for **El Catador** and **Bona** applications using Hybrid Onion/Clean Architecture, pre-configured with NuGet packages, layouts, and environments.

---

## 🚀 Quick Start (English)

### ✅ Prerequisites

- [.NET 6 SDK](https://dotnet.microsoft.com/download)
- PowerShell 5+
- Azure DevOps Personal Access Token (PAT) with `Packaging > Read` permission

---

### ⚙️ Step 1: Clone the Repository

```bash
git clone https://dev.azure.com/DevSharedProjects/DotNetTemplates/_git/DotNetTemplates
cd DotNetTemplates
```

### 🔑 Step 2: Generate a Personal Access Token (PAT)

You need a PAT (Personal Access Token) with **Packaging (Read)** permission to install templates from the private Azure Artifacts feed.

#### 🧭 How to generate a PAT:

1. Go to your Azure DevOps organization:  
   [https://dev.azure.com/DevSharedProjects](https://dev.azure.com/DevSharedProjects)

2. Click your profile icon (top-right corner) → **Security**

3. Under **Personal Access Tokens**, click **+ New Token**

4. Set the following:
   - **Name**: `ProjectTemplatesAccess`
   - **Expiration**: Choose according to your policy (e.g., 30 or 90 days or custom defined (1 year from now))
   - **Organization**: DevSharedProjects
   - **Scopes**:  
     Select **Custom defined** →  
     Expand **Packaging** and check `Read`

5. Click **Create** and **copy the token immediately**  
   (you won’t be able to see it again)

6. Use this token when prompted by the setup script.

> 🛑 Do not share your PAT. It is as sensitive as a password.


### ⚙️ Step 3: Run the Setup Script

The script configures the NuGet feed, prompts for your PAT, and installs the template.

```powershell
.\scripts\setup-template-feed.ps1
```

### 📥 Step 4: Install the Template

Once the NuGet source is configured by the script, you can install the template package with:

```bash
dotnet new install CataBon.DotNet.Templates
```

---

### 📦 Templates Included

Installing `CataBon.DotNet.Templates` gives you access to the following ready-to-use templates:

| Template Name                     | Short Name                      | Type                                  | Description                                                          |
|-----------------------------------|---------------------------------|---------------------------------------|----------------------------------------------------------------------|
| Hybrid Onion/Clean Api Template   | `hybridonioncleanapitemplate`   | `Web` `API` `REST` `Onion` `Clean`    | Template web api dividido en capas con arquitectura Onion/Clean      |
| Hybrid Onion/Clean Web Template   | `hybridonioncleantemplate`      | `Web` `MVC` `Onion` `Clean`           | Template proyecto web dividido en capas con arquitectura Onion/Clean |
| Single Project Web Template       | `singleprojectwebtemplate`      | `Web` `MVC`                           | Template proyecto web standalone con arquitectura Onion/Clean        |

> ✅ You can confirm they’re installed using:
>
> ```bash
> dotnet new --list
> ```
> ✅ After installation, these templates are available both from the command line and **Visual Studio**.

---

### 🧪 Example Usage (Command Line)

```bash
dotnet new hybridonioncleantemplate -n MyApp
dotnet new hybridonioncleanapitemplate -n MyApp
dotnet new singleprojectwebtemplate -n MyApp
```