import { salvar, recuperar } from "./storage.js";

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
            if (campo) campo.value = dados[chave];
        });
    }

    const telefone = form.elements.telefone;

    telefone?.addEventListener("input", event => {
        event.target.value = aplicarMascaraTelefone(event.target.value);
    });

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const dadosFormulario = Object.fromEntries(new FormData(form));

        if (telefone && !telefoneValido(telefone.value)) {
            telefone.focus();
            alert("Informe um telefone válido com DDD.");
            return;
        }

        salvar(dadosFormulario);

        if (window.Swal) {
            Swal.fire({
                title: "Cadastro enviado!",
                text: "Seus dados foram armazenados com sucesso.",
                icon: "success",
                confirmButtonText: "OK"
            });
        } else {
            alert("Cadastro enviado com sucesso!");
        }
    });
}
