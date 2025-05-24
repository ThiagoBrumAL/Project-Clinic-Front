
//Campos para criar o formulario 
const campos_form = [
    {id:'id_medico', label:'ID medico', type:'text', placeholder:'Informe o id do medico' },
    {id:'id_paciente', label:'ID paciente', type:'text', placeholder:'Informe o id do paciente'},
    {id:'data', label:'Data', type:'Date', placeholder:'Informe a data'},
    {id:'hora', label:'Hora', type:'Time', placeholder:'Informe a hora'}
];

const campos_form_update = [
    {id:'id', label:'ID consulta', type:'text', placeholder:'Informe o id da consulta' },
    {id:'id_medico', label:'ID medico', type:'text', placeholder:'Informe o id do medico' },
    {id:'id_paciente', label:'ID paciente', type:'text', placeholder:'Informe o id do paciente'},
    {id:'data', label:'Data', type:'date', placeholder:'Informe a data'},
    {id:'hora', label:'Hora', type:'time', placeholder:'Informe a hora'},
    {id:'status', label:'Status', type:'text', placeholder:'Informe o status da consulta' }
];

const campos_form_delete = [
    {id:'id', label:'ID consulta', type:'text', placeholder:'Informe o id da consulta' }
]

const URL_CONSULTA_CADASTRAR = 'http://localhost:8080/paciente/consulta/cadastrar';
const URL_CONSULTA_ATUALIZAR = 'http://localhost:8080/paciente/consulta/atualizar';

function converterDataISOParaDB(data,hora){
    return `${data}T${hora}:00`;
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
            p.innerHTML=`campo ${campo.id} obrigatório`;
            temErro = true;
        }

        data[campo.id] = valor;
    });

    if(temErro){return}

    const dataISO = converterDataISOParaDB(data.data, data.hora);

    data.data_hora = dataISO;
    
    delete data.data;
    delete data.hora;
    
    try{
        const res = await fetch(URL_CONSULTA_CADASTRAR,{
            method: 'POST',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        console.log("Status da resposta:", res.status);

        if(res.ok && res.status === 201){
            alert("Consulta cadastrada com sucesso!!!")
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
    h2.innerHTML = "Criar Consulta";

    criarButton(form)
    container_form_geral.append(h2);
    container_form_geral.append(form);
}



































/* Update */

async function enviarAtualizacao() {
    let data = {};
    let temErro = false;

    campos_form_update.forEach(campo => {
        const inputElemento = document.getElementById(campo.id);
        const valor = inputElemento.value;
        data[campo.id] = valor;

        const p = inputElemento.parentElement.querySelector("p");
        p.innerHTML="";

        if(!valor){
            p.innerHTML=`campo ${campo.id} obrigatório`;
            temErro = true;
        }
        
        if(campo.id === 'cpf' && valor.length != 12){
            p.innerHTML = "O cpf deve ter 12 digitos"
            tem_error = true;
        }

        if(!data.data_nascimento){
            console.log(data.data_nascimento);
            return;
        }
    });

    if(temErro){return;}

    const dataISO = converterDataISOParaDB(data.data, data.hora);
    data.data_hora = dataISO;

    delete data.data;
    delete data.hora;

    try {
        const res = await fetch(URL_CONSULTA_ATUALIZAR, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        console.log("Status da resposta:", res.status);

        if (res.status === 201 ) {
            const responseText = await res.text();
            const resp = responseText ? JSON.parse(responseText) : null;
            alert("Consulta atualizada com sucesso!");
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


function criarFormularioUpdate(){

    ocultarTexto();

    renderizarForm();

    limparForm();

    const container_form_geral = document.querySelector(".container-form-geral");
    const form = document.createElement("form");
    form.id = "formUpdate";

    campos_form_update.forEach(campo =>{
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
    h2.innerHTML = "Atualizar Consulta";

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

    p.innerHTML = "";

    if(!idValue.trim()){
        p.innerHTML = "Campo ID obrigatorio"; 
        return;
    }

    const URL_CONSULTA_DELETAR = `http://localhost:8080/paciente/consulta/deletar/${idValue}`;

    try {
        const res = await fetch(URL_CONSULTA_DELETAR, {
            method: 'DELETE',
        });

        console.log("Status da resposta:", res.status);

        if (res.status === 204 ) {
            const responseText = await res.text();
            const resp = responseText ? JSON.parse(responseText) : null;
            alert("Consulta deletada com sucesso!");
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
    h2.innerHTML = "Deletar Consulta";

    criarButtonDelete(form);
    container_form_geral.append(h2);
    container_form_geral.append(form);
}