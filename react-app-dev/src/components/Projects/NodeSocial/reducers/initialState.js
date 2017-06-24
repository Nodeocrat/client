import OrderedHash from '@lib/OrderedHash';

export default {
  chat: {
    messages: [], //{id, username, timestamp (ISO), text, group}
    players: new OrderedHash() //{username: user}
  }
};
