import { eventStream } from 'remix-utils/sse/server'
import { emmitter } from '../../data/emiter.server'
emmitter

export function loader(request) {
  return eventStream(request.signal, function setup(send) {
    function listener(value) {
      send({
        event: 'message',
        data: value
      })
    }
    emmitter.on('message', listener)

    return function cleanup() {
      emmitter.off('message', listener)
    }
  })
}
