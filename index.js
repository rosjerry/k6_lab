import http from 'k6/http';

export default function () {
  const payload = JSON.stringify({ task: 'Todoo duduuu Tddo', completed: false });
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  http.post('http://node-1-2123568256.eu-central-1.elb.amazonaws.com:8080/todos', payload, params);
}

export function teardown() {
  http.get('http://node-1-2123568256.eu-central-1.elb.amazonaws.com:8080/todos');
}

export const options = {
  vus: 50,
  duration: '20s',
};
