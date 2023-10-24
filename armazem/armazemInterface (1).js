/*
Autor: Lucas Miguel e David de Oliveira
Versão: 2.0
Descrição: Aplicação para gerenciamento de um armazém utilizando matrizes
 */

import {
    vetProdutos, vetMeses, carregarDados, criarTableHtml,
    acrescentarProduto, excluirProduto, alterarProduto, consultarQtd,
    produtoMaisVendidoMes, filtrarProdsQuantEstoque, pesquisarProdVet
} from "./armazemOperacoes.js";

var inProduto = document.getElementById("inProduto");
var inMes = document.getElementById("inMes");
var inQtd = document.getElementById("inQtd");

var btOk = document.getElementById("btOk");

var outResultado = document.getElementById("outResultado");

var selectOpcao = document.getElementById("selectOpcao");

var sectionResultado = document.querySelector(".sectionResultado");

document.addEventListener("DOMContentLoaded", carregarDados);

btOk.addEventListener("click", executarFunc);

selectOpcao.addEventListener("change", function () {
    let opcao = selectOpcao.value;

    if (opcao != "") {
        verificarOpcao(opcao);
    }
});

function verificarOpcao(opcao) {
    inProduto.disabled = true;
    inProduto.placeholder = "";
    inProduto.value = "";
    inQtd.disabled = true;
    inQtd.placeholder = "";
    inQtd.value = "";
    inMes.disabled = true;
    inMes.placeholder = "";
    inMes.value = "";

    outResultado.textContent = "";
    sectionResultado.textContent = "";


    switch (opcao) {
        case "Acrescentar":
            inProduto.disabled = false;
            inProduto.placeholder = "Digite um produto";
            inMes.disabled = true;
            inQtd.disabled = false;
            inQtd.placeholder = "Digite a quantidade vendida no mês";

        case "Excluir":
            inProduto.disabled = false;
            inProduto.placeholder = "Digite um produto";
            inMes.disabled = true;
            inQtd.disabled = true;
            break;
        case "Alterar":
            inProduto.disabled = false;
            inProduto.placeholder = "Digite um produto";
            inMes.disabled = false;
            inMes.placeholder = "Digite um mês [1-6]";
            inQtd.disabled = false;
            inQtd.placeholder = "Digite a quantidade vendida no mês";
            break;

        case "ConsultarQtd":
            inProduto.disabled = false;
            inProduto.placeholder = "Digite um produto";
            break;
        case "ConsultarProd":
            inMes.disabled = false;
            inMes.placeholder = "Digite um mês [1-6]";
        case "FiltrarQtdEst":
            inQtd.disabled = false;
            inQtd.placeholder = "Digite filtro quant. estoque";
    }
}

function executarFunc() {
    let opcao = selectOpcao.value;
    let descrProduto = (inProduto.value).toUpperCase();
    let mes = Number(inMes.value);
    let quantidade = Number (inQtd.value);   

    switch (opcao) {
        case "Acrescentar":
        
            if (descrProduto == "") {
                outResultado.style.color = "red";
                outResultado.textContent = "Para acrescentar produto novo, o campo deve ser preenchido!";
                inProduto.focus();
            } else {
                if (acrescentarProduto(descrProduto) == true) {
                    outResultado.style.color = "blue";
                    outResultado.textContent = "O novo produto foi acrescentado com sucesso!";
                } else {
                    outResultado.style.color = "red";
                    outResultado.textContent = "Erro! O produto " + descrProduto + " já estava cadastrado!";
                    inProduto.focus();
                }
            }
            break;

        case "Excluir":
            if (descrProduto == ""){
                outResultado.style.color = "red";
                outResultado.textContent = "Para excluir um produto, o campo deve ser preenchido!";
                inProduto.focus();
            } else {
                if (excluirProduto(descrProduto)){
                    outResultado.style.color = "blue";
                    outResultado.textContent = "O produto " + descrProduto + " foi excluído dos registros do Armazém!";
                } else {
                    outResultado.style.color = "red";
                    outResultado.textContent = "O produto que deseja excluir não está cadastrado ou tem quantidade em estoque!";
                }
            }
            break;

        case "Alterar": 
            if(mes < 1 || mes > 6){
                outResultado.style.color = "red";
                outResultado.textContent = "Ops, digite um mês de 1-6!";
                inMes.focus();
            } else {
                if (inQtd.value == "" || quantidade < 0){
                    outResultado.style.color = "red";
                    outResultado.textContent = "Para alterar quantidade vendida, o campo Quantidade deve ser preenchido com valor >= 0 !";
                    inQtd.focus();
                }else {
                    let produto = alterarProduto(descrProduto,mes,quantidade);
                    if (produto != null) {
                        outResultado.style.color = "blue";
                        outResultado.textContent = "O produto " + produto.descricao + " foi alterado no mês " + mes + " tendo como quantidade vendida : " + produto.getQtdVendasMes(mes);
                    } else {
                        outResultado.style.color = "red";
                        outResultado.textContent = "O produto que deseja alterar não está cadastrado";
                    }   
                }
            }
            break;
        
        case "Listar":
            let htmlTable = criarTableHtml(vetProdutos, vetMeses);
            if (htmlTable != null){
                sectionResultado.appendChild(htmlTable);
            } else {
                outResultado.style.color = "red";
                outResultado.textContent = "Erro! Divergência entre os dados do vetor de Produtos e de Mêses!";
            }
            break;

        case "ConsultarQtd":
            
                if (descrProduto == "") {
                    outResultado.style.color = "red";
                    outResultado.textContent = "Para consultar a quantidade deve-se preencher o campo Produto!";
                    inProduto.focus();
    
                } else {
                    let somaVendasProduto = consultarQtd(descrProduto, 1, 6);
                    if (somaVendasProduto >= 0) {
                        outResultado.style.color = "blue";
                        outResultado.textContent = "O produto " + descrProduto + " vendeu " + somaVendasProduto + " unidades no semestre."
                    } else {
                        outResultado.style.color = "red";
                        outResultado.textContent = "Erro! O produto " + descrProduto + " não existe!";
                        inProduto.focus();
                    }
                }
                break;

        case "ConsultarProd" :
            if(mes <= 0 || mes > 6){
                outResultado.style.color = "red";
                outResultado.textContent = "Ops! digite o mês de 1-6";
                inMes.focus();
            } else {
                let produto = produtoMaisVendidoMes(mes);
                outResultado.style.color = "blue";
                outResultado.textContent = "O produto mais vendido no mês " + vetMeses[mes-1] + " foi: "
                                            + produto.descricao
                                            + " => " + produto.getQtdVendasMes(mes) + " unidades";
            }
        break;
        case "FiltrarQtdEst":
            if (inQtd.value == "" || quantidade < 0){
                outResultado.style.color = "red";
                outResultado.textContent = "Para filtrar produtos por quant. em estoque, o campo Quantidade deve ser preenchido com valor >= 0 !";
                inQtd.focus();
            }else {
                let htmlTable = filtrarProdsQuantEstoque(quantidade);
                if (htmlTable != null){
                    sectionResultado.appendChild(htmlTable);
                } else {
                    outResultado.style.color = "red";
                    outResultado.textContent = "Erro! Não há produtos com até " + quantidade + " unidades em estoque!";
                }
                break;
            }
    }
}