import http from 'k6/http';

export default function () {
  const payload = JSON.stringify({ task: 'Todoo duduuu Tddo', completed: false });
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  http.post('http://3.71.185.56:8080/todos', payload, params);
}

export function teardown() {
  http.get('http://3.71.185.56:8080/todos');
}

export const options = {
  vus: 20,
  duration: '10s',
};
