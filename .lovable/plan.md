# Réplica precisa do quiz Muses Academy

## Objetivo
Recriar na página inicial o fluxo completo do quiz de referência, mantendo textos, ordem, hierarquia visual, dimensões, espaçamentos e comportamento em celular e desktop.

## Implementação
- Reproduzir a abertura com logotipo, título, quatro faixas etárias ilustradas e links legais.
- Implementar as etapas observadas: telas editoriais, perguntas de escolha única, perguntas de seleção múltipla, escala, resumo do perfil, evento, tempo diário, projeção e processamento final.
- Manter cabeçalho, botão voltar, indicador de progresso, avanço automático nas escolhas únicas e botão fixo nas seleções múltiplas.
- Guardar respostas durante a sessão para permitir voltar sem perder seleções.
- Incorporar localmente os recursos visuais necessários, evitando dependência do site de referência durante o uso.
- Adaptar somente o necessário para que as proporções continuem fiéis em telas menores e maiores.

## Validação
- Percorrer o quiz completo no navegador e conferir o avanço, retorno, seleções múltiplas e tela final.
- Comparar visualmente as principais categorias de tela com a referência em desktop e celular.
- Confirmar que a página abre sem erros e contém metadados próprios do quiz.

## Detalhes técnicos
- Aplicação em React/TanStack Start, com estado local da sessão e estilos semânticos centralizados.
- Ícones vetoriais locais e imagens baixadas para os recursos do projeto.
- Nenhuma integração de pagamento ou envio de dados externos será copiada; o escopo termina no fluxo visual do quiz.
