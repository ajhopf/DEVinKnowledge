const BASE_URL = 'http://localhost:3000';

const getHints = async () => {
  try {
    const response = await fetch(`${BASE_URL}/hints`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const createHint = async hint => {
  try {
    const response = await fetch(`${BASE_URL}/hints`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(hint)
    });

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

const deleteHint = async id => {
  try {
    const response = await fetch(`${BASE_URL}/hints/${id}`, {
      method: 'DELETE'
    });
  } catch (error) {
    console.error(error);
  }
};

const updateHint = async hint => {
  try {
    const response = await fetch(`${BASE_URL}/hints/${hint.id}`, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(hint)
    });

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export { getHints, createHint, deleteHint, updateHint };
