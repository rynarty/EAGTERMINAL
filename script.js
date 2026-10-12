const terminal=document.getElementById("terminal");
const input=document.getElementById("commandInput");

const secretCodes={
  "medo":{message:`========================================
      O Que Te Faz Ter Medo?
========================================

Escuro?

Terror psicologico?

monstros? talvez.. todos?
========================================`,type:"secret"},
  "anomalipse":{message:`[SECRET MESSAGE]

Como você chegou até aqui?
Olha... isso não importa...
Se você está lendo essa mensagem, considere o fim do mundo.

de: HENRY M.`,type:"secret"},
  "perdão":{message:`[O QUE VOCÊ ESTÁ PROCURANDO AFINAL?]

Eu... eu juro que não foi culpa minha, eu sei que não foi... então PORQUE ESSA CULPA ME PERSEGUE!?!?
Eu só queria viver em paz.. Me perdoe charlie.. Por favor`,type:"secret"},
  "charlie":{message:`Charlie Henderson, um dos principais fundadores do experimentos das anomalias governamental.
INFORMAÇÕES:
Nivel admnistrativo: Grau superior 1
RG: 14.337.6742.14
IP loggado: 146.255.74
Idade: 32
Função: Relações pessoais da EAG
Unidade:1, EUA, NEW YORK, 244.155.663
seu código administrativo é ######
Da categoria ##`,type:"secret"},
  "perdão":{message:`[O QUE VOCÊ ESTÁ PROCURANDO AFINAL?]

Eu... eu juro que não foi culpa minha, eu sei que não foi... então PORQUE ESSA CULPA ME PERSEGUE!?!?
Eu só queria viver em paz.. Me perdoe charlie.. Por favor`,type:"secret"},
  "henrym":{message:`Henry Michael, um dos principais mensageiros e admnistrativos dos Experimentos das Anomalias Governamental.
INFORMAÇÕES:
Nivel admnistrativo: Grau superior 3
RG: 12.366.4788.32
IP loggado: 146.255.74
Idade: 26
Função: Relações pessoais da EAG
Unidade: 1, EUA, NEW YORK, 244.155.663
seu código administrativo é 12###7
Da categoria ##`,type:"secret"},
  "eag":{message:`[Bem vindo de volta agente!!]
checando Unidade de Experimento...
DESCONHECIDA!
Checando usuario de agente...
DESCONHECIDO!
iniciando protocólo da maquina...
INVALIDO!
digite o código de 6 digitos...`,type:"secret"},
  "agentes":{message:`[lista de agentes das relações publicas]
Henry Michael
Charlie Handerson
Sofi cristhine
Erick patman
Jacob CasaGrand
Peter Michael`,type:"secret"},
  "Unidade 1":{message:`a unidade 1 é e foi a primeira unidade montada por nós, agentes da EAG, Fundada em 2002.
  Lá estão localizado todos os arquivos e códigos do terminal enveolvendo a EAG até o ano de 2018`,type:"secret"},
  "internet":{message:`[acessando internet da EAG...]
IP da maquinha: Indentificavel...
IP da conexão: 143.255.76
conectando ao ponto de acesso...
ERRO FATAL
Unidade de conexão invalida...`,type:"secret"}
 }

const commands={
  help:()=>`COMANDOS DISPONÍVEIS
--------------------

help         - Mostra esta mensagem
clear        - Limpa o terminal
cls          - Limpa o terminal
usuario      - Mostra o usuário atual
data         - Mostra a data atual
tempo        - Mostra a hora atual
sistema      - Informações do sistema
`,
  usuario:()=> "Desconhecido",
  data:()=>new Date().toLocaleDateString("pt-BR"),
  tempo:()=>new Date().toLocaleTimeString("pt-BR"),
  sistema:()=>`Estudo Governamental de Anomalias

Sistema experimental EAG.

Algumas peças dessa realidade parecem estar divididas..

O que você faz aqui?`,
  Analise:()=>`Procurando informações...

[████████████████████] 100%

Nenhum arquivo encontrado.

tente outra coisa...`
};

input.addEventListener("keydown",event=>{
  if(event.key==="Enter"){
    const command=input.value.trim();
    if(command) executeCommand(command);
  }
});

function executeCommand(command){
  const normalized=command.toLowerCase();
  const line=document.createElement("div");
  line.className="command-line";
  line.innerHTML=`<span class="prompt">C:\\Users\\Secret&gt;</span> ${escapeHTML(command)}`;
  terminal.insertBefore(line,document.querySelector(".input-line"));

  if(normalized==="clear"||normalized==="cls"){clearTerminal();input.value="";return}

  if(secretCodes[normalized]){
    showOutput(secretCodes[normalized].message,"secret");
    input.value="";return;
  }

  const parts=normalized.split(" ");
  const main=parts[0];

  if(main==="echo"){
    showOutput(command.substring(5)||"");
    input.value="";return;
  }

  if(commands[main]) showOutput(commands[main]());
  else showOutput(`'${command}' não é reconhecido como um comando interno ou externo.`,"error");

  input.value="";
}

function showOutput(text,className=""){
  const output=document.createElement("div");
  output.className=`output ${className}`;
  output.textContent=text;
  terminal.insertBefore(output,document.querySelector(".input-line"));
  scrollToBottom();
}

function clearTerminal(){
  terminal.querySelectorAll(".command-line,.output").forEach(e=>e.remove());
}

function scrollToBottom(){terminal.scrollTop=terminal.scrollHeight}

function escapeHTML(text){
  return text.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;");
}

document.addEventListener("click",()=>input.focus());
input.focus();
