// Carregar os dados dos produtos
let produtos = []
fetch("https://leordg.github.io/Loja/data.json").then(response => response.json()).then(data => {
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
        categorias.add(item.categoria.replace(/ > .+/, "")) // Filtra sub-categorias com regex
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
        a.href = "/" + cat

        li.appendChild(a)
        menu.appendChild(li)
    })
}

function criarProdutos(){
    const divProdutos = document.getElementById("lista-produtos")

    produtos.forEach(produto => {
        // Criando os elementos
        const div = document.createElement('div')      // container
        const img_div = document.createElement('div')  // container para a imagem
        const pd_div = document.createElement('div')   // container para a preco/desconto
        const img = document.createElement('img')      // imagem
        const h4 = document.createElement('h4')        // nome
        const p1 = document.createElement('p')         // preço original
        const del = document.createElement('del')      // preço original 
        const p2 = document.createElement('p')         // preço desconto
        const p3 = document.createElement('p')         // desconto
        const a = document.createElement('a')          // botão
        

        // Classes        
        div.classList.add("produto", "border", "m-2", "p-2", "rounded-4",)

        img_div.classList.add("img-div", "text-center")
        img.classList.add("img-fluid", "w-75")

        p1.classList.add("text-secondary", "d-inline", "me-3")
        p3.classList.add("text-danger", "d-inline", "fw-bold")

        p2.classList.add("preco", "text-primary", "fw-bold", "fs-2")
        a.classList.add("btn", "btn-primary", "p-3", "container-fluid", "rounded-4", "fw-bold")
        
        // Valor dos elementos
        img.src = `img/produtos/${produto.id}.png`
        h4.innerHTML = produto.nome
        p1.innerHTML = "R$ " + Intl.NumberFormat("pt-BR", {minimumFractionDigits: 2}).format(produto.preco)
        p2.innerHTML = "R$ " + Intl.NumberFormat("pt-BR", {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(produto.precoDesconto)
        p3.innerHTML = produto.promocao * 100 + "% OFF"
        a.innerHTML = "Comprar"
        
        del.appendChild(p1)
        img_div.appendChild(img)
        pd_div.append(del, p3)
        
        // Adicionando os elementos a div
        div.appendChild(img_div)
        div.appendChild(h4)
        div.appendChild(pd_div)
        div.appendChild(p2)
        div.appendChild(a)

        divProdutos.appendChild(div)
    })

}



