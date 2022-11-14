const form = document.querySelector('#novoItem')
const lista = document.querySelector('#lista')
const itens = JSON.parse(localStorage.getItem("itens")) || [] // JSON.parse() transforma a string em objeto.

itens.forEach((item) => {                      // Itera todos os itens da variável itens e chama a função para cada um desses itens
    criaElemento(item)
})

form.addEventListener("submit", (evento) => { // evento contém todas as informações possíveis do objeto em questão.
    evento.preventDefault()                   // quando trabalhamos com form e submit, devemos passar essa linha de código para anular comportamento padrão.

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }
    
    const existe = itens.find(elemento => elemento.nome === nome.value) // procura em toda lista o elemento nome que seja igual ao nome colocado no input. Caso exista, guarda na const.

    if (existe) {                       // Condicional baseada no ID de elementos criados. Se o nome é encontrado, a gente atualiza o elemento
        itemAtual.id = existe.id
        atualizaElemento(itemAtual)
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
    } else {                            // Se não é encontrado, a gente cria o elemento do zero
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1 : 0; // Se a primeira condição itens[itens.length -1], existir, faça (itens[itens.length-1]), se não, id será 0;
        criaElemento(itemAtual)
        itens.push(itemAtual)
    }


    localStorage.setItem("itens", JSON.stringify(itens)) // JSON.stringfy() passa para string pois localStorage não aceita outra tipagem

    nome.value = ""
    quantidade.value = ""
});

function criaElemento(item) {
    const novoItem = document.createElement('li')
    novoItem.classList.add("item")

    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = item.quantidade

    numeroItem.dataset.id = item.id
    novoItem.appendChild(numeroItem)
    novoItem.innerHTML += item.nome

    novoItem.appendChild(botaoDeleta(item.id))

    lista.appendChild(novoItem)


};

function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function botaoDeleta(id) {
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText = "X"
    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id)
    })
    return elementoBotao
}

function deletaElemento(tag, id) {
    tag.remove()
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)
    localStorage.setItem("itens", JSON.stringify(itens))
}