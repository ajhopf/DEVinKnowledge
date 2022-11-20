import {
  getHints,
  createHint,
  deleteHint,
  updateHint
} from './controllers/hints.js';

const form = document.querySelector('#form');
const hintsList = document.querySelector('.hints-list');
const statisticsDivs = document.querySelectorAll('.statistics div');
const searchButton = document.querySelector('#search-button');
const resetSearch = document.querySelector('#search-reset');
const myModal = document.querySelector('#myModal');
const modalCloseButton = document.getElementsByClassName('close')[0];

const transformCategoryValue = value => {
  let text;

  switch (value) {
    case '1':
      text = 'FrontEnd';
      break;
    case '2':
      text = 'BackEnd';
      break;
    case '3':
      text = 'FullStack';
      break;
    case '4':
      text = 'SoftSkill';
      break;
  }

  return text;
};

const createHintLi = hint => {
  const li = document.createElement('li');

  const title = document.createElement('h3');
  const language = document.createElement('h4');
  const category = document.createElement('h4');
  const description = document.createElement('p');

  const buttonsDiv = document.createElement('div');
  const videoButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  const editButton = document.createElement('button');

  //textos
  title.innerText = hint.title;
  language.innerHTML = `<span>Linguagem/Skill:</span> ${hint.language}`;
  category.innerHTML = `<span>Categoria:</span> ${transformCategoryValue(
    hint.category
  )}`;
  description.innerText = hint.description;

  //buttons
  buttonsDiv.classList.add('hint-buttons');

  //videoButton

  if (hint.videoUrl) {
    videoButton.innerHTML =
      '<i class="fa-solid fa-video fa-2x"></i><span class="tooltiptext">Ver vídeo</span>';
    // videoButton.href = hint.videoUrl;
  } else {
    videoButton.setAttribute('hidden', true);
  }
  videoButton.addEventListener('click', () => {
    populateVideoModal(hint);
  });
  videoButton.classList.add('tooltip');

  //delete Button

  deleteButton.innerHTML =
    '<i class="fa-solid fa-trash fa-2x"></i><span class="tooltiptext">Deletar dica</span>';
  deleteButton.addEventListener('click', () => {
    populateDeleteModal(hint);
  });

  deleteButton.classList.add('tooltip');

  //edit Button
  editButton.innerHTML =
    '<i class="fa-solid fa-pen-to-square fa-2x"></i></i><span class="tooltiptext">Editar dica</span>';
  editButton.addEventListener('click', event => {
    populateEditModal(hint);
    sendHintToFormToEdit(hint);
  });
  editButton.classList.add('tooltip');

  li.appendChild(title);
  li.appendChild(language);
  li.appendChild(category);
  li.appendChild(description);

  buttonsDiv.appendChild(videoButton);
  buttonsDiv.appendChild(deleteButton);
  buttonsDiv.appendChild(editButton);

  li.appendChild(buttonsDiv);
  li.setAttribute('data-id', hint.id);
  li.setAttribute('data-hint-category', hint.category);

  hintsList.appendChild(li);
};

const populateHints = hints => {
  hintsList.innerHTML = '';

  hints.forEach(hint => {
    createHintLi(hint);
  });
};

const updateHintCountByCategory = (hintCategory, operation) => {
  const totalHintsCount = document.querySelector('[data-category="0"]');
  const countByHintsCategory = document.querySelector(
    `[data-category="${hintCategory}"]`
  );

  let totalNumber = parseInt(totalHintsCount.innerText);
  let newCountByCategory = parseInt(countByHintsCategory.innerText);

  if (!operation) {
    newCountByCategory++;
    totalNumber++;
  } else {
    newCountByCategory--;
    totalNumber--;
  }
  totalHintsCount.innerText = totalNumber;
  countByHintsCategory.innerText = newCountByCategory;
};

const getStatistics = () => {
  const allStatistics = document.querySelectorAll('[data-category]');
  const allHints = document.querySelectorAll('[data-hint-category]');

  allStatistics.forEach(statistic => (statistic.innerText = '0'));

  allHints.forEach(hint => {
    updateHintCountByCategory(hint.dataset.hintCategory);
  });
};

