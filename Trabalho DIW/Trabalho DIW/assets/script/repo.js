// Função para obter parâmetros de consulta da URL
function obterParametroQuery(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Função para carregar informações do repositório com base no parâmetro de consulta
async function carregarInformacoesDoRepositorio() {
    // Obter o nome do repositório a partir do parâmetro 'repo' na URL
    const repoName = obterParametroQuery('name');

    if (repoName) {
        try {
            // Fazer requisição GET para a API do GitHub para obter informações do repositório
            const response = await fetch(`https://api.github.com/repos/${repoName}`);
            if (!response.ok) {
                throw new Error('Erro ao carregar informações do repositório.');
            }
            const repoData = await response.json();

            // Atualizar os elementos HTML com as informações do repositório
            document.querySelector('.labirinto').textContent = repoData.full_name;
            document.getElementById('descricao').textContent = repoData.description || 'Sem descrição disponível.';
            document.getElementById('dataCriacao').textContent = new Date(repoData.created_at).toLocaleDateString();
            document.getElementById('linguagem').textContent = repoData.language || 'Não especificada';
            document.getElementById('projetoLink').setAttribute('href', repoData.html_url);
            document.getElementById('projetoLink').textContent = 'Link para o projeto';
        } catch (error) {
            console.error('Erro ao carregar informações do repositório:', error);
            document.querySelector('.labirinto').textContent = 'Erro ao carregar informações do repositório.';
        }
    } else {
        console.error('Parâmetro de consulta "repo" não encontrado na URL.');
        document.querySelector('.labirinto').textContent = 'Repositório não especificado.';
    }
}

// Chamada da função para carregar informações do repositório ao carregar a página
carregarInformacoesDoRepositorio();
