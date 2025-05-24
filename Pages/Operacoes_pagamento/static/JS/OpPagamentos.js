
const campos_form = [
    {id:'id_consulta', label:'ID Consulta', type:'text', placeholder:'Informe o id da consulta' },
    {id:'valor', label:'Valor', type:'text', placeholder:'Informe o valor da consulta'},
    {id:'formaPagamento', label:'Forma de pagamento', type:'select', options:["CARTAO_CREDITO","CARTAO_DEBITO","PIX","DINHEIRO","OUTRO"]},
];

const campos_form_update = [
    {id:'id_pagamento', label:'ID Pagamento', type:'text', placeholder:'Informe o id do pagamento' },
    {id:'id_consulta', label:'ID Consulta', type:'text', placeholder:'Informe o id da consulta' },
    {id:'valor', label:'Valor', type:'text', placeholder:'Informe o valor da consulta'},
    {id:'formaPagamento', label:'Forma de pagamento', type:'select', options:["CARTAO_CREDITO","CARTAO_DEBITO","PIX","DINHEIRO","OUTRO"]},
    {id:'status', label:'Definir Status', type:'select', options:["PAGO","PENDENTE","CANCELADO"]},
];


const campos_form_delete = [
    {id:'id', label:'ID Paciente', type:'text', placeholder:'Informe o id do paciente' }
]

const URL_PAGAMENTO_CADASTRAR = 'http://localhost:8080/paciente/consulta/pagamentos/cadastrar';
const URL_PAGAMENTO_ATUALIZAR = 'http://localhost:8080/paciente/consulta/pagamentos/atualizar';

function converterDataISOParaDB(data,hora){
    return `${data}T${hora}:00`;
}

function converterApenasData(data){
    const [dia,mes,ano] = data.split("/");
    const value = `${ano}-${mes}-${dia}`;
    return value;
}
function limparForm() {
    const container = document.querySelector(".container-form-geral");
    container.innerHTML = "";
}

function limparCampos(formId){
    const inputs = document.querySelectorAll(`#${formId} input`)
    inputs.forEach(input=>{
        input.value ="";
    })
}

function ocultarTexto(){
    document.querySelector(".complementar").classList.add("visible");
}

function renderizarForm(){
    document.querySelector(".container-form-geral").classList.add("visibleForm");
}


































/* Build */

function criarButton(form){
    const button = document.createElement("button");
    button.innerText = "Build";
    button.type = "button";

    button.classList.add("btn-build")

    button.addEventListener("click",()=>{
        enviarCadastro();
    })
    form.appendChild(button);
}