const sendHintToFormToEdit = hint => {
  const code = document.querySelector('#code');
  code.value = hint.id;
  const title = document.querySelector('#title');
  title.value = hint.title;
  const language = document.querySelector('#skill');
  language.value = hint.language;
  const category = document.querySelector('#category')[parseInt(hint.category)];
  category.selected = 'select';
  const description = document.querySelector('#description');
  description.value = hint.description;
  if (hint.videoUrl) {
    const videoUrl = document.querySelector('#video');
    videoUrl.value = hint.videoUrl;
  }
};

const updateEditedHint = post => {
  console.log(post);
  const editedLi = document.querySelector(`[data-id="${post.id}"`);
  editedLi.dataset.hintCategory = post.category;

  const editedLiTitle = editedLi.childNodes[0];
  const editedLiLanguage = editedLi.childNodes[1];
  const editedLiCategory = editedLi.childNodes[2];
  const editedLiDescription = editedLi.childNodes[3];
  const videoLink = editedLi.childNodes[4].firstChild;

  editedLiTitle.innerText = post.title;
  editedLiLanguage.innerHTML = `<span>Linguagem/Skill:</span> ${post.language}`;
  editedLiCategory.innerHTML = `<span>Categoria:</span> ${transformCategoryValue(
    post.category
  )}`;
  editedLiDescription.innerText = post.description;
  videoLink.href = post.videoUrl;
  console.log(videoLink.href);
  if (post.videoUrl) {
    videoLink.removeAttribute('hidden');
    videoLink.innerHTML =
      '<i class="fa-solid fa-video fa-2x"></i><span class="tooltiptext">Ver vídeo</span>';
  } else {
    videoLink.innerHTML = '';
    videoLink.setAttribute('hidden', 'hidden');
  }
};

const eraseModal = () => {
  const modalHeader = document.querySelector('.modal-header');
  modalHeader.dataset.modal = '';
  const modalIframe = document.querySelector('.modal-body iframe');

  if (modalIframe) {
    modalIframe.remove();
    const videoError = document.querySelector('.videoError');
    videoError.remove();
  }

  const modalFooter = document.querySelector('.modal-footer');
  modalFooter.dataset.modal = '';
  modalFooter.innerHTML = '';
  myModal.style.display = 'none';
};

const populateConfirmModal = (hint, operation) => {
  myModal.style.display = 'block';
  const modalHeader = document.querySelector('.modal-header');
  modalHeader.dataset.modal = 'confirmModal';

  const modalTitle = document.querySelector('.modal-header h2');
  modalTitle.innerText = `Dica ${operation} com sucesso!`;
  const modalText = document.querySelector('.modal-body p');
  modalText.innerText = `Título da dica ${operation}: ${hint.title}`;
};

const populateDeleteModal = hint => {
  myModal.style.display = 'block';
  const modalHeader = document.querySelector('.modal-header');
  modalHeader.dataset.modal = 'deleteModal';

  const modalTitle = document.querySelector('.modal-header h2');
  modalTitle.innerText = `Você está prestes a deletar permanentemente uma dica!`;
  const modalText = document.querySelector('.modal-body p');
  modalText.innerText = `Título da dica a ser deletada: ${hint.title}`;

  const modalFooter = document.querySelector('.modal-footer');
  modalFooter.dataset.modal = 'deleteModal';
  const confirmButton = document.createElement('button');
  confirmButton.innerText = 'Confirmar operação';

  modalFooter.appendChild(confirmButton);

  confirmButton.onclick = () => {
    deleteHintFromPage(hint);
    eraseModal();
  };
};

const populateEditModal = hint => {
  myModal.style.display = 'block';
  const modalHeader = document.querySelector('.modal-header');
  modalHeader.dataset.modal = 'editModal';

  const modalTitle = document.querySelector('.modal-header h2');
  modalTitle.innerText = `Você entrou no modo de edição de dica`;
  const modalText = document.querySelector('.modal-body p');
  modalText.innerText = `As informações da dica ${hint.title} foram enviadas ao formulário.\n Após a edição, clique em salvar para confirmar a edição da dica ou em limpar para sair do modo edição`;

  const modalFooter = document.querySelector('.modal-footer');
  modalFooter.dataset.modal = 'editModal';
  const confirmButton = document.createElement('button');
  confirmButton.innerText = 'ok';

  modalFooter.appendChild(confirmButton);

  confirmButton.onclick = () => {
    eraseModal();
  };
};

