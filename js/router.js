export function iniciarEventosNavegacao() {
    document.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            console.log("Navegação:", link.href);
        });
    });
}
