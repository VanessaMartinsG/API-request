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