async function enviarCadastro(){
    let data = {};

    let temErro = false;

    console.log(data);

    campos_form.forEach(campo =>{
        const inputElemento = document.getElementById(campo.id);
        const valor = inputElemento.value;

        const p = inputElemento.parentElement.querySelector("p");
        p.innerHTML="";

        if(!valor){
            p.innerHTML=`campo ${campo.id} obrigatório`
            temErro = true;
        }

        data[campo.id] = valor;
    });
    
    if(temErro){return}
    try{
        const res = await fetch(URL_PAGAMENTO_CADASTRAR,{
            method: 'POST',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        console.log("Status da resposta:", res.status);

        if(res.ok && res.status === 201){
            const resposta = await res.json()
            alert("Pagamento registrado com sucesso!!!")
            limparCampos("formBuild");
        }else{
            const error = await res.text();
            console.log(error);
        }
        
    }catch(err){
        console.log(`Error:${err}`);
    }
}

function criarFormularioBuild(){

    ocultarTexto();
    renderizarForm();
    limparForm();
    
    const container_form_geral = document.querySelector(".container-form-geral");
    const form = document.createElement("form");
    form.id = "formBuild";

    campos_form.forEach(campo =>{
        const cortador = document.createElement("div");

        const label = document.createElement("label");
        label.innerHTML = campo.label;
        cortador.classList.add("wrapper");
        cortador.classList.add(campo.id);
        cortador.appendChild(label);

        let input;
        if (campo.type === "select") {
            input = document.createElement("select");
            campo.options.forEach(optionValue => {
                const option = document.createElement("option");
                option.value = optionValue;
                option.text = optionValue;
                input.appendChild(option);
        });
        } else {
            input = document.createElement("input");
            input.type = campo.type;
            input.placeholder = campo.placeholder || '';
        }

        input.placeholder = campo.placeholder || '';
        input.id = campo.id;
        cortador.appendChild(input);
        let p;
        p = document.createElement("p");
        p.classList.add("mensagem-error");
        cortador.appendChild(p);
        form.appendChild(cortador);
    })

    const h2 = document.createElement("h2");
    h2.innerHTML = "Registrar Pagamento";

    criarButton(form)
    container_form_geral.append(h2);
    container_form_geral.append(form);
}











































/* Update */

function criarButtonUpdate(form){
    const button = document.createElement("button");
    button.innerText = "Update";
    button.type = "button";

    button.classList.add("btn-update")

    button.addEventListener("click",()=>{
        enviarAtualizacao();
    })
    form.appendChild(button);
}

async function enviarAtualizacao() {
    let data = {};

    let temErro = false;

    campos_form_update.forEach(campo=>{
        const inputElemento = document.getElementById(campo.id);
        const valor = inputElemento.value;

        const p = inputElemento.parentElement.querySelector("p");
        p.innerHTML="";

        if(!valor){
            p.innerHTML=`campo ${campo.id} obrigatório`;
            temErro = true;
        }

        data[campo.id] = valor;
    })

    if(temErro){return}

    try {
        const res = await fetch(URL_PAGAMENTO_ATUALIZAR, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        console.log("Status da resposta:", res.status);

        if (res.status === 200 ) {
            const responseText = await res.text();
            const resp = responseText ? JSON.parse(responseText) : null;
            alert("Pagamento atualizado com sucesso!");
            limparCampos("formUpdate")
        } else {
            console.log(data)
            const error = await res.text();
            console.log("Erro ao atualizar:", error);
        }

    } catch (err) {
        console.log(`Erro na requisição: ${err}`);
    }
}

function criarFormularioUpdate(){

    ocultarTexto();
    renderizarForm();
    limparForm();

    const container_form_geral = document.querySelector(".container-form-geral");
    const form = document.createElement("form");
    form.id = "formUpdate";

    campos_form_update.forEach(campo =>{
        const cortador = document.createElement("div");
        cortador.classList.add(campo.id);
        cortador.classList.add("wrapper")

        const label = document.createElement("label");
        label.innerHTML = campo.label;
        cortador.appendChild(label);

        let input;

        if(campo.type === "select"){
            input = document.createElement("select");
            campo.options.forEach(optionValue =>{
                const option = document.createElement("option");
                option.value = optionValue;
                option.text = option.value;
                input.appendChild(option)
            })
        }else{
            input = document.createElement("input");
            input.type = campo.type;
            input.placeholder = campo.placeholder || '';
        }
    input.id = campo.id;
    cortador.appendChild(input);
    let p;
    p = document.createElement("p");
    p.classList.add("mensagem-error");
    cortador.appendChild(p);
    form.appendChild(cortador);
    })

    const h2 = document.createElement("h2");
    h2.innerHTML = "Atualizar Pagamento";

    criarButtonUpdate(form);
    container_form_geral.append(h2);
    container_form_geral.append(form);
}








































/* Delete */

function criarButtonDelete(form){
    const button = document.createElement("button");
    button.innerText = "Delete";
    button.type = "button";

    button.classList.add("btn-Delete")

    button.addEventListener("click",()=>{
        enviarDeletar();
    })
    form.appendChild(button);
}

async function enviarDeletar() {
    
    const id = document.getElementById("id");
    const idValue = id.value;
    const p = id.parentElement.querySelector("p");
    
    if(!idValue.trim()){
        p.innerHTML = "ID obrigatorio"
        return;
    }

    const URL_PAGAMENTO_DELETAR = `http://localhost:8080/paciente/consulta/pagamentos/deletar/${idValue}`;

    try {
        const res = await fetch(URL_PAGAMENTO_DELETAR, {
            method: 'DELETE',
        });

        console.log("Status da resposta:", res.status);

        if (res.status === 204 ) {
            const responseText = await res.text();
            const resp = responseText ? JSON.parse(responseText) : null;
            alert("Pagamento deletado com sucesso!");
            p.innerHTML = "";
            limparCampos("formDelete");
        } else {
            console.log(data)
            const error = await res.text();
            console.log("Erro ao atualizar:", error);
        }

    } catch (err) {
        console.log(`Erro na requisição: ${err}`);
    }
}

function criarFormularioDelete(){

    ocultarTexto();
    renderizarForm();
    limparForm();

    const container_form_geral = document.querySelector(".container-form-geral");
    const form = document.createElement("form");
    form.id = "formDelete";

    campos_form_delete.forEach(campo =>{
        const cortador = document.createElement("div");
        cortador.classList.add("wrapper")

        const label = document.createElement("label");
        label.innerHTML = campo.label;
        cortador.appendChild(label);

        let input;
        input = document.createElement("input");
        input.type = campo.type;

        input.placeholder = campo.placeholder || '';
    input.id = campo.id;
    cortador.appendChild(input);
    let p;
    p = document.createElement("p");
    p.classList.add("mensagem-error");
    cortador.appendChild(p);
    form.appendChild(cortador);
    })

    const h2 = document.createElement("h2");
    h2.innerHTML = "Excluir Pagamento";

    criarButtonDelete(form);
    container_form_geral.append(h2);
    container_form_geral.append(form);
}