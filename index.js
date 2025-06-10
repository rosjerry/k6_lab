import http from 'k6/http';

export default function () {
  const payload = JSON.stringify({ task: 'Todoo duduuu Tddo', completed: false });
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  http.post('http://localhost:8080/todos', payload, params);
}

export function teardown() {
  http.get('http://localhost:8080/todos');
}

export const options = {
  vus: 2,
  duration: '10s',
};