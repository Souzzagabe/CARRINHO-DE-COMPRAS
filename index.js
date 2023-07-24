function openModal() {
    var modal = document.querySelector('.box-modal');
    modal.style.display = 'flex';
}

function closeModal() {
    var modal = document.querySelector('.box-modal');
    modal.style.display = 'none';
}


class CarrinhoDeCompras {
    constructor() {
        this.itens = [];
        this.quantidadeTotal = 0;
        this.valorTotal = 0;
    }

    adicionar() {
        let produto = this.lerDados();

        if (this.validaCampos(produto)) {
            this.adicionarItem(produto);
        }

        this.listaTabela();
        this.limpar();
        this.exibirValorTotal(); 

        console.log("cliquei")
    }

    lerDados() {
        let produto = {};
    
        produto.produtoMarca = document.getElementById("marca").value;
        produto.produtoNome = document.getElementById("nome").value;
        produto.produtoQuant = document.getElementById("quant").value;
        produto.produtoPreco = document.getElementById("preco").value;
    
        return produto;
    }
    

    validaCampos(produto) {
        let msg = '';

        if (produto.produtoMarca == '') {
            msg += '- Preencha todos os campos \n';

        }
        if (produto.produtoNome == '') {
            msg += '- Preencha todos os campos \n';
        }
        if (produto.produtoQuant == '') {
            msg += '- Preencha todos os campos \n';
        }
        if (produto.produtoPreco == '') {
            msg += '- Preencha todos os campos \n';
        }
        if (msg != '') {
            alert(msg);
            return false;
        }
        return true;
    }


    adicionarItem(item) {
        this.itens.push(item);
        this.quantidadeTotal += parseInt(item.produtoQuant);
        this.valorTotal += parseInt(item.produtoQuant) * parseFloat(item.produtoPreco);
    }
    

    removerItem(item) {
        const index = this.itens.indexOf(item);
        if (index !== 0) {
            const itemRemovido = this.itens.splice(index, 1)[0];
            this.quantidadeTotal -= itemRemovido.quantidade;
            this.valorTotal -= itemRemovido.produtoQuant * itemRemovido.produtoPreco;

            let tbody = document.getElementById("tbody");
            tbody.deleteRow(index);
            this.exibirValorTotal();

            console.log("cliquei")
        }
    }

    listaTabela() {
        let tbody = document.getElementById("tbody");
        tbody.innerHTML = '';

        for (let i = 0; i < this.itens.length; i++) {
            let tr = tbody.insertRow();

            let td_marca = tr.insertCell();
            let td_nome = tr.insertCell();
            let td_quant = tr.insertCell();
            let td_preco = tr.insertCell();
            let td_retirar = tr.insertCell();

            td_marca.innerText = this.itens[i].produtoMarca;
            td_nome.innerText = this.itens[i].produtoNome;
            td_quant.innerText = this.itens[i].produtoQuant;
            td_preco.innerText = this.itens[i].produtoPreco;

            let imgRetirar = document.createElement('img');
            imgRetirar.src = 'assets/retirar2.png';
            td_retirar.appendChild(imgRetirar);

            imgRetirar.setAttribute("onclick", "carrinho.removerItem('" + this.itens[i].produtoNome + "')");
        }
    }

    limpar() {
        document.getElementById("marca").value = '';
        document.getElementById("nome").value = '';
        document.getElementById("quant").value = '';
        document.getElementById("preco").value = '';
    }

    exibirValorTotal() {
        let valorTotalElement = document.getElementById("valorTotal");
        valorTotalElement.innerText = `Valor Total: R$ ${this.valorTotal.toFixed(2)}`;
    }

}

class Item {
    constructor(nome, quantidade, preco, marca) {
        this.nome = nome;
        this.quantidade = quantidade;
        this.preco = preco;
        this.marca = marca;
    }

}

const carrinho = new CarrinhoDeCompras();

// const item1 = new Item("camisa", 2, 25, "lacoste");
// const item2 = new Item("chinelo", 50, 100, "tommy");

// carrinho.adicionarItem(item1);
// carrinho.adicionarItem(item2);

// console.log(carrinho)

// carrinho.removerItem(item2)

// //carrinho.removerItem(item1)

// console.log("carrinhoRemovido", carrinho)
