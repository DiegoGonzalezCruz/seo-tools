# SEO Automation Tool

## 🚀 Quick Start

This SEO automation tool is designed to streamline the process of generating and updating WordPress media (images) with SEO best practices. By leveraging LLMs through **Next.js**, **Ollama**, and **LangChain**, this tool integrates AI with WordPress to simplify tedious SEO tasks.

---

## 📥 Installation

Follow the steps below to install and run the project locally:

### 1. Clone the Repository

```bash
  git clone https://github.com/DiegoGonzalezCruz/seo-tools.git
  cd seo-tools
```

### 2. Install Dependencies

```bash
  npm install
  # or
  yarn install
```

### 3. Run Development Server

```bash
  npm run dev
  # or
  yarn dev
```

### 4. Open in Browser

```bash
  http://localhost:3000
```

---

## 🛠 Requirements

Ensure you have the following installed on your local machine:

- **Node.js** (Latest LTS recommended)
- **Package Manager**: `npm`, `yarn`, `pnpm`, or `bun`
- **Ollama** (Running at `http://localhost:11434` by default)
- **Models**: `llava` and `llama3` (other models may work but are untested)

```bash
ollama run llava
ollama run llama3
```

---

## 🔗 Connecting to WordPress

To connect the tool to your WordPress site:

1. **Generate a WordPress Application Password**

   - Follow this [tutorial](https://youtu.be/f0Why33eS0Y) for step-by-step guidance.

2. **Add Credentials to Environment**

   - Once you have your credentials, add them to the environment file to enable direct media library uploads.

3. **Optional**: Configure additional security plugins if needed. If any issues arise, reach out at **[diego@thinkey.us](mailto:diego@thinkey.us)**.

---

## 🛣 Roadmap

The tool is in active development! Here are upcoming features:

- **OpenAI Integration** – Use OpenAI models as an alternative to local ones.
- **Automatic Title Generator** – AI-driven title suggestions.
- **Server-Side Image Updates** – Automate direct updates to server-side images.
- **Feedback Button** – Report bugs or request features directly.

---

## 🤝 Contributing

We welcome contributions! If you’d like to contribute:

1. Fork the repository.
2. Create a new branch (`feature/your-feature`).
3. Commit your changes.
4. Push to the branch and submit a Pull Request.

For any questions or suggestions, feel free to open an issue or reach out.

---

## 📧 Contact

- **Email**: [diego@thinkey.us](mailto:diego@thinkey.us)
- **GitHub**: [DiegoGonzalezCruz](https://github.com/DiegoGonzalezCruz)

Thank you for your interest in this project!
