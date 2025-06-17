// Carregar os dados dos produtos
let produtos = []
fetch("/data.json").then(response => response.json()).then(data => {
    // produtos = data
    
    // Calcular descontos
    data.forEach( produto => {
        produto.precoDesconto = produto.preco * (1 - produto.promocao)

        produtos.push(produto)
    })



    criarCategorias()
    criarProdutos()
})

const PLACEHOLDERIMG = "https://static.vecteezy.com/system/resources/previews/018/742/939/original/laptop-computer-with-blank-transparent-screen-and-background-format-png.png"


function getCategorias(){
    // Retorna todas as categorias de produtos

    const categorias = new Set()
    produtos.forEach(item => {
        item.categoria.replace()
        categorias.add(item.categoria.replace(/ > .+/, "")) // Filtra sub-categorias
    });

    return categorias
}


function criarCategorias(){
    const menu = document.getElementById("menu-categorias")
    
    getCategorias().forEach(cat => {
        const li = document.createElement('li')
        const a = document.createElement('a')

        li.classList.add("nav-item")
        a.classList.add("nav-link")
        a.classList.add("active")

        a.innerHTML = cat
        a.href = "/"

        li.appendChild(a)
        menu.appendChild(li)
    })
}

function criarProdutos(){
    const divProdutos = document.getElementById("lista-produtos")

    produtos.forEach(produto => {
        // Criando os elementos
        const div = document.createElement('div')  // container
        const img = document.createElement('img')  // imagem
        const h4 = document.createElement('h4')    // nome
        const p1 = document.createElement('p')     // preço original
        const del = document.createElement('del')  // preço original 
        const p2 = document.createElement('p')     // preço desconto
        const a = document.createElement('a')      // botão

        // Valor dos elementos
        div.classList.add("produto")
        p2.classList.add("preco")
        
        img.src = PLACEHOLDERIMG
        h4.innerHTML = produto.nome
        p1.innerHTML = produto.preco + " R$"
        p2.innerHTML = produto.precoDesconto.toFixed(2) + " R$"
        a.innerHTML = "Comprar"
        del.appendChild(p1)

        // Adicionando os elementos a div
        div.appendChild(img)
        div.appendChild(h4)
        div.appendChild(del)
        div.appendChild(p2)
        div.appendChild(a)

        divProdutos.appendChild(div)
    })

}



