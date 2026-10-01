import { iniciarFormulario } from "./formulario.js";

export function iniciarEventosNavegacao() {
    document.addEventListener("click", async event => {
        const link = event.target.closest("a");

        if (!link) return;

        const url = new URL(link.href);

        // Permite links externos e links que não sejam páginas HTML
        if (url.origin !== window.location.origin) return;
        if (!url.pathname.endsWith(".html")) return;

        event.preventDefault();

        const destino = `${url.pathname}${url.hash}`;

        try {
            const resposta = await fetch(url.pathname);

            if (!resposta.ok) {
                throw new Error("Não foi possível carregar a página.");
            }

            const html = await resposta.text();
            const documento = new DOMParser().parseFromString(html, "text/html");
            const novoApp = documento.querySelector("#app");

            if (!novoApp) {
                throw new Error("Área principal #app não encontrada.");
            }

            const appAtual = document.querySelector("#app");

            if (!appAtual) return;

            appAtual.innerHTML = novoApp.innerHTML;

            document.title = documento.title;

            history.pushState({}, "", destino);

            iniciarFormulario();

            if (url.hash) {
                const alvo = document.querySelector(url.hash);

                if (alvo) {
                    alvo.scrollIntoView({
                        behavior: "smooth"
                    });
                }
            } else {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }

        } catch (erro) {
            console.error("Erro ao carregar a página:", erro);

            // Caso ocorra algum problema, permite a navegação normal.
            window.location.href = link.href;
        }
    });

    window.addEventListener("popstate", () => {
        window.location.reload();
    });
}
