const CHAVE = "ongEsperancaCadastro";

export function salvar(dados) {
    localStorage.setItem(CHAVE, JSON.stringify(dados));
}

export function recuperar() {
    const dados = localStorage.getItem(CHAVE);
    return dados ? JSON.parse(dados) : null;
}
