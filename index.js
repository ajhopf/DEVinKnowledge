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
  //buttons
  const buttonsDiv = document.createElement('div');
  const videoButton = document.createElement('a');
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
  videoButton.innerText = 'Vídeo';
  if (hint.videoUrl) {
    videoButton.href = hint.videoUrl;
  } else {
    videoButton.setAttribute('hidden', 'hidden');
  }

  videoButton.setAttribute('target', '_blank');

  //delete Button
  deleteButton.innerText = 'Deletar';
  deleteButton.addEventListener('click', () => deleteHintFromPage(hint));

  //edit Button
  editButton.innerText = 'Editar';
  editButton.addEventListener('click', event => {
    sendHintToFormToEdit(hint);
    alert(
      'As informações da dica selecionada para edição foram enviadas para o formulário. Realize as devidas edições e clique em Salvar para finalizar.'
    );
  });

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
  } else {
    videoLink.setAttribute('hidden', 'hidden');
  }
};

const deleteHintFromPage = hint => {
  let confirmDelete = confirm(
    `Tem certeza de que deseja excluir a dica com título de ${title.innerText}?`
  );
  if (confirmDelete) {
    deleteHint(hint.id);

    const deletedHint = document.querySelector(
      `[data-id="${hint.id.toString()}"]`
    );
    deletedHint.remove();

    updateHintCountByCategory(hint.category, true);
  }
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
    let confirmUpdate = confirm(
      `Você está editando a dica com título ${post.title}. Você confirma a edição?`
    );

    if (confirmUpdate) {
      await updateHint(post);
      updateEditedHint(post);
      getStatistics();
      form.reset();
    }
  } else {
    const createdHint = await createHint(post);
    createHintLi(createdHint);
    updateHintCountByCategory(createdHint.category);
    alert('Dica cadastrada com sucesso!');
    form.reset();
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

window.addEventListener('load', async () => {
  const hints = await getHints();
  populateHints(hints);
  getStatistics();
});
