
// Campos do formulario
const campos_form = [
    {id:'nome', label:'Nome', type:'text', placeholder:'Informe o nome do paciente' },
    {id:'cpf', label:'Cpf', type:'text', placeholder:'Informe o cpf do paciente'},
    {id:'telefone', label:'Telefone', type:'text', placeholder:'Informe o telefone'},
    {id:'data_nascimento', label:'Data de nascimento', type:'Date', placeholder:'Informe a data de nascimento'},
    {id:'sexo', label:'Sexo', type:'text', placeholder:'Informe o sexo'},
    {id:'endereco', label:'Endereço', type:'text', placeholder:'Informe o endereço'}
];

const campos_form_update = [
    {id:'id', label:'ID Paciente', type:'text', placeholder:'Informe o id do paciente' },
    {id:'nome', label:'Nome', type:'text', placeholder:'Informe o nome do paciente' },
    {id:'cpf', label:'Cpf', type:'text', placeholder:'Informe o cpf do paciente'},
    {id:'telefone', label:'Telefone', type:'text', placeholder:'Informe o telefone'},
    {id:'data_nascimento', label:'Data de nascimento', type:'Date', placeholder:'Informe a data de nascimento'},
    {id:'sexo', label:'Sexo', type:'text', placeholder:'Informe o sexo'},
    {id:'endereco', label:'Endereço', type:'text', placeholder:'Informe o endereço'}
];

const campos_form_delete = [
    {id:'id', label:'ID Paciente', type:'text', placeholder:'Informe o id do paciente' }
]

const URL_PACIENTE_CADASTRAR = 'http://localhost:8080/paciente/cadastrar';
const URL_PACIENTE_ATUALIZAR = 'http://localhost:8080/paciente/atualizar';

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
    let tem_error = false;

    console.log(data);

    campos_form.forEach(campo =>{
        const inputElemento = document.getElementById(campo.id); 
        const valor = inputElemento.value;
        data[campo.id] = valor;


        const p = inputElemento.parentElement.querySelector("p");
        p.innerHTML="";

        if(!valor){
            p.innerHTML=`campo ${campo.id} obrigatório`
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
        const res = await fetch(URL_PACIENTE_CADASTRAR,{
            method: 'POST',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        console.log("Status da resposta:", res.status);

        if(res.ok && res.status === 201){
            alert("Paciente cadastrado com sucesso!!!")
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
        p.classList.add("mensagem-error")
        cortador.appendChild(p);
        
        form.appendChild(cortador);
    })

    const h2 = document.createElement("h2");
    h2.innerHTML = "Cadastrar Paciente";

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
            tem_error = true
        }
        
        if(campo.id === 'cpf' && valor.length != 12){
            p.innerHTML = "O cpf deve ter 12 digitos"
            tem_error = true;
        }
    });

    if(tem_error){return;}

    try {
        const res = await fetch(URL_PACIENTE_ATUALIZAR, {
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
            alert("Paciente atualizado com sucesso!");
            p.innerHTML = "";
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
        input = document.createElement("input");
        input.type = campo.type;

        input.placeholder = campo.placeholder || '';
    input.id = campo.id;
    cortador.appendChild(input);

    let p;
    p = document.createElement("p");
    p.classList.add("mensagem-error")
    cortador.appendChild(p);
    
    form.appendChild(cortador);
    })

    const h2 = document.createElement("h2");
    h2.innerHTML = "Atualizar Paciente";

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

    const URL_PACIENTE_DELETAR = `http://localhost:8080/paciente/deletar/${idValue}`;

    try {
        const res = await fetch(URL_PACIENTE_DELETAR, {
            method: 'DELETE',
        });

        console.log("Status da resposta:", res.status);

        if (res.status === 204 ) {
            const responseText = await res.text();
            const resp = responseText ? JSON.parse(responseText) : null;
            alert("Paciente deletado com sucesso!");
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
    h2.innerHTML = "Deletar Paciente";

    criarButtonDelete(form);
    container_form_geral.append(h2);
    container_form_geral.append(form);
}


