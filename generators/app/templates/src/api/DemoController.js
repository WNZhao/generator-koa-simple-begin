class DemoController {
  constructor() {
  }

  async demo(ctx) {
    ctx.body = {
      'message': 'hello from a'
    }
  }
}

export default new DemoController()
