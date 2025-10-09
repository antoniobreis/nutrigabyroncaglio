const modal = document.getElementById('modal');

if (modal) {
  const modalImg = document.getElementById('modal-img');
  const modalLegenda = document.getElementById('modal-legenda');
  const fechar = modal.querySelector('.fechar');
  const btnPrev = modal.querySelector('.anterior');
  const btnNext = modal.querySelector('.proximo');

  const imagens = document.querySelectorAll('.galeria-oficinabob img, .galeria-cei img, .galeria-terapia img, .galeria-localizacao img');

  let indiceAtual = 0;

  function abrirModal(index) {
    const img = imagens[index];
    if (!img) return;

    modalImg.src = img.src;
    
    const legendaElement = img.closest('.foto-oficinabob-item, .foto-cei-item, .foto-terapia-item, .foto-localizacao-item');
    const legendaTexto = legendaElement ? legendaElement.querySelector('p')?.textContent : img.alt;
    
    modalLegenda.textContent = legendaTexto || '';
    modal.style.display = 'block';
    indiceAtual = index;
  }

  function fecharModal() {
    modal.style.display = 'none';
  }

  function mostrarAnterior() {
    indiceAtual = (indiceAtual - 1 + imagens.length) % imagens.length;
    abrirModal(indiceAtual);
  }

  function mostrarProximo() {
    indiceAtual = (indiceAtual + 1) % imagens.length;
    abrirModal(indiceAtual);
  }

  imagens.forEach((img, index) => {
    img.addEventListener('click', () => abrirModal(index));
  });

  fechar.addEventListener('click', fecharModal);

  btnPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    mostrarAnterior();
  });

  btnNext.addEventListener('click', (e) => {
    e.stopPropagation();
    mostrarProximo();
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) fecharModal();
  });

  document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'block') {
      if (e.key === 'ArrowLeft') mostrarAnterior();
      else if (e.key === 'ArrowRight') mostrarProximo();
      else if (e.key === 'Escape') fecharModal();
    }
  });
}