var count = 0

function salvaRegistros() {
    const registros = {}
    
    $('.registro').each(function(i, obj) {
        // I
        const nome = obj.getElementsByClassName('nome')[0].innerText;
        const infos = obj.getElementsByClassName('infos')[0].innerText;
        // S
        const situacao = obj.getElementsByClassName('situacao-text')[0].value;
        // B
        const breveHistorico = obj.getElementsByClassName('breveHistorico-text')[0].value;
        // A
        const avaliacao = obj.getElementsByClassName('avaliacao-text')[0].value;
        // R
        const recomendacao = obj.getElementsByClassName('recomendacao-text')[0].value;

        // console.log(`I - ${nome}  ${infos}\nS - ${situacao}\nB - ${breveHistorico}\nA - ${avaliacao}\nR - ${recomendacao}`)
    
        registros[i] = {
            'nome': nome,
            'infos': infos,
            'situacao': situacao,
            'historico': breveHistorico,
            'avaliacao': avaliacao,
            'recomendacao': recomendacao
        }
    });
    

    localStorage.setItem('registros',  JSON.stringify(registros));
}

function carregaRegistros() {
    const regStr = localStorage.getItem('registros');
    const registros = JSON.parse(regStr);
    // console.log(registros);
    if(registros) preencheRegistros(registros);
}

function preencheRegistros(registros) {
    Object.keys(registros).forEach(key => {
        const registro = registros[key];
        addRegistro(registro.nome, registro.infos, registro.situacao, registro.historico, registro.avaliacao, registro.recomendacao);
    });
}

function limpaRegistros() {
    $('#registros').html(``);
}

function addRegistro(nome='', infos='', situacao='', breveHistorico='', avaliacao='', recomendacao='') {
    $('#registros').append(`
        <div id="registro-${count}" class="container mt-2 registro">
            <div>
                <br>
                <div class="float-end">
                    <button class="btn btn-dark" onclick="delRegistro(${count})">Deletar</button>
                </div>
                <h2 contenteditable="true" class="nome">${nome?nome:' --- Nome do animal --- '}</h2>
                
                <h4>Infos do fela</h3>
                <div class="float-end">
                    <button class="btn dropdown-toggle" onclick="toggle(${count})"></button>
                </div>
                <span contenteditable="true" class="infos">${infos?infos:'----- Informações do animal -----'}</span>
                <br><br>
            </div>
            <!-- Quando clica no BTN essa daqui varia dentre hidden ou não -->
            <div id="SBAR-${count}" class="infos" style="display: none;"> 
                <div>
                    <div class="mb-2 situacao">
                        <h4>Situação do Fela</h4>
                        <textarea class="form-control situacao-text" cols="50" rows="5" placeholder="Motivos por quais o paciente necessita de cuidados atualmente, de forma simplificada. Qual a principal preocupação com ele no momento?">${situacao}</textarea>
                    </div>
                    <div class="mb-2 breveHistorico">
                        <h4>Breve Histórico do Fela</h4>
                        <textarea class="form-control breveHistorico-text" cols="50" rows="5" placeholder="Dados relevantes da história clínica prévia do paciente. Contexto em que ele passou por consulta e foi internado, doenças crônicas anteriormente diagnosticadas, procedimentos importantes pelos quais o animal passou anteriormente.">${breveHistorico}</textarea>
                    </div>
                    <div class="mb-2 avaliacao">
                        <h4>Breve Avaliação do Fela</h4>
                        <textarea class="form-control avaliacao-text" cols="50" rows="5" placeholder="Impressão pessoal sobre o paciente e alterações significativas no estado de saúde que ocorreram no último turno. Estratégias que foram necessárias para assessorá-lo (por exemplo: Necessidade de soro glicosado, antieméticos, antitérmicos, anticonvulsivantes, uso do tapete aquecido, oxigenioterapia etc.).">${avaliacao}</textarea>
                    </div>
                    <div class="mb-2 recomendacao">
                        <h4>Recomendações para o Fela</h4>
                        <textarea class="form-control recomendacao-text" cols="50" rows="5" placeholder="Sugestões em geral. O que precisa ser feito para a continuidade do seu tratamento? Qual fator merece receber maior atenção? Quais as recomendações em relação à alimentação do paciente? Sugestões para manter o conforto do paciente? Sugestões de exames a serem solicitados? Sugestões de fármacos que devem ser acrescentados?">${recomendacao}</textarea>
                    </div>
                </div>
            </div>
        </div>
    `);
    count+=1;
}

function delRegistro(registro){
    $(`#registro-${registro}`).remove();
}

function exportarRegistros(){
    salvaRegistros();
    const registros = localStorage.getItem('registros');

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(registros);
    
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", `RegistrosISBAR_${Date.now()}.json`);
    document.body.appendChild(downloadAnchorNode); // required for firefox
    
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

function importarRegistros(){
    const arquivoImportado = document.getElementById('import').files[0];

    if (arquivoImportado.type.match('.json')) {
        const fileReader = new FileReader();
        fileReader.onload = function (e) {
            const conteudoArquivo = JSON.parse(fileReader.result);
            console.log(conteudoArquivo);
            if(verificaArquivo(conteudoArquivo)){
                preencheRegistros(conteudoArquivo);
            } else {
                alert("Por favor, entre com um arquivo válido");        
            }
        }
        fileReader.readAsText(arquivoImportado);
    }
    else {
        alert("Por favor, entre com um arquivo válido");
    }

}

function verificaArquivo(arquivoImportado) {
    try {
        let ret = true;
        Object.keys(arquivoImportado).forEach(key => {
            const registro = arquivoImportado[key];
            if(registro.nome === undefined) {ret = false; return;}
            if(registro.infos === undefined) {ret = false; return;}
            if(registro.situacao === undefined) {ret = false; return;}
            if(registro.historico === undefined) {ret = false; return;}
            if(registro.avaliacao === undefined) {ret = false; return;}
            if(registro.recomendacao === undefined) {ret = false; return;}
        });
        return ret;
    } catch (error) {
        console.log(error);
        return false;
    }    
}

function toggle(infos) {
    $(`#SBAR-${infos}`).toggle();
}
