const baseURL = "http://localhost:3001";
const formulario = document.forms.formulario;

formulario.addEventListener("submit", (e)=>{
    e.preventDefault();
    const {nome , curso, materia} = formulario;
    const usuario = {
        "nome": nome.value,
        "curso": curso.value,
        "materia": materia.value
    };

    let validacaoCampo = validarForm(nome, curso, materia);

    if(validacaoCampo ===false){
        novoUsuario(usuario);
    }
    
})

async function novoUsuario(usuario){
    let response = await fetch(`${baseURL}/estudos`,{
        method: "POST",
        headers: {"content-type":"application/json"},
        body: JSON.stringify(usuario),
    });
    userResponse = await response.json();
}

function validarForm(nome, curso, materia) {
    let controleValidade = true;
    if(nome.value == "" || curso.value == "" || materia.value == ""){
       if(nome.value == "" ){
          alert(`O campo ${nome.name} deverá ser preenchido`);
       }
       if(curso.value == "" ){
        alert(`O campo ${curso.name} deverá ser preenchido`);
     }
     if(materia.value == "" ){
        alert(`O campo ${materia.name} deverá ser preenchido`);
     }
    }else{
        controleValidade = false;
    }

    return controleValidade;
}


// Pegar os elementos da lista e mostrar em tela

let arrayItens = [];

function getItens(){
const dataArray = fetch(`${baseURL}/estudos`);
dataArray.then((response) => response.json())
.then((data) =>{
    arrayItens = data;
    creatHTML();
});
}

function creatHTML() {
    const main = document.querySelector("main");
    const mural = document.createElement("div");
    main.appendChild(mural);
    mural.classList.add("mural");

    arrayItens.forEach((item) => {
        let div = document.createElement("div");
        let nome = document.createElement("h2");
        let curso = document.createElement("h3");
        let materia = document.createElement("h4");
        let icons = document.createElement("div");
        let editar = document.createElement("p");
        let deletar = document.createElement("p");

        
        div.setAttribute("identificador",item.id);

        icons.classList.add("icons");
        editar.classList.add("editar");
        deletar.classList.add("deletar");
        div.classList.add("lista");
        
        nome.textContent = item.nome;
        curso.textContent = item.curso;
        materia.textContent = item.materia;
        deletar.innerHTML = "<svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4ZM6 7V19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6ZM14 14V18H10V14H8L12 10L16 14H14Z' fill='#e94c4c'/></svg>";
        editar.innerHTML = "<svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04V7.04Z' fill='#018f4d'/></svg>";

        div.appendChild(nome);
        div.appendChild(curso);
        div.appendChild(materia);
        div.appendChild(icons);
        icons.appendChild(editar);
        icons.appendChild(deletar);
        mural.appendChild(div);

    });

    targetItem();
}

function targetItem() {
    let listaCard = document.querySelectorAll(".lista");
    listaCard.forEach((item) =>{
        let editar = item.querySelector(".editar");
        let deletar = item.querySelector(".deletar");

        deletar.addEventListener("click", () => {
            let buscaCard = arrayItens.find(cardID => cardID.id == item.getAttribute("identificador"));
                deletarLista(buscaCard.id);
            
        })

        editar.addEventListener("click", () =>{
            const modal = document.querySelector(".modal");
            modal.style.display = "flex";
            let buscaCard = arrayItens.find(cardID => cardID.id == item.getAttribute("identificador"));
                completarModalEditar(buscaCard);
        })
    })
}

async function deletarLista(userId){
    let response = await fetch(`${baseURL}/estudos/${userId}`, {
        method: "DELETE",
      });
      userResponse = await response.json();
}

async function editarLista(user, userId){
    let response = await fetch(`${baseURL}/estudos/${userId}`, {
        method: "PUT",
        headers: {"content-type":"application/json"},
        body: JSON.stringify(user),
    });
    userResponse = await response.json();
}

function completarModalEditar(user){
    const nomeModal = document.querySelector("input[name='nomeModal']");
    const cursoModal = document.querySelector("input[name='cursoModal']");
    const materiaModal = document.querySelector("input[name='materiaModal']");

    nomeModal.value = user.nome;
    cursoModal.value = user.curso;
    materiaModal.value = user.materia;

    submitModal(user.id);
}

function submitModal(userID){
    formularioModal.addEventListener("submit", (e)=>{
        e.preventDefault();
        const {nomeModal , cursoModal, materiaModal} = formularioModal;
        const usuario = {
            "nome": nomeModal.value,
            "curso": cursoModal.value,
            "materia": materiaModal.value
        };
    
        let validacaoCampo = validarForm(nomeModal, cursoModal, materiaModal);
    
        if(validacaoCampo ===false){
           editarLista(usuario, userID);
        }
        
    })
}

/* Fechar Modal */
 
function fecharModal(){
    const modal = document.querySelector(".modal");
    const close = document.querySelector(".close");

close.addEventListener("click", (e) => {
    modal.style.display = "none"; 
});
}


getItens();
fecharModal();