/*
 * Português (Brasil): idioma de referência.
 *
 * STATUS DE REVISÃO
 *  - rule.*  -> transcrição do regulamento oficial (https://www.museudasfavelas.org.br/visite/). Conferir antes de publicar.
 *  - cat.*.desc "pode", "convivencia" e "pertences" -> títulos de seção do regulamento oficial.
 *  - Demais descrições, textos de interface, intro e quiz -> VERSÃO PRELIMINAR, PENDENTE DE APROVAÇÃO DO MUSEU.
 */
MF.dictionaries['pt-BR'] = {
  'app.name': 'Museu das Favelas',
  'app.title': 'Regras de convivência – Museu das Favelas',
  'app.description': 'Conheça, de forma interativa, as regras de convivência do Museu das Favelas.',
  'skip': 'Pular para o conteúdo',

  'lang.group': 'Idioma',
  'lang.changed': 'Idioma alterado para {name}.',

  'a11y.group': 'Acessibilidade',
  'a11y.fontDecrease': 'Diminuir fonte',
  'a11y.fontReset': 'Tamanho original da fonte',
  'a11y.fontIncrease': 'Aumentar fonte',
  'a11y.contrast': 'Alto contraste',
  'a11y.fontChanged': 'Tamanho da fonte: {percent}%.',
  'a11y.fontMax': 'Tamanho máximo da fonte.',
  'a11y.fontMin': 'Tamanho mínimo da fonte.',
  'a11y.contrastOn': 'Alto contraste ativado.',
  'a11y.contrastOff': 'Alto contraste desativado.',

  'img.logo.label': 'Logotipo oficial do Museu (a adicionar)',
  'img.logo.alt': 'Museu das Favelas',
  'img.intro.label': 'Espaço reservado: imagem institucional de boas-vindas (a adicionar)',
  'img.intro.alt': 'Imagem institucional do Museu das Favelas (texto alternativo a revisar quando a imagem for escolhida)',
  'img.pode.label': 'Espaço reservado: imagem sobre convivência e acolhimento (a adicionar)',
  'img.pode.alt': 'Imagem sobre convivência e acolhimento no Museu (texto alternativo a revisar)',
  'img.convivencia.label': 'Espaço reservado: imagem sobre convivência e respeito (a adicionar)',
  'img.convivencia.alt': 'Imagem sobre convivência e respeito no Museu (texto alternativo a revisar)',
  'img.fotos.label': 'Espaço reservado: imagem sobre fotos e preservação (a adicionar)',
  'img.fotos.alt': 'Imagem sobre fotografia e preservação no Museu (texto alternativo a revisar)',
  'img.pertences.label': 'Espaço reservado: imagem sobre pertences e conforto (a adicionar)',
  'img.pertences.alt': 'Imagem sobre pertences e conforto na visita (texto alternativo a revisar)',
  'img.criancas.label': 'Espaço reservado: imagem sobre crianças e animais (a adicionar)',
  'img.criancas.alt': 'Imagem sobre a visita de crianças ao Museu (texto alternativo a revisar)',

  'intro.title': 'Bem-vindo(a) ao Museu das Favelas',
  'intro.lead': 'O Museu é um espaço de convivência e acolhimento para todas as pessoas.',
  'intro.text': 'Antes de começar a visita, conheça em poucos minutos como aproveitar o espaço com cuidado e respeito.',
  'intro.meta': '{steps} etapas e um quiz rápido',
  'intro.start': 'Começar',

  'nav.back': 'Voltar',
  'nav.next': 'Próximo',
  'nav.understood': 'Entendi',
  'nav.understoodDone': 'Entendido',
  'nav.hintLocked': 'Toque em “Entendi” para continuar.',
  'nav.understoodAnnounce': 'Entendido. O botão Próximo está disponível.',
  'nav.toQuiz': 'Ir para o quiz',
  'nav.startQuiz': 'Começar o quiz',
  'nav.nextQuestion': 'Próxima pergunta',
  'nav.seeResult': 'Ver resultado',
  'nav.retry': 'Refazer o quiz',
  'nav.reviewRules': 'Rever as regras',
  'nav.reviewCategory': 'Rever: {title}',

  'progress.rulesLabel': 'Progresso das regras',
  'progress.quizLabel': 'Progresso do quiz',
  'progress.step': 'Etapa {current} de {total}',
  'progress.question': 'Pergunta {current} de {total}',

  'card.rulesAria': 'Orientações desta etapa',

  'quizIntro.title': 'Vamos ver se ficou claro?',
  'quizIntro.text': 'São {total} perguntas rápidas sobre o que você acabou de ver. Não há tempo limite.',

  'quiz.optionsAria': 'Alternativas',
  'quiz.correct': 'Resposta correta!',
  'quiz.incorrect': 'Não foi dessa vez, mas vamos lembrar juntos.',
  'quiz.correctAnswer': 'Resposta correta',
  'quiz.yourAnswer': 'Sua resposta',
  'quiz.explanationLabel': 'O que o Museu diz',

  'result.title': 'Resultado',
  'result.score': 'Você acertou {score} de {total}',
  'result.msg.all': 'Parabéns! Você já sabe como aproveitar o Museu com cuidado e respeito.',
  'result.msg.good': 'Muito bem! Falta pouco para fixar todas as orientações.',
  'result.msg.low': 'Obrigado por conhecer as orientações! Que tal rever as regras para fixar melhor?',
  'result.summary': 'Resumo por tema',
  'result.itemCorrect': 'Acertou',
  'result.itemReview': 'Vale rever',
  'result.closingLabel': 'Mensagem do Museu',
  'result.closing': 'O Museu está sempre em transformação, então aproveite este momento e volte sempre.',

  'footer.visit': 'Informações para visita no site oficial do Museu',
  'footer.newTab': '(abre em nova aba)',
  'footer.source': 'Conteúdo baseado no regulamento oficial do Museu das Favelas.',
  'footer.reviewNotice': 'Versão preliminar: traduções, descrições das etapas e perguntas do quiz aguardam aprovação do Museu.',

  'title.intro': 'Início',
  'title.card': 'Etapa {current}: {title}',
  'title.quizIntro': 'Quiz',
  'title.quiz': 'Pergunta {current}',
  'title.result': 'Resultado',

  // ---- Regras (texto oficial) ----
  'rule.r01': 'Sentar-se nos bancos e no chão.',
  'rule.r02': 'Trazer seus amigos para conversar e se divertir.',
  'rule.r03': 'Estudar, dançar, ensaiar sua arte com seu grupo, ouvir música em altura ambiente.',
  'rule.r04': 'Relaxar, ler um livro na biblioteca.',
  'rule.r05': 'Visitar as exposições e participar de todas as atividades de acesso livre!',
  'rule.r06': 'Jogue seu lixo nas lixeiras, assim o espaço fica sempre limpo para todas as pessoas.',
  'rule.r07': 'Não nos responsabilizamos por seus pertences deixados no Museu.',
  'rule.r08': 'Ao fotografar dentro dos espaços expositivos, evite o uso do flash. Vamos preservar o Museu para o futuro.',
  'rule.r09': 'Não toleramos qualquer tipo de discriminação ou preconceito no Museu.',
  'rule.r10': 'Guarde bolsas e mochilas grandes no guarda-volumes e cuide dos seus pertences.',
  'rule.r11': 'Crianças menores de 12 anos devem estar acompanhadas por responsáveis.',
  'rule.r12': 'Não corra dentro da área interna do edifício.',
  'rule.r13': 'Respeite as regras de cada exposição e espaço.',
  'rule.r14': 'A entrada de animais no Museu é restrita a cães-guias acompanhando seus tutores.',

  // ---- Categorias ----
  'cat.pode.title': 'Aqui você pode',
  'cat.pode.desc': 'O Museu é um espaço de convivência e acolhimento para todas as pessoas.',
  'cat.convivencia.title': 'Convivência e respeito',
  'cat.convivencia.desc': 'Divirta-se e respeite as regras para uma boa convivência.',
  'cat.fotos.title': 'Fotos e preservação',
  'cat.fotos.desc': 'Para fotografar com cuidado e preservar o Museu para o futuro.',
  'cat.pertences.title': 'Seus pertences',
  'cat.pertences.desc': 'Para visitar com conforto.',
  'cat.criancas.title': 'Crianças e animais',
  'cat.criancas.desc': 'Orientações sobre a visita de crianças e a entrada de animais.',

  // ---- Quiz (preliminar) ----
  'quiz.q1.prompt': 'Onde você pode se sentar no Museu?',
  'quiz.q1.o1': 'Somente nos bancos',
  'quiz.q1.o2': 'Nos bancos e no chão',
  'quiz.q1.o3': 'Em nenhum lugar: é preciso ficar em pé',
  'quiz.q1.explain': 'O Museu diz: “Sentar-se nos bancos e no chão.” Ele é um espaço de convivência e acolhimento para todas as pessoas.',

  'quiz.q2.prompt': 'O que o Museu não tolera?',
  'quiz.q2.o1': 'Qualquer tipo de discriminação ou preconceito',
  'quiz.q2.o2': 'Conversar e se divertir com os amigos',
  'quiz.q2.o3': 'Ler um livro na biblioteca',
  'quiz.q2.explain': '“Não toleramos qualquer tipo de discriminação ou preconceito no Museu.” Já trazer os amigos para conversar e se divertir e ler um livro na biblioteca são coisas que o Museu convida você a fazer.',

  'quiz.q3.prompt': 'O que o Museu pede ao fotografar dentro dos espaços expositivos?',
  'quiz.q3.o1': 'Usar o flash para as fotos ficarem melhores',
  'quiz.q3.o2': 'Não há nenhuma orientação sobre fotografia',
  'quiz.q3.o3': 'Evitar o uso do flash',
  'quiz.q3.explain': '“Ao fotografar dentro dos espaços expositivos, evite o uso do flash. Vamos preservar o Museu para o futuro.”',

  'quiz.q4.prompt': 'O que fazer com bolsas e mochilas grandes?',
  'quiz.q4.o1': 'Deixá-las em qualquer lugar: o Museu se responsabiliza pelos pertences',
  'quiz.q4.o2': 'Guardá-las no guarda-volumes e cuidar dos seus pertences',
  'quiz.q4.o3': 'Não é preciso guardá-las',
  'quiz.q4.explain': '“Guarde bolsas e mochilas grandes no guarda-volumes e cuide dos seus pertences.” Além disso: “Não nos responsabilizamos por seus pertences deixados no Museu.”',

  'quiz.q5.prompt': 'Sobre crianças e animais, o que vale no Museu?',
  'quiz.q5.o1': 'Crianças menores de 12 anos vão com responsáveis; só cães-guias acompanhando seus tutores podem entrar',
  'quiz.q5.o2': 'Crianças podem visitar sozinhas; qualquer animal pode entrar',
  'quiz.q5.o3': 'Crianças menores de 12 anos vão com responsáveis; qualquer animal de estimação pode entrar',
  'quiz.q5.explain': '“Crianças menores de 12 anos devem estar acompanhadas por responsáveis.” e “A entrada de animais no Museu é restrita a cães-guias acompanhando seus tutores.”'
};
