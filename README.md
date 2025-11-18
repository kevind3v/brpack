# BrPacks

BrPacks é um "Ninite" para Linux: uma página web onde você escolhe navegadores, IDEs, ferramentas de banco e utilitários, define o gerenciador de pacotes (APT/Snap/Flatpak/custom) e recebe um script `installer.sh` pronto para provisionar qualquer máquina.

Este repositório contém tanto o catálogo (organizado em classes por categoria) quanto o servidor de desenvolvimento em Node.

---

## Pré-requisitos

1. **Atualize o sistema**
   ```bash
   sudo apt update && sudo apt upgrade -y
   sudo apt install -y git curl build-essential
   ```
2. **Instale o Node**
   - **Opção A — via NVM (recomendado para manter versões isoladas)**
     ```bash
     curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
     source ~/.nvm/nvm.sh
     nvm install --lts
     nvm use --lts
     ```
   - **Opção B — direto via APT (pode ser usada junto com o NVM, se quiser um Node global)**
     ```bash
     curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
     sudo apt install -y nodejs
     ```
     Em distribuições derivadas de Debian/Ubuntu antigas, use `sudo apt install -y nodejs npm` se o repositório oficial bastar.
3. **Clone o projeto**
   ```bash
   git clone <URL_DO_REPO> brpacks
   cd brpacks
   ```

---

## Instalação e execução

1. **Instale as dependências**
   ```bash
   npm install
   ```
2. **Rodar em modo dev (com auto-reload)**
   ```bash
   npm run dev
   ```
   Ou apenas `npm start` para rodar uma vez.
3. **Acesse** `http://localhost:4173` no navegador.

---

## Como usar

1. Pesquise e selecione os apps desejados. Ao selecionar, os controles de método/versão aparecem.
   - Alguns itens dependem de outros (ex.: *Oh My Zsh* só aparece depois de selecionar o *Zsh*). Remova a dependência e o dependente é automaticamente descartado.
2. Clique em **Gerar Script** para abrir o modal com o `installer.sh`.
3. **Copie ou baixe** o script.
4. No destino final:
   ```bash
   chmod +x installer.sh
   ./installer.sh
   ```
   O script prepara os repositórios APT, instala Snap/Flatpak se necessário e executa todos os comandos escolhidos (incluindo custom, como Oh My Zsh).

---

## Estrutura

```
src/
  index.html        # UI principal
  styles/           # CSS
  scripts/app.js    # lógica em jQuery/ESM
  catalog/
    core/           # classes base
    helpers/        # helpers (ícones)
    apps/<categoria>/
    categories/     # CategoryDefinition + instâncias
server.js            # Express + /catalog.json
```

Adicionar um app: crie uma classe em `src/catalog/apps/<categoria>/NovoApp.js` herdando `AppDefinition`, depois instancie em `src/catalog/categories/<categoria>.js`. O servidor reimporta tudo automaticamente.


### Creditos

- [Kevin Siqueira](https://github.com/kevind3v) (Dev)

The MIT License (MIT). Please see [License File](https://github.com/kevind3v/brpack/blob/main/LICENSE) for more information.
