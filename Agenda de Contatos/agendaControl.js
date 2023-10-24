import { Contato } from "./Contato.js";

const vetContatos = new Array();

export function acrescentarContato(descNome, descEndereco, descTelefone, descCpf, dtNascimento) {
    let contato = pesquisarContato(descNome);

    if (contato == null) { //indica que contato não existe no vetor
        contato = new Contato(descNome, descEndereco, descTelefone, descCpf, dtNascimento);
        vetContatos.push(contato);
        return true;
    }
    return false;
}

export function pesquisarContato(nome) {
    //retorna o contato pesquisado ou null se produto não cadastrado
    let contatoAux = null;
    for (let i = 0; i < vetContatos.length && contatoAux == null; i++) {
        if (vetContatos[i].name == nome.toUpperCase()) {
            contatoAux = vetContatos[i];
        }
    }
    return contatoAux;
}

function posicaoContato(nome) {
    //retorna a posição do contato pesquisado ou -1 se contato não cadastrado
    let posicao = -1;
    for (let i = 0; i < vetContatos.length && posicao == -1; i++) {
        if (vetContatos[i].name == nome.toUpperCase()) {
            posicao = i;
        }
    }
    return posicao;
}

export function excluirContato(nome){
    let posicao = posicaoContato(nome);

    if(posicao >= 0){
        vetContatos.splice(posicao, 1);
        return true;
    }
    return false; 
}

export function alterarContato(nome, endereco, telefone, dtNascimento){
    let posicao = posicaoContato(nome);

    if(posicao >= 0){
        vetContatos[posicao].address = endereco;
        vetContatos[posicao].phone = telefone;
        vetContatos[posicao].birthDay = dtNascimento;
        return true;
    }
    return false; 
}

export function criarTableContatosHtml() {
    //esta function retorna null caso haja erro nos parâmetros
    //por exemplo: vetContato não tenha elementos ou tamanho
    // de vetVendas do produto e vetInfor não compatíveis.

    if (vetContatos.length > 0) {
        var table = document.createElement("table");
        var thead = document.createElement("thead");
        var tbody = document.createElement("tbody");

        // criando as colunas de preço, estoque e venda semestral
        var vetTableHead = ["Nome", "Endereço", "Telefone", "CPF", "Data de Nascimento"];
        for (let i = 0; i < vetTableHead.length; i++) {
            let th = document.createElement("th");
            th.textContent = vetTableHead[i];
            thead.appendChild(th);
        }

        table.appendChild(thead);

        for (let lin = 0; lin < vetContatos.length; lin++) {
            let tr = document.createElement("tr");

            let tdNome = document.createElement("td");
            tdNome.textContent = vetContatos[lin].name;

            let tdEndereco = document.createElement("td");
            tdEndereco.textContent = vetContatos[lin].address;

            let tdTelefone = document.createElement("td");
            tdTelefone.textContent = vetContatos[lin].phone;

            let tdCPF = document.createElement("td");
            tdCPF.textContent = vetContatos[lin].cpf;

            let tdDataNascimento = document.createElement("td");
            tdDataNascimento.textContent = vetContatos[lin].birthDay;

            tr.appendChild(tdNome);
            tr.appendChild(tdEndereco);
            tr.appendChild(tdTelefone);
            tr.appendChild(tdCPF);
            tr.appendChild(tdDataNascimento);

            tbody.appendChild(tr);

        }
        table.appendChild(tbody);

        return table;
    } else {
        return null;
    }
}

export function salvarContatos(){
    if (vetContatos.length > 0){
        var strFormatoJson = "[" + vetContatos[0].stringify();
        for(let i=1; i < vetContatos.length; i++){
            strFormatoJson += "," + vetContatos[i].stringify();
        }
        strFormatoJson += "\n]";
        
        localStorage.setItem("contatos", strFormatoJson)
        return true;

    } else {
        console.log ("Vetor de Contatos Vazio! Arquivo não gravado!")
        return false;
    }
}

export function carregarContatos() {
    let vetDadosContatos = [];
    if (localStorage.hasOwnProperty("contatos")) {
        vetDadosContatos = JSON.parse(localStorage.getItem("contatos"));
    }
    
    if (vetDadosContatos.length > 0) {
        for(let i=0; i < vetDadosContatos.length; i++){
            vetContatos.push(new Contato(vetDadosContatos[i].name, vetDadosContatos[i].address,
                vetDadosContatos[i].phone, vetDadosContatos[i].cpf, vetDadosContatos[i].birthDay));
        }
    }
}
