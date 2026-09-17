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

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const nome = document.querySelector("#nome").value.trim();
      const email = document.querySelector("#email").value.trim();
      const area = document.querySelector("#assunto").value;
      const mensagem = document.querySelector("#mensagem").value.trim();
      const status = document.querySelector("#formStatus");

      status.textContent = "A enviar a sua mensagem…";

      try {
        const response = await fetch("https://formsubmit.co/ajax/ola@criandoraizes.pt", {
          method: "POST",
          headers: { Accept: "application/json" },
          body: new FormData(form)
        });

        if (!response.ok) throw new Error("Falha no envio");
        status.textContent = "Mensagem enviada. Entraremos em contacto em breve.";
        form.reset();
      } catch (error) {
        const subject = encodeURIComponent(`Contacto — ${area}`);
        const body = encodeURIComponent(
          `Olá Criando Raízes,\n\nNome: ${nome}\nEmail: ${email}\nÁrea: ${area}\n\nMensagem:\n${mensagem}\n\nEnviado através do site.`
        );
        status.textContent = "Não foi possível enviar automaticamente. A abrir o seu programa de email…";
        window.location.href = `mailto:ola@criandoraizes.pt?subject=${subject}&body=${body}`;
      }
    });
  }
});
