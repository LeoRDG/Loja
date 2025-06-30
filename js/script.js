let categoria = null;
let produtoID = null;
let pesquisa = null;
const produtos = [];

const logo = document.getElementById('logo');
const la = document.getElementById("faz-login")
window.addEventListener("scroll", () => {
    // Faz com que a logo e o link para fazer login sumam se a página estiver rolando e a largura for pequena
    if (window.pageYOffset > 0 && window.innerWidth <= 592) {
        logo.classList.add("esconder");
        la.classList.add("esconder");
    } else {
        logo.classList.remove("esconder");
        la.classList.remove("esconder");
    }
})

fetch("/data.json").then(response => response.json()).then(data => {
    /* Lê os dados de produtos */

    // Calcular descontos
    data.forEach(produto => {
        produto.precoDesconto = produto.preco * (1 - produto.promocao);

        produtos.push(produto);
    })

    criarCategorias();
    getParametros();
    if (window.location.pathname.endsWith("index.html") || window.location.pathname.endsWith("/")) {
        criarProdutos();
    }
    if (window.location.pathname.endsWith("produto.html")) {
        criarPáginaProduto();
    }
})

function criarPáginaProduto() {
    /*
        Cria a página de um produto especifico que foi selecionado
    */

    produtos.forEach(p => {
        // Retorna se não for o id correto
        if (produtoID !== p.id) {
            return;
        }

        // Pegando os elementos que já foram criados
        const imgEl = document.getElementById("imagem");
        const nomeEl = document.getElementById("nome");
        const marcaEl = document.getElementById("marca");
        const modeloEl = document.getElementById("modelo");
        const precoOriginalEl = document.getElementById("preco-original");
        const descontoEl = document.getElementById("desconto")
        const precoDescontoEl = document.getElementById("preco");
        const estoqueEl = document.getElementById("estoque");
        const descricaoEl = document.getElementById("descricao");
        const par1 = document.getElementById("par1");
        const par2 = document.getElementById("par2");
        const par3 = document.getElementById("par3");
        const par4 = document.getElementById("par4");
        const par5 = document.getElementById("par5");

        // Mudar a cor e o texto dependendo do valor do estoque
        estoqueEl.classList.add(p.estoque > 0 ? "verde" : "laranja")
        estoqueEl.innerHTML = p.estoque > 0 ? `${p.estoque} Unidades Disponíveis` : "Produto Esgotado";

        // Mudando o conteúdo dos elementos de acordo com o produto
        imgEl.src = `/img/produtos/${p.id}.png`;
        nomeEl.innerHTML = p.nome;
        marcaEl.innerHTML = p.fabricante;
        modeloEl.innerHTML = p.modelo;
        precoOriginalEl.innerHTML = "R$ " + formatarNumero(p.preco);
        descontoEl.innerHTML = p.promocao * 100 + "% OFF 📈"
        precoDescontoEl.innerHTML = "R$ " + formatarNumero(p.precoDesconto);
        descricaoEl.innerHTML = p.descricao;
        par1.innerHTML = `1x de R$ ${formatarNumero(p.precoDesconto * .9)}`;
        par2.innerHTML = `3x de R$ ${formatarNumero(p.precoDesconto / 3 * .95)}`;
        par3.innerHTML = `6x de R$ ${formatarNumero(p.precoDesconto / 6)}`;
        par4.innerHTML = `12x de R$ ${formatarNumero((p.precoDesconto * .05) / (1 - (1 + .05) ** -12))}`;
        par5.innerHTML = `24x de R$ ${formatarNumero((p.precoDesconto * .1) / (1 - (1 + .1) ** -24))}`;

    })
}

function formatarNumero(num) {
    /* Formata um número para o padrão brasileiro */
    num = parseFloat(num)
    return Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num);
}

function getCategorias() {
    /* Retorna uma lista com as categorias de produtos */

    const categorias = new Set();
    produtos.forEach(item => {
        // categorias.add(item.categoria.replace(/ > .+/, "")) // Filtra sub-categorias com regex
        categorias.add(item.categoria);
    });

    return categorias;
}

function getParametros() {
    /* Lê os parâmetros da url para depois definir como construir a página */

    const params = new URLSearchParams(window.location.search)
    categoria = params.get("cat")
    pesquisa = params.get("pesquisa")
    produtoID = params.get("id")
}

function criarCategorias() {
    /* Cria o menu de categorias com base nos produtos */

    const menu = document.getElementById("menu-categorias");

    getCategorias().forEach(cat => {
        const li = document.createElement('li');
        const a = document.createElement('a');

        li.classList.add("hover-highlight", "item-menu", "px-2", "fs-5");
        a.classList.add("nav-link", "active");

        a.innerHTML = cat;
        a.href = `index.html?cat=${cat}`;

        li.appendChild(a);
        menu.appendChild(li);
    })
}

function criarProdutos() {
    /* Cria a página inicial com todos os produtos ou todos os produtos da pesquisa ou da categoria selecionada */
    const divProdutos = document.getElementById("lista-produtos");
    let cont = 0;

    produtos.forEach(produto => {
        if (!(categoria === null || categoria === produto.categoria)) {
            return;
        }

        if (!(pesquisa === null || produto.nome.toLowerCase().includes(pesquisa.toLowerCase()))) {
            return;
        }

        cont++
        // Criando os elementos
        const div = document.createElement('div');      // container
        const img_div = document.createElement('div');  // container para a imagem
        const pd_div = document.createElement('div');   // container para a preco/desconto
        const img = document.createElement('img');      // imagem
        const h4 = document.createElement('h4');        // nome
        const p1 = document.createElement('p');         // preço original
        const del = document.createElement('del');      // preço original 
        const p2 = document.createElement('p');         // preço desconto
        const ins = document.createElement('ins')       // desconto
        const p3 = document.createElement('p');         // desconto
        const a = document.createElement('a');          // botão


        // atribuição de classes        
        div.classList.add("produto", "border", "m-2", "p-2", "rounded-4",);

        img_div.classList.add("img-div", "text-center");
        img.classList.add("img-fluid", "w-75");

        p1.classList.add("text-secondary", "d-inline", "me-3");
        p3.classList.add("text-danger", "d-inline", "fw-bold");

        p2.classList.add("preco", "fw-bold", "fs-2");
        a.classList.add("btn", "p-3", "container-fluid", "rounded-4", "fw-bold", "comprar", "hover-highlight");

        // adicionando valor aos elementos
        img.src = `img/produtos/${produto.id}.png`;
        h4.innerHTML = produto.nome;
        p1.innerHTML = "R$ " + formatarNumero(produto.preco);
        p2.innerHTML = "R$ " + formatarNumero(produto.precoDesconto);
        p3.innerHTML = produto.promocao * 100 + "% OFF";
        a.innerHTML = "COMPRAR";
        a.href = `produto.html?id=${produto.id}`;

        // Adicionando os elementos uns aos outros
        del.appendChild(p1);
        ins.appendChild(p3)
        img_div.appendChild(img);
        pd_div.append(del, ins);

        div.appendChild(img_div);
        div.appendChild(h4);
        div.appendChild(pd_div);
        div.appendChild(p2);
        div.appendChild(a);

        divProdutos.appendChild(div);
    })
    // Atualiza o titulo com a pesquisa feita/categoria selecionada e o número de produtos
    const titulo = document.getElementById("produto-contagem")
    titulo.innerHTML = `Produtos > ${categoria || pesquisa || ""} (${cont})`
}



