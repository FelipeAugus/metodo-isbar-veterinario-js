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

        console.log(`I - ${nome}  ${infos}\nS - ${situacao}\nB - ${breveHistorico}\nA - ${avaliacao}\nR - ${recomendacao}`)
    
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
    console.log(registros);
    if(registros) preencheRegistros(registros);
}

function preencheRegistros(registros) {
    Object.keys(registros).forEach(key => {
        const registro = registros[key];

        console.log(registro);
        addRegistro(registro.nome, registro.infos, registro.situacao, registro.historico, registro.avaliacao, registro.recomendacao);
    });
}

function addRegistro(nome='', infos='', situacao='', breveHistorico='', avaliacao='', recomendacao='') {
    $('#registros').append(`
        <div class="registro">
            <div>
                <h2 contenteditable="true" class="nome">${nome?nome:' --- Nome do animal --- '}</h2>
                <h4>Infos do fela</h3>
                <span contenteditable="true" class="infos">${infos?infos:'----- Informações do animal -----'}</span>
            </div>
            <button onclick="toggle(${count})">Setinha pra baixo</button>
            <!-- Quando clica no BTN essa daqui varia dentre hidden ou não -->
            <div id="SBAR-${count}" class="infos" style="display: none;"> 
                <div>
                    <div class="situacao">
                        <h4>Situacao do Fela</h4>
                        <textarea class="situacao-text" cols="50" rows="5">${situacao}</textarea>
                    </div>
                    <div class="breveHistorico">
                        <h4>Breve Historico do Fela</h4>
                        <textarea class="breveHistorico-text" cols="50" rows="5">${breveHistorico}</textarea>
                    </div>
                    <div class="avaliacao">
                        <h4>Breve Avaliação do Fela</h4>
                        <textarea class="avaliacao-text" cols="50" rows="5">${avaliacao}</textarea>
                    </div>
                    <div class="recomendacao">
                        <h4>Recomendação para o Fela</h4>
                        <textarea class="recomendacao-text" cols="50" rows="5">${recomendacao}</textarea>
                    </div>
                </div>
            </div>
        </div>
    `);
    count+=1;
}

function toggle(infos) {
    $(`#SBAR-${infos}`).toggle();
}
