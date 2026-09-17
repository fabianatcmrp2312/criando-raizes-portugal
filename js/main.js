document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }));
  }

  const form = document.querySelector("#contactForm");
  if (form) {
    const params = new URLSearchParams(window.location.search);
    const assunto = params.get("assunto");
    const select = document.querySelector("#assunto");
    if (assunto && select) {
      const option = [...select.options].find(o => o.text === assunto);
      if (option) select.value = assunto;
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const nome = document.querySelector("#nome").value.trim();
      const email = document.querySelector("#email").value.trim();
      const area = document.querySelector("#assunto").value;
      const mensagem = document.querySelector("#mensagem").value.trim();
      const status = document.querySelector("#formStatus");

      const subject = encodeURIComponent(`Contacto — ${area}`);
      const body = encodeURIComponent(
        `Olá Criando Raízes,\n\nNome: ${nome}\nEmail: ${email}\nÁrea: ${area}\n\nMensagem:\n${mensagem}\n\nEnviado através do site.`
      );

      status.textContent = "A abrir o seu programa de email…";
      window.location.href = `mailto:ola@criandoraizes.pt?subject=${subject}&body=${body}`;
    });
  }
});
