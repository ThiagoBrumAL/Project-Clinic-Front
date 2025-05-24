
// Campos do formulario
const campos_form = [
    {id:'nome', label:'Nome', type:'text', placeholder:'Informe o nome do medico' },
    {id:'crm', label:'Crm', type:'text', placeholder:'Informe o crm do medico'},
    {id:'telefone', label:'Telefone', type:'text', placeholder:'Informe o telefone'},
    {id:'email', label:'Email', type:'text', placeholder:'Informe o email'},
    {id:'id_especialidade', label:'ID Especialidade', type:'text', placeholder:'Informe o id da especialidade'}
];

const campos_form_update = [
    {id:'id', label:'ID Medico', type:'text', placeholder:'Informe o id do medico' },
    {id:'nome', label:'Novo nome', type:'text', placeholder:'Informe o novo nome' },
    {id:'crm', label:'Novo crm', type:'text', placeholder:'Informe o novo crm'},
    {id:'telefone', label:'Novo telefone', type:'text', placeholder:'Informe o novo telefone'},
    {id:'email', label:'Novo Email', type:'text', placeholder:'Informe o novo email'},
    {id:'id_especialidade', label:'Novo id especialidade', type:'text', placeholder:'Informe id' }
];


const campos_form_delete = [
    {id:'id', label:'ID medico', type:'text', placeholder:'Informe o id do medico' }
]



const URL_MEDICO_CADASTRAR = 'http://localhost:8080/medico/cadastrar';
const URL_MEDICO_ATUALIZAR = 'http://localhost:8080/medico/atualizar';

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

    let tem_error = false;

    console.log(data);

    campos_form.forEach(campo =>{
        const inputElemento = document.getElementById(campo.id); 
        const valor = inputElemento.value;
        data[campo.id] = valor;


        const p = inputElemento.parentElement.querySelector("p");
        p.innerHTML="";

        if(!valor){
            p.innerHTML=`campo ${campo.id} obrigatório`;
            tem_error = true;
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

    if(tem_error){return;}

    
    try{
        const res = await fetch(URL_MEDICO_CADASTRAR,{
            method: 'POST',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        console.log("Status da resposta:", res.status);

        if(res.ok && res.status === 201){
            alert("Medico cadastrado com sucesso!!!")
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
    h2.innerHTML = "Cadastrar Medico";

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

    let tem_error = false;

    campos_form_update.forEach(campo => {
        const inputElemento = document.getElementById(campo.id);
        const valor = inputElemento.value;
        data[campo.id] = valor;

        const p = inputElemento.parentElement.querySelector("p");
        p.innerHTML="";

        if(!valor){
            p.innerHTML=`campo ${campo.id} obrigatório`;
            tem_error = true;
        }
        
        if(campo.id === 'cpf' && valor.length != 12){
            p.innerHTML = "O cpf deve ter 12 digitos"
            tem_error = true;
        }

        if(!data.data_nascimento){
            console.log(data.data_nascimento);
            tem_error = true;
        }
    });

    if(tem_error){return;}

    try {
        const res = await fetch(URL_MEDICO_ATUALIZAR, {
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
            alert("Medico atualizado com sucesso!");
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
        cortador.classList.add("wrapper");
        cortador.classList.add(campo.id);

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
    h2.innerHTML = "Atualizar Medico";

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

    const URL_CONSULTA_DELETAR = `http://localhost:8080/medico/deletar/${idValue}`;

    try {
        const res = await fetch(URL_CONSULTA_DELETAR, {
            method: 'DELETE',
        });

        console.log("Status da resposta:", res.status);

        if (res.status === 204 ) {
            const responseText = await res.text();
            const resp = responseText ? JSON.parse(responseText) : null;
            alert("Medico deletado com sucesso!");
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
    h2.innerHTML = "Deletar Medico";

    criarButtonDelete(form);
    container_form_geral.append(h2);
    container_form_geral.append(form);
}



