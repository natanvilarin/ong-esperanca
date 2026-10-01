export function mensagem(mensagem) {
    if (window.Swal) {
        Swal.fire({
            title: "Atenção",
            text: mensagem,
            icon: "info",
            confirmButtonText: "OK"
        });
    } else {
        console.log(mensagem);
    }
}

export function sucesso(titulo, mensagem) {
    if (window.Swal) {
        Swal.fire({
            title: titulo,
            text: mensagem,
            icon: "success",
            confirmButtonText: "OK"
        });
    } else {
        console.log(`${titulo}: ${mensagem}`);
    }
}

export function erro(titulo, mensagem) {
    if (window.Swal) {
        Swal.fire({
            title: titulo,
            text: mensagem,
            icon: "error",
            confirmButtonText: "OK"
        });
    } else {
        console.error(`${titulo}: ${mensagem}`);
    }
}
