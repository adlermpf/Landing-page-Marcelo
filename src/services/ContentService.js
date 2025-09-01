class ContentService {
  static STORAGE_KEY = "doctorLandingContent";

  static defaultContent() {
    const today = new Date().toISOString().slice(0, 10);
    function cryptoId() {
      return Math.random().toString(36).slice(2) + Date.now().toString(36);
    }
    return {
      doctorName: "Dr. Marcelo Muce",
      specialty: "Oftalmologia • Cirurgia de Catarata e Refrativa",
      hero: {
        title: "Sua visão, com precisão",
        subtitle:
          "Tecnologia e cuidado para catarata e cirurgias refrativas. Atendimento acolhedor e resultados consistentes.",
        imageUrl:
          "https://images.pexels.com/photos/132037/pexels-photo-132037.jpeg",
        primaryCta: { label: "Fale no WhatsApp", href: "https://wa.me/5511999999999" },
        secondaryCta: { label: "Agendar consulta", href: "#contato" },
      },
      instagramUrl: "https://instagram.com/seu_instagram",
      clinic: {
        aboutTitle: "Cuidado de ponta, de pessoa para pessoa",
        aboutText:
          "Atendimento centrado no paciente, avaliação minuciosa e plano terapêutico individualizado. Procedimentos com equipamentos modernos e protocolos seguros.",
        highlights: [
          "Cirurgia de catarata com lentes premium",
          "Cirurgias refrativas (Miopia, Hipermetropia, Astigmatismo)",
          "Check-up ocular completo",
        ],
      },
      services: [
        {
          id: "cataract",
          title: "Cirurgia de Catarata",
          description:
            "Remoção segura do cristalino opaco e implante de lente intraocular personalizada. Recuperação rápida e maior qualidade de vida.",
        },
        {
          id: "refractive",
          title: "Cirurgia Refrativa",
          description:
            "Correção de miopia, hipermetropia e astigmatismo com técnicas modernas (ex.: LASIK/PRK), para reduzir a dependência de óculos.",
        },
        {
          id: "checkup",
          title: "Check-up Ocular",
          description:
            "Avaliação completa da saúde dos olhos, com orientação preventiva e acompanhamento contínuo.",
        },
      ],
      articles: [
        {
          id: cryptoId(),
          title: "Ispsis Lorem: o que observar antes da cirurgia de catarata",
          date: today,
          body:
            "Conteúdo demonstrativo para o blog. Aqui você pode escrever orientações, novidades e curiosidades para pacientes.",
        },
      ],
      footer: {
        address: "Rua Exemplo, 123 • Bairro • Cidade – SP",
        email: "contato@seudominio.com",
        phone: "+55 (11) 99999-9999",
      },
      theme: {
        primary: "#0ea5e9", // sky-500
        accent: "#22c55e", // green-500
      },
    };
  }

  static load() {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      return raw ? JSON.parse(raw) : this.defaultContent();
    } catch (e) {
      console.warn("Failed to parse stored content, using defaults.", e);
      return this.defaultContent();
    }
  }

  static save(content) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(content));
  }

  static exportToFile(content) {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "landing-content.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  static async importFromFile(file) {
    const text = await file.text();
    const json = JSON.parse(text);
    if (!json || !json.doctorName || !json.hero) {
      throw new Error("Invalid content file.");
    }
    this.save(json);
    return json;
  }
} export default ContentService;