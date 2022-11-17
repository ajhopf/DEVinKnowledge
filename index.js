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
    const videoButton = document.createElement('a');
    videoButton.innerText = 'Vídeo';
    videoButton.href = hint.videoUrl;
    videoButton.setAttribute('target', '_blank');
    buttonsDiv.appendChild(videoButton);
  }

  //delete Button
  deleteButton.innerText = 'Deletar';
  deleteButton.addEventListener('click', () => deleteHintFromPage(hint));

  //edit Button
  editButton.innerText = 'Editar';
  editButton.addEventListener('click', event => {
    editHint(hint);
    alert(
      'As informações da dica selecionada para edição foram enviadas para o formulário. Realize as devidas edições e clique em Salvar para finalizar.'
    );
  });

  li.appendChild(title);
  li.appendChild(language);
  li.appendChild(category);
  li.appendChild(description);

  buttonsDiv.appendChild(deleteButton);
  buttonsDiv.appendChild(editButton);
  li.appendChild(buttonsDiv);
  li.setAttribute('data-id', hint.id);

  hintsList.appendChild(li);
};

const populateHints = hints => {
  hintsList.innerHTML = '';

  hints.forEach(hint => {
    createHintLi(hint);
  });
};

const updateHintCountByCategory = (hint, operation) => {
  const totalHintsCount = document.querySelector('[data-category="0"]');
  const categoryHintsCount = document.querySelector(
    `[data-category="${hint.category}"]`
  );

  let totalNumber = parseInt(totalHintsCount.innerText);
  let newCountByCategory = parseInt(categoryHintsCount.innerText);

  if (!operation) {
    newCountByCategory++;
    totalNumber++;
  } else {
    newCountByCategory--;
    totalNumber--;
  }
  totalHintsCount.innerText = totalNumber;
  categoryHintsCount.innerText = newCountByCategory;
};

const getStatistics = hints => {
  hints.forEach(hint => {
    updateHintCountByCategory(hint);
  });
};

const editHint = hint => {
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

    updateHintCountByCategory(hint, true);
  }
};

const submitForm = async event => {
  event.preventDefault();

  const code = event.target.code.value;

  console.log(code);

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

    confirmUpdate && updateHint(post);
  } else {
    const createdHint = await createHint(post);
    createHintLi(createdHint);
    updateHintCountByCategory(createdHint);
    alert('Dica cadastrada com sucesso!');
  }
};

const filterHintsByCategory = (hints, filter) => {
  hintsList.innerHTML = '';

  const filteredHintList = hints.filter(
    hint => parseInt(hint.category) === filter
  );

  filteredHintList.forEach(hint => {
    createHintLi(hint);
  });
};

const filterHintsByTitle = async title => {
  hintsList.innerHTML = '';
  const hints = await getHints();

  const filteredHintList = hints.filter(hint => {
    return hint.title.toLowerCase().includes(title.toLowerCase());
  });
  filteredHintList.forEach(hint => {
    createHintLi(hint);
  });
};

searchButton.addEventListener('click', () => {
  const title = document.querySelector('#search-input').value;

  if (title) {
    filterHintsByTitle(title);
  }
});

resetSearch.addEventListener('click', async () => {
  const input = document.querySelector('#search-input');
  input.value = '';
  const hints = await getHints();
  populateHints(hints);
});

statisticsDivs.forEach((div, index) => {
  div.addEventListener('click', async () => {
    const hints = await getHints();
    if (index === 0) {
      populateHints(hints);
    } else {
      filterHintsByCategory(hints, index);
    }
  });
});

form.addEventListener('submit', event => {
  submitForm(event);
});

window.addEventListener('load', async () => {
  const hints = await getHints();
  populateHints(hints);
  getStatistics(hints);
});
