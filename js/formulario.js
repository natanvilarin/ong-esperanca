import { salvar, recuperar } from "./storage.js";
import { sucesso, erro } from "./alertas.js";

function telefoneValido(valor) {
    const numeros = valor.replace(/\D/g, "");
    return numeros.length === 10 || numeros.length === 11;
}

function aplicarMascaraTelefone(valor) {
    const numeros = valor.replace(/\D/g, "").slice(0, 11);

    if (numeros.length <= 10) {
        return numeros
            .replace(/^(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{4})(\d)/, "$1-$2");
    }

    return numeros
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2");
}

export function iniciarFormulario() {
    const form = document.querySelector("form");
    if (!form) return;

    const dados = recuperar();

    if (dados) {
        Object.keys(dados).forEach(chave => {
            const campo = form.elements[chave];

            if (campo) {
                campo.value = dados[chave];
            }
        });
    }

    const telefone = form.elements.telefone;
    const email = form.elements.email;
    const emailHelp = document.getElementById("email-help");

    telefone?.addEventListener("input", event => {
        event.target.value = aplicarMascaraTelefone(event.target.value);
    });

    email?.addEventListener("input", () => {
    if (email.value === "") {
        emailHelp.textContent = "";
        return;
    }

    if (email.validity.valid) {
        emailHelp.textContent = "";
    } else {
        emailHelp.textContent = "Informe um endereço de e-mail válido.";
    }
});

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const dadosFormulario = Object.fromEntries(new FormData(form));

        if (telefone && !telefoneValido(telefone.value)) {
            telefone.focus();

            erro(
                "Telefone inválido",
                "Informe um telefone válido com DDD."
            );

            return;
        }

        salvar(dadosFormulario);

        sucesso(
            "Cadastro enviado!",
            "Seus dados foram armazenados com sucesso."
        );
    });
}
