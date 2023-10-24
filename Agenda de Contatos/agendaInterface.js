import { carregarContatos, acrescentarContato, excluirContato, alterarContato, salvarContatos, criarTableContatosHtml, pesquisarContato} from "./agendaControl.js";
import { Contato } from "./Contato.js";

var inNome = document.getElementById("inNome");
var inEndereço = document.getElementById("inEndereço");
var inTelefone = document.getElementById("inTelefone");
var inCpf = document.getElementById("inCpf");
var inDtNascimento = document.getElementById("inDtNascimento");

var btOk = document.getElementById("btOk");

var outResultado = document.getElementById("outResultado");

var selectOpcao = document.getElementById("selectOpcao");

var sectionResultado = document.querySelector(".sectionResultado");

document.addEventListener("DOMContentLoaded", carregarContatos());

btOk.addEventListener("click", executarFunc);

selectOpcao.addEventListener("change", function () {
    let opcao = selectOpcao.value;

    if (opcao != "") {
        verificarOpcao(opcao);
    }
});

function verificarOpcao(opcao) {
    inNome.disabled = false;
    inNome.placeholder = "Digite um nome";
    inNome.value = "";
    inDtNascimento.disabled = true;
    inDtNascimento.placeholder = "";
    inDtNascimento.value = "";
    inCpf.disabled = true;
    inCpf.placeholder = "";
    inCpf.value = "";
    inTelefone.disabled = true;
    inTelefone.placeholder = "";
    inTelefone.value = "";
    inEndereço.disabled = true;
    inEndereço.placeholder = "";
    inEndereço.value = "";
    outResultado.textContent = "";
    sectionResultado.textContent = "";


    switch (opcao) {
        case "Cadastrar":
            inEndereço.disabled = false;
            inEndereço.placeholder = "Digite o Endereço do Contato";
            inTelefone.disabled = false;
            inTelefone.placeholder = "(XX) XXXXX - XXXX";
            inCpf.disabled = false;
            inCpf.placeholder = "XXX.XXX.XXX - XX";
            inDtNascimento.disabled = false;
            inDtNascimento.placeholder = "XX/XX/XXXX";
            break;
        /* Excluir precisa somente do campo Nome habilitado
        case "Excluir":
            inNome.disabled = false;
            inNome.placeholder = "Digite um nome";
            break;
        */
        case "Alterar":
            inEndereço.disabled = false;
            inEndereço.placeholder = "Digite o Endereço do Contato";
            inTelefone.disabled = false;
            inTelefone.placeholder = "(XX) XXXXX - XXXX";
            inCpf.disabled = true;
            inCpf.placeholder = "";
            inDtNascimento.disabled = false;
            inDtNascimento.placeholder = "XX/XX/XXXX";
            break;
        /* Consultar precisa somente do campo Nome habilitado
        case "ConsultarDados":
            inEndereço.disabled = false;
            inEndereço.placeholder = "Digite um mês [1-6]";
            break;
        */
       
        case "Listar":
        case "Salvar":
            inNome.disabled = true;
            inNome.placeholder = "";
            inNome.value = "";       
    }
}

function executarFunc() {
    let opcao = selectOpcao.value;
    let descNome = (inNome.value);
    let descEndereco = (inEndereço.value);
    let descTelefone = (inTelefone.value);
    let descCpf = (inCpf.value);
    let dtNascimento = (inDtNascimento.value);
    
    let contatoAux;
    let contatoAuxi;

    switch (opcao) {
        case "Listar":
            let htmlTable = criarTableContatosHtml();
            if (htmlTable != null) {
                sectionResultado.appendChild(htmlTable);
            } else {
                outResultado.style.color = "red";
                outResultado.textContent = "Erro!";
                sectionResultado.innerHTML = "";
            }
            break;

        case "Cadastrar":
            if (descNome == "" && descEndereco == "" && descTelefone == "" && descCpf == "" && dtNascimento == "") {
                outResultado.style.color = "red";
                outResultado.textContent = "Para acrescentar Contato novo, o campo deve ser preenchido!";
                inNome.focus();
            } else {
                if (acrescentarContato(descNome, descEndereco, descTelefone, descCpf, dtNascimento) == true) {
                    outResultado.style.color = "blue";
                    outResultado.textContent = "O novo Contato foi acrescentado com sucesso!";

                } else {
                    outResultado.style.color = "red";
                    outResultado.textContent = "Erro! O Contato " + descNome + " já estava cadastrado!";
                    inNome.focus();
                }
            }
            break;

        case "Excluir":
            if (excluirContato(descNome) == true) {
                outResultado.style.color = "blue";
                outResultado.textContent = "O Contato foi excluido com sucesso!";
            } else {
                outResultado.style.color = "red";
                outResultado.textContent = "Erro! O Contato " + descNome + " não foi excluido!";
                inNome.focus();
            }
            break;
        
        case "Alterar":
            let contatoAux = pesquisarContato(descNome);

            if (contatoAux != null) {

                descEndereco = (descEndereco != "") ? descEndereco : contatoAux.address;
                descTelefone = (descTelefone != "") ? descTelefone : contatoAux.phone;
                dtNascimento = (dtNascimento != "") ? dtNascimento : contatoAux.birthDay;
                
                alterarContato (descNome, descEndereco, descTelefone, dtNascimento);
                
                outResultado.style.color = "blue";
                outResultado.textContent = "O Contato foi alterado com sucesso!";
            } else {
                outResultado.style.color = "red";
                outResultado.textContent = "Erro! O Contato " + descNome + " não foi alterado!";
                inNome.focus();
            }
            break;
                
        case "Salvar":
            if (salvarContatos() == true) {
                outResultado.style.color = "blue";
                outResultado.textContent = "Sucesso ao Salvar Lista de Contatos!";
            } else {
                outResultado.style.color = "red";
                outResultado.textContent = "Erro! Contatos não Salvos no Arquivo!";;
            }
            break;
        case "ConsultarDados":
            let contatoAuxi = pesquisarContato(descNome);

            if(contatoAuxi != null){
                outResultado.textContent = contatoAux.name + "/n" +
                                           contatoAux.phone + "/n" +
                                           contatoAux.address + "/n" +
                                           contatoAux.cpf + "/n" +
                                           contatoAux.birthDay + "/n"
            }else{
                outResultado.textContent = "Erro! Dados não consultados no Arquivo!";
            }
            break
        default:
            alert("Faltou selecionar uma opção de funcionalidade!");
    }

}


