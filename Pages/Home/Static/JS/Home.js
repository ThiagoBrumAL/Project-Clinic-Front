

function logout(){
    window.location = "../Login/Login.html"
}
document.querySelector(".side-bar-btn").addEventListener('click', () => {
    const side_bar = document.querySelector(".side-bar");
    side_bar.classList.toggle("visible");
});

function ocultarTexto(){
    document.querySelector(".container-sobre").classList.add("visible");
    document.querySelector(".container-section-text-title").classList.add("visible");
}

function mostrarTabela(){
    const tabela = document.querySelector("#tabelaGeral");
    tabela.classList.add("visibleTable");
}

//Medicos

const URL_MEDICOS = 'http://localhost:8080/medico/listar';
async function listarMedicos() {
    try{
        const res = await fetch(URL_MEDICOS);
        if(res.status === 200){
            const obj = await res.json();
            console.log(obj);
            
            ocultarTexto();
            mostrarTabela();

            const tabela = document.querySelector("#tabelaGeral");
            const cabeca = tabela.querySelector("thead");
            const corpo = tabela.querySelector("tbody");
            const nav_bar = document.querySelector(".nav-bar");
            const item_li = document.createElement('li')

            corpo.innerHTML = "";
            cabeca.innerHTML = "";

            if(!document.querySelector(".nav-bar .return")){
                item_li.classList.add("return");
                item_li.innerHTML = `<a href="../../Pages/Home/Home.html">Retornar</a>`;
                nav_bar.querySelector(".ul-menu").appendChild(item_li);
            }
            const title = document.createElement('tr');
            title.innerHTML = `
            <th class="title" colspan="6">Registro de Medicos</th>
            `
            cabeca.appendChild(title);

            const linhaC = document.createElement('tr');
            linhaC.innerHTML = `
            <th>ID</th>
            <th>NOME</th>
            <th>CRM</th>
            <th>TELEFONE</th>
            <th>EMAIL</th>
            <th>ESPECIALIDADE</th>
            `;
            
            cabeca.appendChild(linhaC);
            
            obj.forEach(o => {
                const tr = document.createElement('tr')
                tr.innerHTML = `
                <td>${o.id}</td>
                <td>${o.nome}</td>
                <td>${o.crm}</td>
                <td>${o.telefone}</td>
                <td>${o.email}</td>
                <td>${o.especialidade}</td>
                `;
                corpo.appendChild(tr);
            });
        }else{
            console.log("Erro na requisição");
        }
    }catch(error){
        console.error(error);  
    }
}


//Consultas

const URL_CONSULTA = 'http://localhost:8080/paciente/consulta/listar';
async function listarConsultas(){
    try{
        const res = await fetch(URL_CONSULTA);
        if(res.status === 200){
            const obj = await res.json();
            console.log(obj);

            ocultarTexto();
            mostrarTabela();

            const tabela = document.querySelector("#tabelaGeral");
            const cabeca = tabela.querySelector("thead");
            const corpo = tabela.querySelector("tbody");
            const nav_bar = document.querySelector(".nav-bar");
            const item_li = document.createElement('li')

            corpo.innerHTML = "";
            cabeca.innerHTML = "";

            if(!document.querySelector(".nav-bar .return")){
                item_li.classList.add("return");
                item_li.innerHTML = `<a href="../../Pages/Home/Home.html">Retornar</a>`;
                nav_bar.querySelector(".ul-menu").appendChild(item_li);
            }
            const title = document.createElement('tr');
            title.innerHTML = `
            <th class="title" colspan="6">Registro de Consultas</th>
            `

            cabeca.appendChild(title);

            const linhaC = document.createElement('tr');
            linhaC.innerHTML = `
            <th>ID</th>
            <th>ID PACIENTE</th>
            <th>ID MEDICO</th>
            <th>DATA / HORA</th>
            <th>STATUS</th>
            `;
            
            cabeca.appendChild(linhaC);
            
            obj.forEach(o => {
                const tr = document.createElement('tr')
                tr.innerHTML = `
                <td>${o.id}</td>
                <td>${o.id_paciente}</td>
                <td>${o.id_medico}</td>
                <td>${new Date(o.data_hora).toLocaleDateString("PT-BR",{
                    day:"2-digit",
                    month:"2-digit",
                    year:"numeric",
                    hour:"2-digit",
                    minute:"2-digit"
                })}</td>
                <td>${o.status}</td>
                `;
                corpo.appendChild(tr);
            });
        }else{
            console.log("Error");
        }
    }catch(error){
        console.error(error); 
    }
}