const populateVideoModal = hint => {
  console.log(hint);

  myModal.style.display = 'block';

  const modalHeader = document.querySelector('.modal-header');
  modalHeader.dataset.modal = 'videoModal';
  const modalTitle = document.querySelector('.modal-header h2');
  modalTitle.innerText = `Educação continuada - Vídeo Aulas`;

  const modalBody = document.querySelector('.modal-body');
  const modalText = document.querySelector('.modal-body p');
  modalText.innerHTML = `Vídeo da dica: ${hint.title}.`;

  const videoError = document.createElement('p');
  videoError.innerHTML = `Problema na execução do vídeo? Clique <a href=${hint.videoUrl} target="_blank"> aqui</a> para ser direcionado para o youtube`;
  videoError.classList.add('videoError');

  const iframe = document.createElement('iframe');
  const formattedUrl = hint.videoUrl.replace('watch?v=', 'embed/');

  iframe.setAttribute('src', formattedUrl);

  modalBody.appendChild(iframe);
  modalBody.appendChild(videoError);
};

const deleteHintFromPage = hint => {
  deleteHint(hint.id);

  const deletedHint = document.querySelector(
    `[data-id="${hint.id.toString()}"]`
  );
  deletedHint.remove();

  updateHintCountByCategory(hint.category, true);
};

const submitForm = async event => {
  event.preventDefault();

  const code = event.target.code.value;

  const post = {
    title: event.target.title.value,
    language: event.target.skill.value,
    category: event.target.category.value,
    description: event.target.description.value,
    videoUrl: event.target.video.value,
    id: code
  };

  if (code) {
    let confirmUpdate = confirm('confirma a edição?');

    if (confirmUpdate) {
      try {
        await updateHint(post);
        updateEditedHint(post);
        getStatistics();
        populateConfirmModal(post, 'atualizada');
        form.reset();
      } catch (error) {
        console.error(`Não foi possível atualizar a dica! Erro: ${error}`);
      }
    }
  } else {
    try {
      const createdHint = await createHint(post);
      createHintLi(createdHint);
      updateHintCountByCategory(createdHint.category);
      populateConfirmModal(createdHint, 'cadastrada');
      form.reset();
    } catch (error) {
      console.error(
        `Não foi possível adicionar a dica ao banco dados! Erro: ${error}`
      );
    }
  }
};

const filterHintsByCategory = filter => {
  const hintsLi = document.querySelectorAll('[data-hint-category]');

  hintsLi.forEach(hint => {
    if (parseInt(hint.dataset.hintCategory) === filter || filter === 0) {
      hint.removeAttribute('hidden');
    } else {
      hint.setAttribute('hidden', 'hidden');
    }
  });
};

const filterHintsByTitle = title => {
  const hintsLi = document.querySelectorAll('[data-hint-category]');

  hintsLi.forEach(hint => {
    const hintTitle = hint.firstChild.innerText.toLowerCase();
    if (hintTitle.includes(title.toLowerCase())) {
      hint.removeAttribute('hidden');
    } else {
      hint.setAttribute('hidden', 'hidden');
    }
  });
};

searchButton.addEventListener('click', () => {
  const title = document.querySelector('#search-input').value;

  if (title) {
    filterHintsByTitle(title);
  }
});

resetSearch.addEventListener('click', () => {
  const hintsLi = document.querySelectorAll('[data-hint-category]');
  const input = document.querySelector('#search-input');
  input.value = '';

  hintsLi.forEach(hint => hint.removeAttribute('hidden'));
});

statisticsDivs.forEach((div, index) => {
  div.addEventListener('click', () => {
    filterHintsByCategory(index);
  });
});

form.addEventListener('submit', event => {
  submitForm(event);
});

modalCloseButton.addEventListener('click', eraseModal);

window.addEventListener('click', event => {
  if (event.target === myModal) {
    eraseModal();
  }
});

window.addEventListener('load', async () => {
  const hints = await getHints();

  populateHints(hints);

  getStatistics();
});
