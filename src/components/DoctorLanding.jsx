import React, { useEffect, useMemo, useRef, useState } from "react";
import { Instagram, Pencil, Save, Upload, Download, X, Eye, EyeOff, FileSpreadsheet } from "lucide-react";
import ContentService from "../services/ContentService.js";

/* ------------------------------- UI Atoms ------------------------------- */
const Section = ({ id, className = "", children }) => (
  <section id={id} className={`mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</section>
);

const Button = ({ href, onClick, children, className = "", ariaLabel }) => {
  const isLink = !!href;
  const cls = `inline-flex items-center justify-center rounded-2xl px-5 py-3 font-medium shadow-md hover:shadow-lg transition focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`;
  return isLink ? (
    <a href={href} className={cls} aria-label={ariaLabel}>{children}</a>
  ) : (
    <button onClick={onClick} className={cls} aria-label={ariaLabel}>{children}</button>
  );
};

/* ---------------------------- Editable Fields --------------------------- */
function useEditableState() {
  const [content, setContent] = useState(ContentService.load());
  const [editing, setEditing] = useState(false);

  // Auto-enable edit mode when ?edit=1
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("edit") === "1") setEditing(true);
  }, []);

  useEffect(() => {
    ContentService.save(content);
  }, [content]);

  return { content, setContent, editing, setEditing };
}

/* ------------------------------- Main View ------------------------------ */
function Hero({ c }) {
  return (
    <div className="relative isolate overflow-hidden bg-white">
      <img
        src={c.hero.imageUrl}
        alt="Fundo clínico"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/20 via-black/40 to-black/60"></div>

      <Section className="flex min-h-[70vh] items-top py-20 lg:py-32">
    <div className="max-w-2xl space-y-6 text-white drop-shadow-[0_3px_3px_rgba(0,0,0,1)]">
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            {c.hero.title}
          </h1>
           <p className="text-lg text-white/100">{c.hero.subtitle}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              href={c.hero.primaryCta.href}
              className="bg-sky-600 text-white hover:bg-sky-700 focus:ring-sky-400"
              ariaLabel="Contato WhatsApp"
            >
              {c.hero.primaryCta.label}
            </Button>
            <Button
              href={c.hero.secondaryCta.href}
              className="bg-white text-slate-900 ring-1 ring-slate-300 hover:ring-slate-400 focus:ring-slate-400"
              ariaLabel="Agendar consulta"
            >
              {c.hero.secondaryCta.label}
            </Button>
          </div>
          <div className="pt-2">
            <a href={c.instagramUrl} className="inline-flex items-center gap-2 text-rose-400 hover:text-rose-200" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </Section>
    </div>
  );
}

function Services({ c }) {
  return (
    <Section id="servicos" className="py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-slate-900">Especialidades</h2>
        <p className="mt-2 text-slate-600">
          {c.specialty}
        </p>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {c.services.map((s) => (
          <div key={s.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-slate-900">{s.title}</h3>
            <p className="mt-2 text-slate-600">{s.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function About({ c }) {
  return (
    <Section id="sobre" className="py-16">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">{c.clinic.aboutTitle}</h2>
          <p className="mt-4 text-slate-700">{c.clinic.aboutText}</p>
          <ul className="mt-6 space-y-2 text-slate-700">
            {c.clinic.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-sky-500" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative">
          <div className="w-full overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
            <img
              src="https://www.saudebemestar.pt/media/86685/auto-refratometro.jpg"
              alt="Equipamentos oftalmológicos"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}

function Articles({ c }) {
  return (
    <Section id="artigos" className="py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-slate-900">Artigos & Atualizações</h2>
        <p className="mt-2 text-slate-600">Publicações simples e rápidas, direto do celular ou computador.</p>
      </div>
      <div className="mt-10 space-y-6">
        {c.articles.length === 0 && (
          <p className="text-center text-slate-500">Nenhum artigo ainda. Toque em “Editar” para criar o primeiro.</p>
        )}
        {c.articles.map((a) => (
          <article key={a.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">{a.title}</h3>
            <p className="mt-1 text-sm text-slate-500">{a.date}</p>
            <p className="mt-3 text-slate-700 whitespace-pre-wrap">{a.body}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

function Footer({ c }) {
  return (
    <footer id="contato" className="border-t border-slate-200 bg-white">
      <Section className="py-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h4 className="text-lg font-semibold text-slate-900">{c.doctorName}</h4>
            <p className="text-slate-600">{c.specialty}</p>
          </div>
          <div>
            <h5 className="font-semibold text-slate-900">Contato</h5>
            <p className="text-slate-600">{c.footer.address}</p>
            <p className="text-slate-600">{c.footer.phone}</p>
            <p className="text-slate-600">{c.footer.email}</p>
          </div>
          <div>
            <h5 className="font-semibold text-slate-900">Redes</h5>
            <a className="mt-1 inline-flex items-center gap-2 text-slate-700 hover:text-slate-900" href={c.instagramUrl}>
              <Instagram className="h-5 w-5" /> Instagram
            </a>
          </div>
        </div>
        <p className="mt-8 text-center text-sm text-slate-500">© {new Date().getFullYear()} {c.doctorName}. Todos os direitos reservados.</p>
      </Section>
    </footer>
  );
}

/* ------------------------------ Edit Overlay ----------------------------- */
function EditOverlay({ open, onClose, content, setContent }) {
  const fileRef = useRef(null);
  if (!open) return null;

  function update(path, value) {
    setContent((prev) => deepUpdate(prev, path, value));
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="absolute right-0 top-0 h-full w-full max-w-2xl overflow-y-auto bg-white shadow-xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white p-4">
          <h3 className="text-lg font-semibold">Editar conteúdo</h3>
          <button className="rounded-full p-2 hover:bg-slate-100" onClick={onClose} aria-label="Fechar edição">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="space-y-8 p-6">
          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold text-slate-900">Identidade</legend>
            <Input label="Nome do médico" value={content.doctorName} onChange={(v) => update(["doctorName"], v)} />
            <Input label="Especialidade" value={content.specialty} onChange={(v) => update(["specialty"], v)} />
          </fieldset>

          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold text-slate-900">Hero</legend>
            <Input label="Título" value={content.hero.title} onChange={(v) => update(["hero", "title"], v)} />
            <Textarea label="Subtítulo" value={content.hero.subtitle} onChange={(v) => update(["hero", "subtitle"], v)} />
            <Input label="Imagem (URL)" value={content.hero.imageUrl} onChange={(v) => update(["hero", "imageUrl"], v)} />
            <Input label="CTA principal – rótulo" value={content.hero.primaryCta.label} onChange={(v) => update(["hero", "primaryCta", "label"], v)} />
            <Input label="CTA principal – link" value={content.hero.primaryCta.href} onChange={(v) => update(["hero", "primaryCta", "href"], v)} />
            <Input label="CTA secundária – rótulo" value={content.hero.secondaryCta.label} onChange={(v) => update(["hero", "secondaryCta", "label"], v)} />
            <Input label="CTA secundária – link" value={content.hero.secondaryCta.href} onChange={(v) => update(["hero", "secondaryCta", "href"], v)} />
            <Input label="Instagram (URL)" value={content.instagramUrl} onChange={(v) => update(["instagramUrl"], v)} />
          </fieldset>

          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold text-slate-900">Clínica</legend>
            <Input label="Título sobre" value={content.clinic.aboutTitle} onChange={(v) => update(["clinic", "aboutTitle"], v)} />
            <Textarea label="Texto sobre" value={content.clinic.aboutText} onChange={(v) => update(["clinic", "aboutText"], v)} />
            <ArrayEditor
              label="Destaques"
              items={content.clinic.highlights}
              onChange={(items) => update(["clinic", "highlights"], items)}
              placeholder="Novo destaque"
            />
          </fieldset>

          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold text-slate-900">Serviços</legend>
            <ServiceEditor services={content.services} onChange={(items) => update(["services"], items)} />
          </fieldset>

          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold text-slate-900">Artigos</legend>
            <ArticleEditor articles={content.articles} onChange={(items) => update(["articles"], items)} />
          </fieldset>

          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold text-slate-900">Rodapé</legend>
            <Input label="Endereço" value={content.footer.address} onChange={(v) => update(["footer", "address"], v)} />
            <Input label="Telefone" value={content.footer.phone} onChange={(v) => update(["footer", "phone"], v)} />
            <Input label="E-mail" value={content.footer.email} onChange={(v) => update(["footer", "email"], v)} />
          </fieldset>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2 font-medium text-white hover:bg-sky-700"
              onClick={() => ContentService.save(content)}
            >
              <Save className="h-4 w-4" /> Salvar no navegador
            </button>
            <button
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 font-medium hover:bg-slate-50"
              onClick={() => ContentService.exportToFile(content)}
            >
              <Download className="h-4 w-4" /> Exportar JSON
            </button>
            <button
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 font-medium hover:bg-slate-50"
              onClick={() => fileRef.current?.click()}
            >
              <Upload className="h-4 w-4" /> Importar JSON
            </button>
            <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              try {
                const data = await ContentService.importFromFile(file);
                setContent(data);
                alert("Conteúdo importado com sucesso!");
              } catch (err) {
                alert("Arquivo inválido.");
              }
            }} />
          </div>

          <p className="text-xs text-slate-500">
            Dica: para entrar direto no modo edição, use o link com <code>?edit=1</code> ao final da URL.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------- Small Form Parts --------------------------- */
const Input = ({ label, value, onChange, type = "text", placeholder }) => (
  <label className="block">
    <span className="text-sm text-slate-700">{label}</span>
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
    />
  </label>
);

const Textarea = ({ label, value, onChange, rows = 4, placeholder }) => (
  <label className="block">
    <span className="text-sm text-slate-700">{label}</span>
    <textarea
      value={value}
      rows={rows}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
    />
  </label>
);

function ArrayEditor({ label, items, onChange, placeholder }) {
  const [draft, setDraft] = useState("");
  return (
    <div>
      <span className="text-sm text-slate-700">{label}</span>
      <div className="mt-2 space-y-2">
        {items.map((it, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <input
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
              value={it}
              onChange={(e) => {
                const copy = [...items];
                copy[idx] = e.target.value;
                onChange(copy);
              }}
            />
            <button
              className="rounded-lg border border-slate-300 px-2 py-2 hover:bg-slate-50"
              onClick={() => onChange(items.filter((_, i) => i !== idx))}
              aria-label="Remover item"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-2">
        <input
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
          placeholder={placeholder}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
        <button
          className="rounded-lg bg-slate-900 px-3 py-2 text-white hover:bg-slate-800"
          onClick={() => {
            if (!draft.trim()) return;
            onChange([...items, draft.trim()]);
            setDraft("");
          }}
        >
          Adicionar
        </button>
      </div>
    </div>
  );
}

function ServiceEditor({ services, onChange }) {
  function updateOne(idx, field, val) {
    const copy = [...services];
    copy[idx] = { ...copy[idx], [field]: val };
    onChange(copy);
  }
  return (
    <div className="space-y-4">
      {services.map((s, idx) => (
        <div key={s.id} className="rounded-2xl border border-slate-200 p-4">
          <div className="flex items-start gap-2">
            <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
              <Input label="Título" value={s.title} onChange={(v) => updateOne(idx, "title", v)} />
              <Input label="ID (slug)" value={s.id} onChange={(v) => updateOne(idx, "id", v)} />
            </div>
            <button
              className="ml-2 rounded-lg border border-slate-300 p-2 hover:bg-slate-50"
              onClick={() => onChange(services.filter((_, i) => i !== idx))}
              aria-label="Remover serviço"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <Textarea label="Descrição" value={s.description} onChange={(v) => updateOne(idx, "description", v)} />
        </div>
      ))}
      <button
        className="rounded-xl bg-slate-900 px-4 py-2 font-medium text-white hover:bg-slate-800"
        onClick={() => onChange([...services, { id: cryptoId(), title: "Novo serviço", description: "Descrição" }])}
      >
        Adicionar serviço
      </button>
    </div>
  );
}

function ArticleEditor({ articles, onChange }) {
  function updateOne(idx, field, val) {
    const copy = [...articles];
    copy[idx] = { ...copy[idx], [field]: val };
    onChange(copy);
  }
  return (
    <div className="space-y-4">
      {articles.map((a, idx) => (
        <div key={a.id} className="rounded-2xl border border-slate-200 p-4">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Input label="Título" value={a.title} onChange={(v) => updateOne(idx, "title", v)} />
            <Input label="Data" type="date" value={a.date} onChange={(v) => updateOne(idx, "date", v)} />
          </div>
          <Textarea label="Texto" rows={5} value={a.body} onChange={(v) => updateOne(idx, "body", v)} />
          <div className="mt-2 flex justify-end">
            <button
              className="rounded-lg border border-slate-300 px-3 py-2 hover:bg-slate-50"
              onClick={() => onChange(articles.filter((_, i) => i !== idx))}
              aria-label="Remover artigo"
            >
              Remover
            </button>
          </div>
        </div>
      ))}
      <button
        className="rounded-xl bg-slate-900 px-4 py-2 font-medium text-white hover:bg-slate-800"
        onClick={() => onChange([{ id: cryptoId(), title: "Novo artigo", date: new Date().toISOString().slice(0,10), body: "Conteúdo do artigo." }, ...articles])}
      >
        Adicionar artigo
      </button>
    </div>
  );
}

/* ----------------------------- Helper Logic ------------------------------ */
function deepUpdate(obj, path, value) {
  if (path.length === 0) return value;
  const [head, ...rest] = path;
  return { ...obj, [head]: rest.length ? deepUpdate(obj[head], rest, value) : value };
}

/* --------------------------------- App ----------------------------------- */
export default function DoctorLanding() {
  const { content, setContent, editing, setEditing } = useEditableState();
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setShowHeader(y < lastY || y < 40);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Floating Header */}
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-transform`}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mt-3 flex items-center justify-between rounded-2xl border border-slate-200 bg-white/90 px-4 py-2 backdrop-blur">
            <div className="flex items-center gap-2">
              <span className="text-base font-semibold">{content.doctorName}</span>
              <span className="hidden text-sm text-slate-500 sm:inline">{content.specialty}</span>
            </div>
            <nav className="flex items-center gap-4 text-sm">
              <a className="hover:text-slate-900 text-slate-600" href="#servicos">Serviços</a>
              <a className="hover:text-slate-900 text-slate-600" href="#sobre">Sobre</a>
              <a className="hover:text-slate-900 text-slate-600" href="#artigos">Artigos</a>
              <a className="hover:text-slate-900 text-slate-600" href="#contato">Contato</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="pt-20">
        <Hero c={content} />
        <Services c={content} />
        <About c={content} />
        <Articles c={content} />
      </main>

      <Footer c={content} />

      {/* Edit Toggle */}
      <div className="fixed bottom-5 right-5 z-50 flex gap-2">
        <button
          className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-3 text-white shadow-lg hover:bg-slate-800"
          onClick={() => setEditing(true)}
          aria-label="Editar conteúdo"
        >
          <Pencil className="h-4 w-4" /> Editar
        </button>
      </div>

      <EditOverlay open={editing} onClose={() => setEditing(false)} content={content} setContent={setContent} />
    </div>
  );
}
