class Produto{

    constructor(){
        this.id = 1;
        this.arrayProdutos = [];
        this.editId = null;
        
    }

    lançar() {
        let produto = this.lerDados();

        if(this.validaCampos(produto)){
             if(this.editId == null ){
                this.adicionar(produto);
             } else {
                 this.atualizar(this.editId, produto);
             }
  
        }

        this.listaTabela();
        this.cancelar();
    }

    listaTabela(){
        let tbody = document.getElementById('tbody');
        tbody.innerText = '';

        for(let i = 0; i < this.arrayProdutos.length; i++ ) {
        let tr = tbody.insertRow();

        let td_id = tr.insertCell();
        let td_data = tr.insertCell();
        let td_tipo = tr.insertCell();
        let td_produto = tr.insertCell();
        let td_quantidade = tr.insertCell();
        let td_Ações = tr.insertCell();

        td_id.innerText = this.arrayProdutos[i].id;
        td_data.innerText = this.arrayProdutos[i].data;
        td_tipo.innerText = this.arrayProdutos[i].tipo;
        td_produto.innerText = this.arrayProdutos[i].produto;
        td_quantidade.innerText = this.arrayProdutos[i].quantidade;
        

        td_id.classList.add('center');

        let imgEdit = document.createElement('img');
        imgEdit.src = 'img/edit.png'; 
        imgEdit.setAttribute("onclick", "produto.preparaEdicao("+ JSON.stringify(this.arrayProdutos[i]) +")");
        
        let imgDelete = document.createElement('img');
        imgDelete.src = 'img/delete.png';
        imgDelete.setAttribute("onclick", "produto.deletar("+ this.arrayProdutos[i].id +")");



        td_Ações.appendChild(imgEdit);
        td_Ações.appendChild(imgDelete);

        }
    }

    

    adicionar(produto){
        produto.preco =parseFloat(produto.preco)
        this.arrayProdutos.push(produto);
        this.id++;

    }

    atualizar(id, produto){
        for(let i = 0; i < this.arrayProdutos.length; i++){
            if(this.arrayProdutos[i].id == id){
                    this.arrayProdutos[i].data = produto.data;
                    this.arrayProdutos[i].tipo = produto.tipo; 
                    this.arrayProdutos[i].produto = produto.produto; 
                    this.arrayProdutos[i].quantidade = produto.quantidade;  
            }
        }
            
    }

    preparaEdicao(dados){
        this.editId = dados.id;

        document.getElementById('data').value = dados.data;
        document.getElementById('tipo').value = dados.tipo;
        document.getElementById('produto').value = dados.produto;
        document.getElementById('quantidade').value = dados.quantidade; 

        document.getElementById('btn1').innerText = 'Atualizar';


    }

    lerDados() {
        let produto = {}
        
        produto.id = this.id;
        produto.data = document.getElementById('data').value;
        produto.tipo = document.getElementById('tipo').value;
        produto.produto = document.getElementById('produto').value;
        produto.quantidade = document.getElementById('quantidade').value;

        return produto;
    }

    validaCampos(produto) {
        let msg = '';

        if(produto.data == ''){
            msg += '- Informe da Data \n';
        }

        if(produto.tipo == ''){
            msg += '- Informe o Tipo de Movimentação \n';
        }

        if(produto.produto == ''){
            msg += '- Informe o nome do Produto \n';
        }

        if(produto.quantidade == ''){
            msg += '- Informe a Quantidade \n';
        }

        if(msg != ''){
            alert("Preencha TODOS os campos!");
            return false;
        }

        return true;
    }



    cancelar(){
        document.getElementById('data').value = '';
        document.getElementById('tipo').value = '';
        document.getElementById('produto').value = '';
        document.getElementById('quantidade').value = '';

        document.getElementById("btn1").innerText = 'Lançar';
        this.editId = null;
    }

    deletar(id){
        if(confirm('Deseja realmente remover o produto ID ' + id)) {
            let tbody = document.getElementById('tbody');

        for(let i = 0; i < this.arrayProdutos.length; i++) {
            if(this.arrayProdutos[i].id == id){
                this.arrayProdutos.splice(i, 1);  
                tbody.deleteRow(i);  
            }
        }

    }
}
}


var produto = new Produto();
var excluir = new Produto();