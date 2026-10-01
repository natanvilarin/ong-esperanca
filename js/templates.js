export function criarCard(titulo, texto) {
    return `
        <article class="card">
            <h3>${titulo}</h3>
            <p>${texto}</p>
        </article>
    `;
}