//Pagamentos

const URL_PAGAMENTO = 'http://localhost:8080/paciente/consulta/pagamentos/listar';
async function listarPagamentos() {
    try{
        const res = await fetch(URL_PAGAMENTO);
        if(res.status === 200){
            const obj = await res.json();
            console.log(obj);

            ocultarTexto();
            mostrarTabela();

            const tabela = document.querySelector("#tabelaGeral");
            const cabeca = tabela.querySelector("thead");
            const corpo = tabela.querySelector("tbody");
            const nav_bar = document.querySelector(".nav-bar");
            const item_li = document.createElement('li')

            corpo.innerHTML = "";
            cabeca.innerHTML = "";

            if(!document.querySelector(".nav-bar .return")){
                item_li.classList.add("return");
                item_li.innerHTML = `<a href="../../Pages/Home/Home.html">Retornar</a>`;
                nav_bar.querySelector(".ul-menu").appendChild(item_li);
            }
            const title = document.createElement('tr');
            title.innerHTML = `
            <th class="title" colspan="7">Registro de Pagamentos</th>
            `

            cabeca.appendChild(title);

            const linhaC = document.createElement('tr');
            linhaC.innerHTML = `
            <th>ID</th>
            <th>ID CONSULTA</th>
            <th>ID PACIENTE</th>
            <th>ID MEDICO</th>
            <th>FORMA DE PAGAMENTO</th>
            <th>VALOR</th>
            <th>STATUS</th>
            `;
            
            cabeca.appendChild(linhaC);
            
            obj.forEach(o => {
                const tr = document.createElement('tr')
                tr.innerHTML = `
                <td>${o.id_pagamento}</td>
                <td>${o.id_consulta}</td>
                <td>${o.id_paciente}</td>
                <td>${o.id_medico}</td>
                <td>${o.formaPagamento}</td>
                <td>R$${o.valor},00</td>
                <td>${o.status}</td>
                `;
                corpo.appendChild(tr);
            });

        }else{
            console.log("Error");
        }
    }catch{
        throw new Exception("Error");
    }
}

//Pacientes

const URL_PACIENTE_LISTAR = 'http://localhost:8080/paciente/listar';
async function listarPacientes() {
    try{
        const res = await fetch(URL_PACIENTE_LISTAR);
        if(res.status === 200){
            const obj = await res.json();
            console.log(obj);

            ocultarTexto();
            mostrarTabela();

            const tabela = document.querySelector("#tabelaGeral");
            const cabeca = tabela.querySelector("thead");
            const corpo = tabela.querySelector("tbody");
            const nav_bar = document.querySelector(".nav-bar");
            const item_li = document.createElement('li')

            corpo.innerHTML = "";
            cabeca.innerHTML = "";

            if(!document.querySelector(".nav-bar .return")){
                item_li.classList.add("return");
                item_li.innerHTML = `<a href="../../Pages/Home/Home.html">Retornar</a>`;
                nav_bar.querySelector(".ul-menu").appendChild(item_li);
            }
            const title = document.createElement('tr');
            title.innerHTML = `
            <th class="title" colspan="7">Registro de Pacientes</th>
            `
            cabeca.appendChild(title);

            const linhaC = document.createElement('tr');
            linhaC.innerHTML = `
            <th>ID</th>
            <th>NOME</th>
            <th>CPF</th>
            <th>TELEFONE</th>
            <th>DATA DE NASCIMENTO</th>
            <th>SEXO</th>
            <th>ENDEREÇO</th>
            `;
            
            cabeca.appendChild(linhaC);
            
            obj.forEach(o => {
                const tr = document.createElement('tr')
                tr.innerHTML = `
                <td>${o.id_paciente}</td>
                <td>${o.nome}</td>
                <td>${o.cpf}</td>
                <td>${o.telefone}</td>
                <td>${o.data_nascimento}</td>
                <td>${o.sexo}</td>
                <td>${o.endereco}</td>
                `;
                corpo.appendChild(tr);
            });

        }else{
            console.log("Error");
        }
    }catch{
        console.log("Error");
    }
}