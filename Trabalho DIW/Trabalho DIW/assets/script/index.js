// Função para buscar informações do perfil do GitHub
async function fetchGitHubProfile() {
    try {
        const response = await fetch('https://api.github.com/users/BernardoPiresMascarenhas');
        const data = await response.json();

        console.log(data);

        // Atualiza os elementos HTML com as informações do perfil
        document.querySelector('.nome2').textContent = data.name || 'Nome não disponível';
        document.querySelector('.bio p').textContent = data.bio || 'Biografia não disponível';
        document.querySelector('.localizacao strong').textContent = `Localização: ${data.location || 'Não especificada'}`;
        document.querySelector('.localizacao a').href = data.blog || '#'; // Define o link do site, se houver

    } catch (error) {
        console.error('Erro ao buscar perfil do GitHub:', error);
    }
}

async function fetchGitHubRepos() {
    try {
        const response = await fetch('https://api.github.com/users/BernardoPiresMascarenhas/repos');
        const data = await response.json();

        // Seleciona o elemento onde os cards de repositório serão inseridos
        const reposContainer = document.querySelector('.repositorios');

        // Limpa o conteúdo atual, se houver, para evitar duplicatas
        reposContainer.innerHTML = '';

        // Itera sobre cada repositório retornado
        data.forEach(repo => {
            // Cria um elemento <a> para o card do repositório
            const repoCard = document.createElement('a');
            repoCard.classList.add('repositorio');
            repoCard.href = `repositorio.html?name=${repo.name}`;
            repoCard.target = '_blank';

            // Cria a estrutura interna do card
            repoCard.innerHTML = `
                
                <p>${repo.description || ''}</p>
                <div class="stats">
                    <strong>${repo.name}</strong>
                    <strong>
                        <i class="ph ph-star"></i>
                        ${repo.stargazers_count}
                    </strong>
                    <strong>
                        <i class="ph ph-user"></i>
                        ${repo.watchers_count}
                    </strong>
                </div>
            `;

            // Adiciona o card do repositório ao container de repositórios
            reposContainer.appendChild(repoCard);
        });

    } catch (error) {
        console.error('Erro ao buscar repositórios do GitHub:', error);
    }
}

async function carregarCarousel() {
    const res = await fetch("assets/db/db.json")
    const data = await res.json()
    const carouselInner = document.getElementById('carouselInner');


    data.carouselItems.forEach(item => {
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');
        if (carouselInner.children.length === 0) {
            carouselItem.classList.add('active');
        }

        carouselItem.innerHTML = `
            <img src="${item.imageSrc}" class="d-block w-100" alt="...">
            <div class="carousel-caption d-none d-md-block">
            <h5>${item.title}</h5>
            <p>${item.description}</p>
            </div>
        `;

        carouselInner.appendChild(carouselItem);
    });
}

// Função para carregar os colegas
async function carregarColegas() {
    const res = await fetch("assets/db/db.json")
    const data = await res.json()
    const colegasContainer = document.getElementById('secao4');

    data.colegas.forEach(colega => {
        const colegaDiv = document.createElement('div');
        colegaDiv.classList.add('colega');

        colegaDiv.innerHTML = `
        <img src="${colega.foto}" alt="">
        <strong>${colega.nome}</strong>
      `;

        colegasContainer.appendChild(colegaDiv);
    });
}

// Chamada das funções para carregar os dados
carregarCarousel();
carregarColegas();

// Chamada da função ao carregar a página
fetchGitHubProfile();
fetchGitHubRepos();