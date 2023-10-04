//Fazer uma requisição na APi RestCountries e retornar no console um array de objetos com todos os países listados na API
//(aproximadamente250)

const inputFiltro = document.getElementById('filtro')

//Declarando a função // Retorna o Array com 250 objetos (paises)
async function fetchAPI (){
    
    try {
        const requisicao = await fetch('https://restcountries.com/v3.1/all')
        const achadoPais = await requisicao.json()
        console.log(achadoPais)

        const arrayPaises = achadoPais
        return arrayPaises
    }catch (erro){
        console.log(erro)
    }
}
//fetchAPI()

//Filtra o Array de paises ou não, de acordo com nome determinado
async function filtraNome (nomePais){
    const arrayPaises2 = await fetchAPI()

        if(nomePais == ""){
            return arrayPaises2
        }else{
            const arrayPaisFiltra = arrayPaises2.filter(
                (pais) =>  pais.name.common.toUpperCase().includes(nomePais.toUpperCase())
            
            )
            return arrayPaisFiltra
        }
}

//Executando a função //Exibe os paises filtrados
async function listaPaises (){

    const arayPaises = await filtraNome(inputFiltro.value)
    const cardPais = arayPaises.map(iten => {
        return `
            <div class="cardContainer ${iten.region}">
                <img src="${iten.flags.png}" alt="Bandeira de ${iten.name.common}">
                <div class="cardTexto">
                    <h2> ${iten.name.common} </h2>
                    <hr>
                    <div>
                        <h3>População:</h3>
                        <p> ${iten.population} </p>
                    </div>
                    <div>
                        <h3>Capital:</h3>
                        <p> ${iten.capital === undefined ? '-': iten.capital} </p>
                    </div>
                    <div>
                        <h3>Continente:</h3>
                        <p> ${iten.continents} </p>
                    </div>
                    <div>
                        <h3>Sigla:</h3>
                        <p> ${iten.fifa} </p>
                    </div>
                </div>
            </div>`
    })
    const container = document.getElementById('container')
    container.innerHTML = cardPais.join('')
}
inputFiltro.addEventListener('keyup', listaPaises)
//
